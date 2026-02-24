import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// POST /api/debts/[id]/payments - Record a payment
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const data = await req.json();

    // Verify debt ownership
    const debt = await db.debt.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!debt) {
      return NextResponse.json({ error: "Debt not found" }, { status: 404 });
    }

    const paymentAmount = parseFloat(data.amount);

    // Create payment and update balance in transaction
    const [payment] = await db.$transaction([
      db.paymentHistory.create({
        data: {
          debtId: id,
          amount: paymentAmount,
          date: data.date ? new Date(data.date) : new Date(),
          note: data.note,
        },
      }),
      db.debt.update({
        where: { id },
        data: {
          balance: Math.max(0, debt.balance - paymentAmount),
        },
      }),
    ]);

    return NextResponse.json(payment);
  } catch (error) {
    console.error("Error recording payment:", error);
    return NextResponse.json(
      { error: "Failed to record payment" },
      { status: 500 }
    );
  }
}

// GET /api/debts/[id]/payments - Get payment history
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify debt ownership
    const debt = await db.debt.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!debt) {
      return NextResponse.json({ error: "Debt not found" }, { status: 404 });
    }

    const payments = await db.paymentHistory.findMany({
      where: { debtId: id },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
