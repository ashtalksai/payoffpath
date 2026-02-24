import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

// GET /api/debts/[id] - Get single debt
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

    const debt = await db.debt.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
      include: {
        payments: {
          orderBy: { date: "desc" },
        },
      },
    });

    if (!debt) {
      return NextResponse.json({ error: "Debt not found" }, { status: 404 });
    }

    return NextResponse.json(debt);
  } catch (error) {
    console.error("Error fetching debt:", error);
    return NextResponse.json(
      { error: "Failed to fetch debt" },
      { status: 500 }
    );
  }
}

// PUT /api/debts/[id] - Update a debt
export async function PUT(
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

    // Verify ownership
    const existingDebt = await db.debt.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingDebt) {
      return NextResponse.json({ error: "Debt not found" }, { status: 404 });
    }

    const debt = await db.debt.update({
      where: { id },
      data: {
        name: data.name,
        balance: parseFloat(data.balance),
        originalBalance: data.originalBalance
          ? parseFloat(data.originalBalance)
          : undefined,
        apr: parseFloat(data.apr),
        minimumPayment: parseFloat(data.minimumPayment),
        dueDate: parseInt(data.dueDate),
      },
    });

    return NextResponse.json(debt);
  } catch (error) {
    console.error("Error updating debt:", error);
    return NextResponse.json(
      { error: "Failed to update debt" },
      { status: 500 }
    );
  }
}

// DELETE /api/debts/[id] - Delete a debt
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Verify ownership
    const existingDebt = await db.debt.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!existingDebt) {
      return NextResponse.json({ error: "Debt not found" }, { status: 404 });
    }

    await db.debt.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting debt:", error);
    return NextResponse.json(
      { error: "Failed to delete debt" },
      { status: 500 }
    );
  }
}
