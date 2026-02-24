"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, CreditCard, Tags, FolderOpen, Download, Trash2, Plus, Pencil } from "lucide-react";
import { toast } from "sonner";

const mockAccounts = [
  { id: 1, name: "Chase Checking", type: "Checking", balance: 4520.00 },
  { id: 2, name: "Chase Savings", type: "Savings", balance: 12350.00 },
  { id: 3, name: "Chase Credit Card", type: "Credit Card", balance: -8450.00 },
];

const mockCategories = [
  { id: 1, name: "Food", color: "#14b8a6", transactionCount: 45 },
  { id: 2, name: "Transportation", color: "#0d9488", transactionCount: 23 },
  { id: 3, name: "Utilities", color: "#2dd4bf", transactionCount: 12 },
  { id: 4, name: "Entertainment", color: "#5eead4", transactionCount: 18 },
  { id: 5, name: "Shopping", color: "#99f6e4", transactionCount: 31 },
  { id: 6, name: "Healthcare", color: "#f59e0b", transactionCount: 5 },
  { id: 7, name: "Income", color: "#10b981", transactionCount: 8 },
  { id: 8, name: "Debt", color: "#ef4444", transactionCount: 15 },
];

const mockTags = [
  { id: 1, name: "groceries", count: 28 },
  { id: 2, name: "dining", count: 17 },
  { id: 3, name: "subscription", count: 12 },
  { id: 4, name: "bills", count: 15 },
  { id: 5, name: "fuel", count: 8 },
  { id: 6, name: "salary", count: 6 },
  { id: 7, name: "freelance", count: 4 },
  { id: 8, name: "debt-payment", count: 10 },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export default function SettingsPage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const handleExportData = (format: string) => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
  };

  const handleDeleteAccount = () => {
    toast.error("Account deletion is disabled in demo mode");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-card border border-border">
          <TabsTrigger value="profile" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="accounts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <CreditCard className="h-4 w-4 mr-2" />
            Accounts
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <FolderOpen className="h-4 w-4 mr-2" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="tags" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Tags className="h-4 w-4 mr-2" />
            Tags
          </TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Download className="h-4 w-4 mr-2" />
            Export
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Weekly Report</p>
                  <p className="text-sm text-muted-foreground">
                    Get a summary of your finances every week
                  </p>
                </div>
                <Switch
                  checked={weeklyReport}
                  onCheckedChange={setWeeklyReport}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Budget Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified when approaching budget limits
                  </p>
                </div>
                <Switch
                  checked={budgetAlerts}
                  onCheckedChange={setBudgetAlerts}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>
                Manage your subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Pro Plan</p>
                    <Badge>Active</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    $50/year • Renews on March 1, 2027
                  </p>
                </div>
                <Button variant="secondary">Manage</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive bg-card">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Account</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. All your data will be permanently deleted.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="secondary">Cancel</Button>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      Delete Account
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Accounts Tab */}
        <TabsContent value="accounts" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Financial Accounts</CardTitle>
                  <CardDescription>
                    Manage your bank accounts and credit cards
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead>Account Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="text-right">Balance</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAccounts.map((account) => (
                    <TableRow key={account.id} className="border-border">
                      <TableCell className="font-medium">{account.name}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{account.type}</Badge>
                      </TableCell>
                      <TableCell className={`text-right font-mono ${account.balance < 0 ? "text-red-500" : "text-green-500"}`}>
                        {formatCurrency(account.balance)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction Categories</CardTitle>
                  <CardDescription>
                    Organize your transactions by category
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {mockCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-surface-hover transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {category.transactionCount} transactions
                      </span>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tags Tab */}
        <TabsContent value="tags" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction Tags</CardTitle>
                  <CardDescription>
                    Custom tags for detailed tracking
                  </CardDescription>
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Tag
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {mockTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 hover:bg-surface-hover transition-colors group"
                  >
                    <Badge variant="outline">{tag.name}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {tag.count}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Export Tab */}
        <TabsContent value="export" className="space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle>Export Your Data</CardTitle>
              <CardDescription>
                Download your financial data in various formats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">CSV Export</CardTitle>
                    <CardDescription>
                      Spreadsheet-compatible format
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => handleExportData("csv")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CSV
                    </Button>
                  </CardContent>
                </Card>
                <Card className="border-border">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">JSON Export</CardTitle>
                    <CardDescription>
                      Full data backup
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => handleExportData("json")}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download JSON
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-muted-foreground">
                Your export will include all transactions, debts, budgets, and settings.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
