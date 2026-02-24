"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
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
import { FileText, Download, Calendar, BarChart3, TrendingDown, PieChart } from "lucide-react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartPieChart,
  Pie,
  Cell,
} from "recharts";

const reportTypes = [
  { value: "monthly", label: "Monthly Summary", icon: Calendar },
  { value: "debt", label: "Debt Progress", icon: TrendingDown },
  { value: "spending", label: "Spending by Category", icon: PieChart },
  { value: "budget", label: "Budget vs Actual", icon: BarChart3 },
];

const recentReports = [
  { id: 1, name: "February 2026 Summary", type: "Monthly Summary", date: "2026-02-24", size: "124 KB" },
  { id: 2, name: "Debt Progress Q1 2026", type: "Debt Progress", date: "2026-02-15", size: "89 KB" },
  { id: 3, name: "January 2026 Summary", type: "Monthly Summary", date: "2026-01-31", size: "118 KB" },
];

const spendingData = [
  { category: "Food", amount: 450, color: "#14b8a6" },
  { category: "Transport", amount: 275, color: "#0d9488" },
  { category: "Utilities", amount: 164, color: "#2dd4bf" },
  { category: "Entertainment", amount: 180, color: "#5eead4" },
  { category: "Shopping", amount: 68, color: "#99f6e4" },
];

const monthlyData = [
  { month: "Sep", income: 4100, expenses: 2800 },
  { month: "Oct", income: 4250, expenses: 2950 },
  { month: "Nov", income: 4100, expenses: 3100 },
  { month: "Dec", income: 4500, expenses: 3400 },
  { month: "Jan", income: 4100, expenses: 2850 },
  { month: "Feb", income: 4100, expenses: 2900 },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function ReportsPage() {
  const [reportType, setReportType] = useState("monthly");
  const [dateRange, setDateRange] = useState("this-month");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Report generated successfully");
    setIsGenerating(false);
  };

  const handleExport = () => {
    toast.success("Report downloaded as PDF");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground mt-1">
          Generate and export financial reports
        </p>
      </div>

      {/* Report Generator */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Generate Report</CardTitle>
          <CardDescription>
            Choose a report type and date range to generate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <type.icon className="h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Date Range</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="last-month">Last Month</SelectItem>
                  <SelectItem value="this-quarter">This Quarter</SelectItem>
                  <SelectItem value="this-year">This Year</SelectItem>
                  <SelectItem value="all-time">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Preview */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Report Preview</CardTitle>
              <CardDescription>
                {reportType === "monthly" && "Monthly Summary - February 2026"}
                {reportType === "spending" && "Spending by Category - February 2026"}
                {reportType === "debt" && "Debt Progress Report"}
                {reportType === "budget" && "Budget vs Actual - February 2026"}
              </CardDescription>
            </div>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Monthly Summary Preview */}
          {reportType === "monthly" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-background p-4">
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold font-mono text-green-500">$4,100.00</p>
                </div>
                <div className="rounded-lg bg-background p-4">
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold font-mono text-red-500">$2,900.00</p>
                </div>
                <div className="rounded-lg bg-background p-4">
                  <p className="text-sm text-muted-foreground">Net Savings</p>
                  <p className="text-2xl font-bold font-mono text-primary">$1,200.00</p>
                </div>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <XAxis dataKey="month" stroke="#6b6b6b" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#6b6b6b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#141414", border: "1px solid #2a2a2a", borderRadius: "8px" }}
                      formatter={(value) => [formatCurrency(value as number), ""]}
                    />
                    <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm text-muted-foreground">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm text-muted-foreground">Expenses</span>
                </div>
              </div>
            </div>
          )}

          {/* Spending by Category Preview */}
          {reportType === "spending" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPieChart>
                    <Pie
                      data={spendingData}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: "#141414", border: "1px solid #2a2a2a", borderRadius: "8px" }}
                      formatter={(value) => [formatCurrency(value as number), ""]}
                    />
                  </RechartPieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {spendingData.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.category}</span>
                    </div>
                    <span className="font-mono">{formatCurrency(item.amount)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-4 flex items-center justify-between font-semibold">
                  <span>Total</span>
                  <span className="font-mono">
                    {formatCurrency(spendingData.reduce((sum, i) => sum + i.amount, 0))}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Debt Progress Preview */}
          {reportType === "debt" && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-background p-4">
                  <p className="text-sm text-muted-foreground">Starting Debt</p>
                  <p className="text-2xl font-bold font-mono">$69,000.00</p>
                </div>
                <div className="rounded-lg bg-background p-4">
                  <p className="text-sm text-muted-foreground">Current Debt</p>
                  <p className="text-2xl font-bold font-mono text-primary">$45,450.00</p>
                </div>
                <div className="rounded-lg bg-background p-4">
                  <p className="text-sm text-muted-foreground">Total Paid Off</p>
                  <p className="text-2xl font-bold font-mono text-green-500">$23,550.00</p>
                </div>
              </div>
              <div className="rounded-lg bg-background p-6">
                <p className="text-lg font-semibold mb-4">Progress: 34% Complete</p>
                <div className="h-4 rounded-full bg-secondary overflow-hidden mb-2">
                  <div className="h-full rounded-full bg-primary" style={{ width: "34%" }} />
                </div>
                <p className="text-sm text-muted-foreground">
                  At your current pace, you'll be debt-free by <span className="text-primary font-semibold">March 2028</span>
                </p>
              </div>
            </div>
          )}

          {/* Budget vs Actual Preview */}
          {reportType === "budget" && (
            <div className="space-y-4">
              {[
                { category: "Food", budget: 600, actual: 450 },
                { category: "Transportation", budget: 300, actual: 275 },
                { category: "Utilities", budget: 250, actual: 164 },
                { category: "Entertainment", budget: 150, actual: 180 },
                { category: "Shopping", budget: 200, actual: 68 },
              ].map((item) => {
                const diff = item.budget - item.actual;
                const isOver = diff < 0;
                return (
                  <div key={item.category} className="flex items-center gap-4">
                    <div className="w-32 font-medium">{item.category}</div>
                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isOver ? "bg-red-500" : "bg-primary"}`}
                          style={{ width: `${Math.min((item.actual / item.budget) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-24 text-right font-mono text-sm">
                      {formatCurrency(item.actual)}
                    </div>
                    <div className="w-24 text-right font-mono text-sm text-muted-foreground">
                      / {formatCurrency(item.budget)}
                    </div>
                    <div className={`w-20 text-right font-mono text-sm ${isOver ? "text-red-500" : "text-green-500"}`}>
                      {isOver ? "-" : "+"}${Math.abs(diff)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-surface-hover">
                <TableHead>Report Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Generated</TableHead>
                <TableHead>Size</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReports.map((report) => (
                <TableRow key={report.id} className="border-border hover:bg-surface-hover">
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{report.type}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground">{report.date}</TableCell>
                  <TableCell className="text-muted-foreground">{report.size}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
