"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Plus, Pencil, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const mockBudgets = [
  { id: 1, category: "Food", budget: 600, spent: 450, icon: "🍔" },
  { id: 2, category: "Transportation", budget: 300, spent: 275, icon: "🚗" },
  { id: 3, category: "Utilities", budget: 250, spent: 164, icon: "💡" },
  { id: 4, category: "Entertainment", budget: 150, spent: 180, icon: "🎬" },
  { id: 5, category: "Shopping", budget: 200, spent: 68, icon: "🛍️" },
  { id: 6, category: "Healthcare", budget: 100, spent: 45, icon: "🏥" },
];

const categories = [
  { value: "food", label: "Food", icon: "🍔" },
  { value: "transportation", label: "Transportation", icon: "🚗" },
  { value: "utilities", label: "Utilities", icon: "💡" },
  { value: "entertainment", label: "Entertainment", icon: "🎬" },
  { value: "shopping", label: "Shopping", icon: "🛍️" },
  { value: "healthcare", label: "Healthcare", icon: "🏥" },
  { value: "education", label: "Education", icon: "📚" },
  { value: "personal", label: "Personal Care", icon: "💄" },
  { value: "other", label: "Other", icon: "📦" },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function getBudgetStatus(spent: number, budget: number) {
  const percentage = (spent / budget) * 100;
  if (percentage > 100) return { status: "over", color: "text-red-500", bgColor: "bg-red-500" };
  if (percentage >= 80) return { status: "warning", color: "text-yellow-500", bgColor: "bg-yellow-500" };
  return { status: "good", color: "text-green-500", bgColor: "bg-green-500" };
}

export default function BudgetsPage() {
  const [budgets] = useState(mockBudgets);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const totalRemaining = totalBudget - totalSpent;

  const overBudget = budgets.filter((b) => b.spent > b.budget).length;
  const nearLimit = budgets.filter((b) => b.spent / b.budget >= 0.8 && b.spent <= b.budget).length;
  const onTrack = budgets.filter((b) => b.spent / b.budget < 0.8).length;

  const handleAddBudget = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Budget created successfully");
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budgets</h1>
          <p className="text-muted-foreground mt-1">
            Set and track your spending limits by category
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Budget</DialogTitle>
              <DialogDescription>
                Set a monthly spending limit for a category.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBudget} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Monthly Budget</Label>
                <Input id="amount" type="number" step="10" placeholder="500" />
              </div>
              <DialogFooter>
                <Button variant="secondary" type="button" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create Budget</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              {formatCurrency(totalBudget)}
            </div>
            <p className="text-xs text-muted-foreground">per month</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">
              {formatCurrency(totalSpent)}
            </div>
            <p className="text-xs text-muted-foreground">
              {Math.round((totalSpent / totalBudget) * 100)}% of budget
            </p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold font-mono ${totalRemaining >= 0 ? "text-green-500" : "text-red-500"}`}>
              {formatCurrency(totalRemaining)}
            </div>
            <p className="text-xs text-muted-foreground">left to spend</p>
          </CardContent>
        </Card>
        <Card className="border-border bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Budget Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>{onTrack}</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span>{nearLimit}</span>
              </div>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <span>{overBudget}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => {
          const percentage = Math.round((budget.spent / budget.budget) * 100);
          const remaining = budget.budget - budget.spent;
          const { status, color, bgColor } = getBudgetStatus(budget.spent, budget.budget);

          return (
            <Card key={budget.id} className="border-border bg-card">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{budget.icon}</span>
                    <CardTitle className="text-lg">{budget.category}</CardTitle>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Spent</span>
                    <span className={`font-mono font-semibold ${color}`}>
                      {formatCurrency(budget.spent)} / {formatCurrency(budget.budget)}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${bgColor}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{percentage}% used</span>
                    <span className={remaining < 0 ? "text-red-500" : ""}>
                      {remaining >= 0 ? `${formatCurrency(remaining)} left` : `${formatCurrency(Math.abs(remaining))} over`}
                    </span>
                  </div>
                </div>

                {status === "over" && (
                  <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 rounded-lg p-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Over budget by {formatCurrency(Math.abs(remaining))}</span>
                  </div>
                )}
                {status === "warning" && (
                  <div className="flex items-center gap-2 text-sm text-yellow-500 bg-yellow-500/10 rounded-lg p-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Approaching limit</span>
                  </div>
                )}
                {status === "good" && (
                  <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 rounded-lg p-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>On track</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
