"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingDown, TrendingUp, DollarSign, Calendar, Clock, CreditCard } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data
const stats = [
  {
    title: "Total Debt",
    value: "$45,450",
    change: "-$1,230",
    trend: "down",
    icon: CreditCard,
  },
  {
    title: "Monthly Burn",
    value: "$3,240",
    change: "+$120",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Debt-Free Date",
    value: "Mar 2028",
    change: "2 mo earlier",
    trend: "down",
    icon: Calendar,
  },
  {
    title: "Runway",
    value: "36 months",
    change: "On track",
    trend: "stable",
    icon: Clock,
  },
];

const runwayData = [
  { month: "Jan", actual: 48000, projected: 48000 },
  { month: "Feb", actual: 46500, projected: 46800 },
  { month: "Mar", actual: 45450, projected: 45600 },
  { month: "Apr", actual: null, projected: 44400 },
  { month: "May", actual: null, projected: 43200 },
  { month: "Jun", actual: null, projected: 42000 },
  { month: "Jul", actual: null, projected: 40800 },
  { month: "Aug", actual: null, projected: 39600 },
  { month: "Sep", actual: null, projected: 38400 },
  { month: "Oct", actual: null, projected: 37200 },
  { month: "Nov", actual: null, projected: 36000 },
  { month: "Dec", actual: null, projected: 34800 },
];

const debtTimeline = [
  { name: "Credit Card", total: 8450, paid: 5915, color: "#14b8a6" },
  { name: "Student Loan", total: 24200, paid: 10890, color: "#0d9488" },
  { name: "Car Loan", total: 12800, paid: 7040, color: "#2dd4bf" },
];

const recentTransactions = [
  { id: 1, date: "2026-02-24", description: "Grocery Store", category: "Food", amount: -124.50 },
  { id: 2, date: "2026-02-23", description: "Paycheck", category: "Income", amount: 3250.00 },
  { id: 3, date: "2026-02-22", description: "Electric Bill", category: "Utilities", amount: -89.00 },
  { id: 4, date: "2026-02-21", description: "Netflix", category: "Entertainment", amount: -15.99 },
  { id: 5, date: "2026-02-20", description: "Gas Station", category: "Transportation", amount: -45.00 },
  { id: 6, date: "2026-02-19", description: "Credit Card Payment", category: "Debt", amount: -500.00 },
  { id: 7, date: "2026-02-18", description: "Coffee Shop", category: "Food", amount: -6.50 },
  { id: 8, date: "2026-02-17", description: "Freelance Payment", category: "Income", amount: 850.00 },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Track your progress toward debt-free
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                {stat.trend === "down" && (
                  <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                )}
                {stat.trend === "up" && (
                  <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "down"
                      ? "text-green-500"
                      : stat.trend === "up"
                      ? "text-red-500"
                      : ""
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Runway Chart */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Debt Payoff Projection</CardTitle>
            <CardDescription>
              Actual vs projected debt over the next 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={runwayData}>
                  <XAxis
                    dataKey="month"
                    stroke="#6b6b6b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6b6b6b"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#141414",
                      border: "1px solid #2a2a2a",
                      borderRadius: "8px",
                    }}
                    formatter={(value) => [formatCurrency(value as number), ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="actual"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    dot={{ fill: "#14b8a6", strokeWidth: 0 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="projected"
                    stroke="#6b6b6b"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">Projected</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Debt Timeline */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Debt Timeline</CardTitle>
            <CardDescription>
              Progress on each debt account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {debtTimeline.map((debt) => {
                const percentage = Math.round((debt.paid / debt.total) * 100);
                const remaining = debt.total - debt.paid;
                return (
                  <div key={debt.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{debt.name}</span>
                      <span className="font-mono text-sm text-muted-foreground">
                        {formatCurrency(remaining)} remaining
                      </span>
                    </div>
                    <div className="h-4 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: debt.color,
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {percentage}% paid
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatCurrency(debt.paid)} of {formatCurrency(debt.total)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your last 8 transactions</CardDescription>
            </div>
            <Badge variant="secondary">View All</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-surface-hover">
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx) => (
                <TableRow
                  key={tx.id}
                  className="border-border hover:bg-surface-hover"
                >
                  <TableCell className="font-mono text-muted-foreground">
                    {tx.date}
                  </TableCell>
                  <TableCell>{tx.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{tx.category}</Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-mono ${
                      tx.amount >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {tx.amount >= 0 ? "+" : ""}
                    {formatCurrency(tx.amount)}
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
