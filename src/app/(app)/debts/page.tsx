"use client";

import { useState, useEffect, useCallback } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Calculator, TrendingDown, Calendar, DollarSign, Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Debt {
  id: string;
  name: string;
  balance: number;
  originalBalance: number;
  apr: number;
  minimumPayment: number;
  dueDate: number;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function calculatePayoffDate(balance: number, apr: number, monthlyPayment: number): string {
  if (monthlyPayment <= 0) return "Never";
  const monthlyRate = apr / 100 / 12;
  let remaining = balance;
  let months = 0;
  
  while (remaining > 0 && months < 360) {
    const interest = remaining * monthlyRate;
    const principal = monthlyPayment - interest;
    if (principal <= 0) return "Never";
    remaining -= principal;
    months++;
  }
  
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function calculateTotalInterest(balance: number, apr: number, monthlyPayment: number): number {
  if (monthlyPayment <= 0) return 0;
  const monthlyRate = apr / 100 / 12;
  let remaining = balance;
  let totalInterest = 0;
  
  while (remaining > 0 && totalInterest < 1000000) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    const principal = monthlyPayment - interest;
    if (principal <= 0) break;
    remaining -= principal;
  }
  
  return totalInterest;
}

export default function DebtsPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [strategy, setStrategy] = useState("avalanche");
  const [extraPayment, setExtraPayment] = useState(200);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [deleteDebt, setDeleteDebt] = useState<Debt | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    balance: "",
    originalBalance: "",
    apr: "",
    minimumPayment: "",
    dueDate: "",
  });

  const fetchDebts = useCallback(async () => {
    try {
      const res = await fetch("/api/debts");
      if (!res.ok) throw new Error("Failed to fetch debts");
      const data = await res.json();
      setDebts(data);
    } catch (error) {
      console.error("Error fetching debts:", error);
      toast.error("Failed to load debts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDebts();
  }, [fetchDebts]);

  const resetForm = () => {
    setFormData({
      name: "",
      balance: "",
      originalBalance: "",
      apr: "",
      minimumPayment: "",
      dueDate: "",
    });
  };

  const handleAddDebt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const res = await fetch("/api/debts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          balance: formData.balance,
          originalBalance: formData.originalBalance || formData.balance,
          apr: formData.apr,
          minimumPayment: formData.minimumPayment,
          dueDate: formData.dueDate,
        }),
      });

      if (!res.ok) throw new Error("Failed to add debt");

      toast.success("Debt added successfully");
      setIsAddOpen(false);
      resetForm();
      fetchDebts();
    } catch {
      toast.error("Failed to add debt");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditDebt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDebt) return;
    setIsSaving(true);

    try {
      const res = await fetch(`/api/debts/${editingDebt.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          balance: formData.balance,
          originalBalance: formData.originalBalance,
          apr: formData.apr,
          minimumPayment: formData.minimumPayment,
          dueDate: formData.dueDate,
        }),
      });

      if (!res.ok) throw new Error("Failed to update debt");

      toast.success("Debt updated successfully");
      setIsEditOpen(false);
      setEditingDebt(null);
      resetForm();
      fetchDebts();
    } catch {
      toast.error("Failed to update debt");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteDebt = async () => {
    if (!deleteDebt) return;

    try {
      const res = await fetch(`/api/debts/${deleteDebt.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete debt");

      toast.success("Debt deleted");
      setDeleteDebt(null);
      fetchDebts();
    } catch {
      toast.error("Failed to delete debt");
    }
  };

  const openEditDialog = (debt: Debt) => {
    setEditingDebt(debt);
    setFormData({
      name: debt.name,
      balance: debt.balance.toString(),
      originalBalance: debt.originalBalance.toString(),
      apr: debt.apr.toString(),
      minimumPayment: debt.minimumPayment.toString(),
      dueDate: debt.dueDate.toString(),
    });
    setIsEditOpen(true);
  };

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const totalMonthlyPayment = totalMinPayment + extraPayment;

  // Calculate debt-free date
  const sortedDebts = [...debts].sort((a, b) => {
    if (strategy === "avalanche") return b.apr - a.apr;
    if (strategy === "snowball") return a.balance - b.balance;
    return 0;
  });

  const debtFreeDate = new Date();
  debtFreeDate.setMonth(debtFreeDate.getMonth() + Math.ceil(totalDebt / (totalMonthlyPayment || 1)));
  const debtFreeDateStr = debts.length > 0 
    ? debtFreeDate.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    : "N/A";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
            <Button onClick={() => resetForm()}>
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
                <Input
                  id="name"
                  placeholder="Credit Card (Chase)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="balance">Current Balance</Label>
                  <Input
                    id="balance"
                    type="number"
                    step="0.01"
                    placeholder="5000"
                    value={formData.balance}
                    onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apr">APR (%)</Label>
                  <Input
                    id="apr"
                    type="number"
                    step="0.01"
                    placeholder="19.99"
                    value={formData.apr}
                    onChange={(e) => setFormData({ ...formData, apr: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minimumPayment">Minimum Payment</Label>
                  <Input
                    id="minimumPayment"
                    type="number"
                    step="0.01"
                    placeholder="150"
                    value={formData.minimumPayment}
                    onChange={(e) => setFormData({ ...formData, minimumPayment: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date (day of month)</Label>
                  <Input
                    id="dueDate"
                    type="number"
                    min="1"
                    max="31"
                    placeholder="15"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalBalance">Original Balance (optional)</Label>
                <Input
                  id="originalBalance"
                  type="number"
                  step="0.01"
                  placeholder="Same as current balance if empty"
                  value={formData.originalBalance}
                  onChange={(e) => setFormData({ ...formData, originalBalance: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button variant="secondary" type="button" onClick={() => setIsAddOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Debt"}
                </Button>
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

      {/* Empty State */}
      {debts.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <DollarSign className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No debts yet</h3>
            <p className="text-muted-foreground text-center mb-4">
              Add your first debt to start tracking your path to financial freedom.
            </p>
            <Button onClick={() => setIsAddOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Debt
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Debt Cards */}
      {debts.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {debts.map((debt) => {
            const paidPercent = Math.round(((debt.originalBalance - debt.balance) / debt.originalBalance) * 100);
            return (
              <Card key={debt.id} className="border-border bg-card">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{debt.name}</CardTitle>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEditDialog(debt)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteDebt(debt)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Balance</span>
                      <span className="font-mono font-semibold">{formatCurrency(debt.balance)}</span>
                    </div>
                    <Progress value={Math.max(0, paidPercent)} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{Math.max(0, paidPercent)}% paid off</span>
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
                      <p className="font-mono font-semibold">{formatCurrency(debt.minimumPayment)}</p>
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
      )}

      {/* Payoff Calculator */}
      {debts.length > 0 && (
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
                        (sum, d) => sum + calculateTotalInterest(d.balance, d.apr, d.minimumPayment + extraPayment / debts.length),
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
                  const payoffDate = calculatePayoffDate(debt.balance, debt.apr, debt.minimumPayment + (i === 0 ? extraPayment : 0));
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
                            style={{ width: `${Math.max(0, progress)}%` }}
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
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Debt</DialogTitle>
            <DialogDescription>
              Update the details for this debt.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditDebt} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Debt Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-balance">Current Balance</Label>
                <Input
                  id="edit-balance"
                  type="number"
                  step="0.01"
                  value={formData.balance}
                  onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-apr">APR (%)</Label>
                <Input
                  id="edit-apr"
                  type="number"
                  step="0.01"
                  value={formData.apr}
                  onChange={(e) => setFormData({ ...formData, apr: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-minimumPayment">Minimum Payment</Label>
                <Input
                  id="edit-minimumPayment"
                  type="number"
                  step="0.01"
                  value={formData.minimumPayment}
                  onChange={(e) => setFormData({ ...formData, minimumPayment: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-dueDate">Due Date</Label>
                <Input
                  id="edit-dueDate"
                  type="number"
                  min="1"
                  max="31"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-originalBalance">Original Balance</Label>
              <Input
                id="edit-originalBalance"
                type="number"
                step="0.01"
                value={formData.originalBalance}
                onChange={(e) => setFormData({ ...formData, originalBalance: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button variant="secondary" type="button" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteDebt} onOpenChange={() => setDeleteDebt(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Debt</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteDebt?.name}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDebt} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
