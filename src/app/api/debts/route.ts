import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/debts - List all debts for current user
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const debts = await db.debt.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        payments: {
          orderBy: { date: "desc" },
          take: 5,
        },
      },
    });

    return NextResponse.json(debts);
  } catch (error) {
    console.error("Error fetching debts:", error);
    return NextResponse.json(
      { error: "Failed to fetch debts" },
      { status: 500 }
    );
  }
}

// POST /api/debts - Create a new debt
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    const debt = await db.debt.create({
      data: {
        userId: session.user.id,
        name: data.name,
        balance: parseFloat(data.balance),
        originalBalance: parseFloat(data.originalBalance || data.balance),
        apr: parseFloat(data.apr),
        minimumPayment: parseFloat(data.minimumPayment),
        dueDate: parseInt(data.dueDate),
      },
    });

    return NextResponse.json(debt);
  } catch (error) {
    console.error("Error creating debt:", error);
    return NextResponse.json(
      { error: "Failed to create debt" },
      { status: 500 }
    );
  }
}
