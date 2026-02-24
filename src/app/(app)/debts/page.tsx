"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Calculator, TrendingDown, Calendar, DollarSign, Pencil } from "lucide-react";
import { toast } from "sonner";

const mockDebts = [
  {
    id: 1,
    name: "Credit Card (Chase)",
    balance: 8450,
    originalBalance: 12000,
    apr: 19.99,
    minPayment: 250,
    dueDate: 15,
  },
  {
    id: 2,
    name: "Student Loan",
    balance: 24200,
    originalBalance: 35000,
    apr: 5.5,
    minPayment: 350,
    dueDate: 1,
  },
  {
    id: 3,
    name: "Car Loan",
    balance: 12800,
    originalBalance: 22000,
    apr: 4.9,
    minPayment: 450,
    dueDate: 20,
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function calculatePayoffDate(balance: number, apr: number, monthlyPayment: number): string {
  const monthlyRate = apr / 100 / 12;
  let remaining = balance;
  let months = 0;
  
  while (remaining > 0 && months < 360) {
    const interest = remaining * monthlyRate;
    const principal = monthlyPayment - interest;
    remaining -= principal;
    months++;
  }
  
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function calculateTotalInterest(balance: number, apr: number, monthlyPayment: number): number {
  const monthlyRate = apr / 100 / 12;
  let remaining = balance;
  let totalInterest = 0;
  
  while (remaining > 0 && totalInterest < 1000000) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    const principal = monthlyPayment - interest;
    remaining -= principal;
  }
  
  return totalInterest;
}

export default function DebtsPage() {
  const [debts] = useState(mockDebts);
  const [strategy, setStrategy] = useState("avalanche");
  const [extraPayment, setExtraPayment] = useState(200);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minPayment, 0);
  const totalMonthlyPayment = totalMinPayment + extraPayment;

  // Calculate debt-free date
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === "avalanche") return b.apr - a.apr;
    if (strategy === "snowball") return a.balance - b.balance;
    return 0;
  });

  const debtFreeDate = new Date();
  debtFreeDate.setMonth(debtFreeDate.getMonth() + Math.ceil(totalDebt / totalMonthlyPayment));
  const debtFreeDateStr = debtFreeDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const handleAddDebt = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Debt added successfully");
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Debts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your debts and calculate payoff timelines
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Debt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Debt</DialogTitle>
              <DialogDescription>
                Add a new debt to track and include in your payoff plan.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDebt} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Debt Name</Label>
                <Input id="name" placeholder="Credit Card (Chase)" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="balance">Current Balance</Label>
                  <Input id="balance" type="number" step="0.01" placeholder="5000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apr">APR (%)</Label>
                  <Input id="apr" type="number" step="0.01" placeholder="19.99" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minPayment">Minimum Payment</Label>
                  <Input id="minPayment" type="number" step="0.01" placeholder="150" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date (day of month)</Label>
                  <Input id="dueDate" type="number" min="1" max="31" placeholder="15" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="secondary" type="button" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Debt</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Debt
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-destructive">
              {formatCurrency(totalDebt)}
            </div>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Payment
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">
              {formatCurrency(totalMonthlyPayment)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(totalMinPayment)} min + {formatCurrency(extraPayment)} extra
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Debt-Free Date
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono text-primary">
              {debtFreeDateStr}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Debt Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {debts.map((debt) => {
          const paidPercent = Math.round(((debt.originalBalance - debt.balance) / debt.originalBalance) * 100);
          return (
            <Card key={debt.id} className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{debt.name}</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Balance</span>
                    <span className="font-mono font-semibold">{formatCurrency(debt.balance)}</span>
                  </div>
                  <Progress value={paidPercent} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{paidPercent}% paid off</span>
                    <span>of {formatCurrency(debt.originalBalance)}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">APR</p>
                    <p className="font-mono font-semibold">{debt.apr}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Min Payment</p>
                    <p className="font-mono font-semibold">{formatCurrency(debt.minPayment)}</p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Due on the {debt.dueDate}th of each month
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Payoff Calculator */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            <CardTitle>Payoff Calculator</CardTitle>
          </div>
          <CardDescription>
            Calculate your debt-free date with different strategies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Payoff Strategy</Label>
              <Select value={strategy} onValueChange={setStrategy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="avalanche">
                    Avalanche (highest APR first)
                  </SelectItem>
                  <SelectItem value="snowball">
                    Snowball (smallest balance first)
                  </SelectItem>
                  <SelectItem value="custom">
                    Custom order
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Extra Monthly Payment</Label>
              <Input
                type="number"
                value={extraPayment}
                onChange={(e) => setExtraPayment(Number(e.target.value))}
                step="50"
              />
            </div>
          </div>

          {/* Results */}
          <div className="rounded-lg border border-border bg-background p-6">
            <h3 className="font-semibold mb-4">Payoff Plan Results</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Debt-Free Date</p>
                <p className="text-2xl font-bold font-mono text-primary">{debtFreeDateStr}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-2xl font-bold font-mono">
                  {formatCurrency(
                    debts.reduce(
                      (sum, d) => sum + calculateTotalInterest(d.balance, d.apr, d.minPayment + extraPayment / debts.length),
                      0
                    )
                  )}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Monthly Payment</p>
                <p className="text-2xl font-bold font-mono">{formatCurrency(totalMonthlyPayment)}</p>
              </div>
            </div>
          </div>

          {/* Timeline Visualization */}
          <div>
            <h3 className="font-semibold mb-4">Payoff Order ({strategy === "avalanche" ? "Highest APR First" : strategy === "snowball" ? "Smallest Balance First" : "Custom"})</h3>
            <div className="space-y-3">
              {sortedDebts.map((debt, i) => {
                const payoffDate = calculatePayoffDate(debt.balance, debt.apr, debt.minPayment + (i === 0 ? extraPayment : 0));
                const progress = Math.round(((debt.originalBalance - debt.balance) / debt.originalBalance) * 100);
                return (
                  <div key={debt.id} className="flex items-center gap-4">
                    <Badge variant="secondary" className="w-8 h-8 rounded-full flex items-center justify-center">
                      {i + 1}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{debt.name}</span>
                        <span className="text-sm text-muted-foreground">
                          Payoff: {payoffDate}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-semibold">{formatCurrency(debt.balance)}</p>
                      <p className="text-xs text-muted-foreground">{debt.apr}% APR</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
