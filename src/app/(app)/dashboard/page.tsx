"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown, TrendingUp, DollarSign, Calendar, Clock, CreditCard, Plus, Loader2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

function generateProjectionData(totalDebt: number, monthlyPayment: number) {
  const data = [];
  let remaining = totalDebt;
  const today = new Date();
  
  for (let i = 0; i < 12; i++) {
    const date = new Date(today);
    date.setMonth(date.getMonth() + i);
    const monthName = date.toLocaleDateString("en-US", { month: "short" });
    
    data.push({
      month: monthName,
      actual: i === 0 ? remaining : null,
      projected: Math.max(0, remaining),
    });
    
    remaining = Math.max(0, remaining - monthlyPayment);
  }
  
  return data;
}

function calculateDebtFreeDate(totalDebt: number, monthlyPayment: number): string {
  if (monthlyPayment <= 0 || totalDebt <= 0) return "—";
  
  const months = Math.ceil(totalDebt / monthlyPayment);
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function DashboardPage() {
  const [debts, setDebts] = useState<Debt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDebts = async () => {
      try {
        const res = await fetch("/api/debts");
        if (res.ok) {
          const data = await res.json();
          setDebts(data);
        }
      } catch (error) {
        console.error("Failed to fetch debts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDebts();
  }, []);

  const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const totalOriginalDebt = debts.reduce((sum, d) => sum + d.originalBalance, 0);
  const totalMinPayment = debts.reduce((sum, d) => sum + d.minimumPayment, 0);
  const extraPayment = 200;
  const totalMonthlyPayment = totalMinPayment + extraPayment;
  const paidOff = totalOriginalDebt - totalDebt;
  
  const debtFreeDate = calculateDebtFreeDate(totalDebt, totalMonthlyPayment);
  const runwayMonths = totalMonthlyPayment > 0 ? Math.ceil(totalDebt / totalMonthlyPayment) : 0;
  const projectionData = generateProjectionData(totalDebt, totalMonthlyPayment);

  const stats = [
    {
      title: "Total Debt",
      value: debts.length > 0 ? formatCurrency(totalDebt) : "—",
      change: paidOff > 0 ? `-${formatCurrency(paidOff)}` : "—",
      trend: paidOff > 0 ? "down" : "stable",
      icon: CreditCard,
    },
    {
      title: "Monthly Burn",
      value: debts.length > 0 ? formatCurrency(totalMonthlyPayment) : "—",
      change: debts.length > 0 ? `${formatCurrency(totalMinPayment)} min` : "—",
      trend: "stable",
      icon: DollarSign,
    },
    {
      title: "Debt-Free Date",
      value: debtFreeDate,
      change: runwayMonths > 0 ? `${runwayMonths} months` : "—",
      trend: "down",
      icon: Calendar,
    },
    {
      title: "Runway",
      value: runwayMonths > 0 ? `${runwayMonths} months` : "—",
      change: debts.length > 0 ? "On track" : "—",
      trend: "stable",
      icon: Clock,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

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
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {debts.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No debts tracked yet</h3>
            <p className="text-muted-foreground text-center mb-4 max-w-md">
              Start by adding your debts. PayoffPath will help you visualize your path to financial freedom.
            </p>
            <Button asChild>
              <Link href="/debts">
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Debt
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Charts Row */}
      {debts.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Runway Chart */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Debt Payoff Projection</CardTitle>
              <CardDescription>
                Projected debt over the next 12 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
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
                  <span className="text-sm text-muted-foreground">Current</span>
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
                {debts.map((debt) => {
                  const percentage = Math.round(((debt.originalBalance - debt.balance) / debt.originalBalance) * 100);
                  const remaining = debt.balance;
                  return (
                    <div key={debt.id}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{debt.name}</span>
                        <span className="font-mono text-sm text-muted-foreground">
                          {formatCurrency(remaining)} remaining
                        </span>
                      </div>
                      <div className="h-4 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-500"
                          style={{
                            width: `${Math.max(0, percentage)}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {Math.max(0, percentage)}% paid
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatCurrency(debt.originalBalance - debt.balance)} of {formatCurrency(debt.originalBalance)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      {debts.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your finances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="secondary">
                <Link href="/debts">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Debts
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href="/debts">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Debt
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
