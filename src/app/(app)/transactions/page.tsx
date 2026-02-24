"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Upload, Search, Filter, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

const categories = [
  "Food",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Shopping",
  "Healthcare",
  "Income",
  "Debt",
  "Other",
];

const mockTransactions = [
  { id: 1, date: "2026-02-24", description: "Grocery Store", category: "Food", tags: ["groceries"], amount: -124.50 },
  { id: 2, date: "2026-02-23", description: "Paycheck", category: "Income", tags: ["salary"], amount: 3250.00 },
  { id: 3, date: "2026-02-22", description: "Electric Bill", category: "Utilities", tags: ["bills"], amount: -89.00 },
  { id: 4, date: "2026-02-21", description: "Netflix", category: "Entertainment", tags: ["subscription"], amount: -15.99 },
  { id: 5, date: "2026-02-20", description: "Gas Station", category: "Transportation", tags: ["fuel"], amount: -45.00 },
  { id: 6, date: "2026-02-19", description: "Credit Card Payment", category: "Debt", tags: ["debt-payment"], amount: -500.00 },
  { id: 7, date: "2026-02-18", description: "Coffee Shop", category: "Food", tags: ["dining"], amount: -6.50 },
  { id: 8, date: "2026-02-17", description: "Freelance Payment", category: "Income", tags: ["freelance"], amount: 850.00 },
  { id: 9, date: "2026-02-16", description: "Amazon Purchase", category: "Shopping", tags: ["online"], amount: -67.89 },
  { id: 10, date: "2026-02-15", description: "Student Loan Payment", category: "Debt", tags: ["debt-payment"], amount: -350.00 },
  { id: 11, date: "2026-02-14", description: "Restaurant", category: "Food", tags: ["dining"], amount: -42.00 },
  { id: 12, date: "2026-02-13", description: "Phone Bill", category: "Utilities", tags: ["bills"], amount: -75.00 },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function TransactionsPage() {
  const [transactions] = useState(mockTransactions);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = tx.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || tx.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Transaction added successfully");
    setIsAddOpen(false);
  };

  const handleUploadPDF = () => {
    toast.success("PDF uploaded. Processing transactions...");
    setIsUploadOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            Track and categorize your expenses
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary">
                <Upload className="mr-2 h-4 w-4" />
                Upload PDF
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Bank Statement</DialogTitle>
                <DialogDescription>
                  Upload a PDF bank statement to automatically import transactions.
                </DialogDescription>
              </DialogHeader>
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center">
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">
                  Drag and drop your PDF here, or click to browse
                </p>
                <Input type="file" accept=".pdf" className="max-w-xs mx-auto" />
              </div>
              <DialogFooter>
                <Button variant="secondary" onClick={() => setIsUploadOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUploadPDF}>Upload & Import</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Transaction</DialogTitle>
                <DialogDescription>
                  Manually add a new transaction to your records.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" step="0.01" placeholder="-50.00" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Coffee Shop" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input id="tags" placeholder="dining, work" />
                </div>
                <DialogFooter>
                  <Button variant="secondary" type="button" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Transaction</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>
            {filteredTransactions.length} Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-surface-hover">
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-border hover:bg-surface-hover"
                >
                  <TableCell className="font-mono text-muted-foreground">
                    {tx.date}
                  </TableCell>
                  <TableCell className="font-medium">{tx.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tx.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {tx.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell
                    className={`text-right font-mono ${
                      tx.amount >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.amount >= 0 ? "+" : ""}
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
