"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import {
  TrendingDown,
  FileText,
  Calculator,
  BarChart3,
  PiggyBank,
  LineChart,
  Download,
  ArrowRight,
  Check,
  X,
  DollarSign,
  Target,
  Clock,
  Upload,
  Tags,
  ChevronRight,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Section 1: Hero
function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6">
              PDF Import • Debt Forecasting • Timeline Viz
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              See Your Debt{" "}
              <span className="text-primary">Disappear</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl max-w-lg">
              Financial command center for people who respect data over debt. 
              Track expenses, forecast payoff timelines, and execute your plan.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Start For Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Timeline Chart Visualization */}
            <div className="relative rounded-xl border border-border bg-card p-6 accent-glow">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Debt Payoff Timeline</span>
                <span className="font-mono text-sm text-primary">Debt-free: Mar 2028</span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Credit Card", amount: "$8,450", progress: 70, color: "bg-primary" },
                  { label: "Student Loan", amount: "$24,200", progress: 45, color: "bg-primary/80" },
                  { label: "Car Loan", amount: "$12,800", progress: 55, color: "bg-primary/60" },
                ].map((debt, i) => (
                  <motion.div
                    key={debt.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <div className="flex justify-between text-sm mb-1">
                      <span>{debt.label}</span>
                      <span className="font-mono text-muted-foreground">{debt.amount}</span>
                    </div>
                    <div className="h-3 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${debt.progress}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + i * 0.1 }}
                        className={`h-full rounded-full ${debt.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="font-mono text-xl font-bold text-primary">$45,450</p>
                  <p className="text-xs text-muted-foreground">Total Debt</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-xl font-bold">$1,250</p>
                  <p className="text-xs text-muted-foreground">Monthly</p>
                </div>
                <div className="text-center">
                  <p className="font-mono text-xl font-bold text-green-500">36 mo</p>
                  <p className="text-xs text-muted-foreground">Until Free</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Section 2: Problem
function ProblemSection() {
  const problems = [
    {
      icon: DollarSign,
      title: "Overpriced Apps",
      description: "Competitors charge $99-150/year for basic features you might not even use.",
    },
    {
      icon: FileText,
      title: "Missing Features",
      description: "No PDF bank statement import. Manual entry for everything. Hours wasted.",
    },
    {
      icon: BarChart3,
      title: "Wrong Visualizations",
      description: "Pie charts show where you ARE. Timelines show where you're GOING.",
    },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Personal Finance Apps Are <span className="text-destructive">Broken</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            You've tried them. You know the frustration.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {problems.map((problem) => (
            <motion.div key={problem.title} variants={fadeIn}>
              <Card className="h-full border-border bg-background hover:bg-surface-hover transition-colors">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10 text-destructive mb-4">
                    <problem.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Section 3: Solution
function SolutionSection() {
  const features = [
    "Import PDF bank statements instantly",
    "See your debt-free date calculated",
    "Track every expense with smart categorization",
    "Forecast your financial future",
    "Export professional reports",
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 border-primary text-primary">
              The Solution
            </Badge>
            <h2 className="text-3xl font-bold md:text-4xl">
              Your Financial <span className="text-primary">Command Center</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              PayoffPath gives you the tools you need without the bloat you don't. 
              Dark mode. Data-dense. Built for people who respect their money.
            </p>
            <ul className="mt-8 space-y-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-8" size="lg" asChild>
              <Link href="/signup">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="border-border bg-card">
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <div className="h-3 w-3 rounded-full bg-warning" />
                  <div className="h-3 w-3 rounded-full bg-success" />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Total Debt", value: "$45,450", trend: "down" },
                    { label: "Monthly Burn", value: "$3,240", trend: "stable" },
                    { label: "Debt-Free Date", value: "Mar 2028", trend: "up" },
                    { label: "Runway", value: "36 months", trend: "stable" },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-lg bg-background p-4">
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="mt-1 font-mono text-lg font-semibold">{stat.value}</p>
                    </div>
                  ))}
                </div>
                <div className="h-32 rounded-lg bg-background p-4">
                  <p className="text-xs text-muted-foreground mb-3">Debt Payoff Projection</p>
                  <div className="flex items-end gap-1 h-20">
                    {[100, 90, 82, 73, 65, 55, 46, 38, 28, 18, 8, 0].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-primary/80 transition-all"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Section 4: Features
function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: "PDF Import",
      description: "Upload bank statements and watch transactions appear automatically. No manual entry.",
    },
    {
      icon: Calculator,
      title: "Debt Payoff Calculator",
      description: "Snowball, avalanche, or custom strategy. See exactly when you'll be debt-free.",
    },
    {
      icon: TrendingDown,
      title: "Timeline Visualization",
      description: "Watch your debt bars shrink over time. Progress you can actually see.",
    },
    {
      icon: PiggyBank,
      title: "Budget Tracking",
      description: "Set category budgets. Get visual alerts before you overspend.",
    },
    {
      icon: LineChart,
      title: "Forecasting",
      description: "Project your financial future. What-if scenarios at your fingertips.",
    },
    {
      icon: Download,
      title: "Export Reports",
      description: "Generate professional PDF reports. Monthly summaries, debt progress, and more.",
    },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Everything You Need, <span className="text-primary">Nothing You Don't</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Six core features. No bloat. No confusion.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={fadeIn}>
              <Card className="h-full border-border bg-background card-hover">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Section 5: How It Works
function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      icon: Upload,
      title: "Import",
      description: "Upload your PDF bank statements or enter transactions manually. Your choice.",
    },
    {
      number: "02",
      icon: Tags,
      title: "Categorize",
      description: "Tag expenses, assign to budgets, and add notes. Smart suggestions help you go fast.",
    },
    {
      number: "03",
      icon: Target,
      title: "Execute",
      description: "See your timeline, track progress, and stay on course to debt-free.",
    },
  ];

  return (
    <section id="how-it-works" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Three steps. No complexity. Just results.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <span className="font-mono text-6xl font-bold text-primary/20">{step.number}</span>
                <div className="mt-4 flex h-16 w-16 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <step.icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-xl font-bold">{step.title}</h3>
                <p className="mt-3 text-muted-foreground">{step.description}</p>
              </div>
              {i < steps.length - 1 && (
                <ChevronRight className="absolute top-1/3 -right-4 hidden h-8 w-8 text-muted-foreground/30 md:block" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Section 6: Differentiation
function DifferentiationSection() {
  const comparisons = [
    { feature: "Annual Cost", others: "$99-150", payoff: "$50" },
    { feature: "PDF Import", others: "❌", payoff: "✓" },
    { feature: "Timeline Viz", others: "Pie charts", payoff: "Timelines" },
    { feature: "Debt Focus", others: "General", payoff: "Built for it" },
    { feature: "Dark Mode", others: "Sometimes", payoff: "Default" },
    { feature: "Bank Sync", others: "Required", payoff: "Optional" },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Why <span className="text-primary">PayoffPath</span>?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Side-by-side with the competition. The differences are clear.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-background p-4 font-semibold">
              <div>Feature</div>
              <div className="text-center text-muted-foreground">Other Apps</div>
              <div className="text-center text-primary">PayoffPath</div>
            </div>
            {comparisons.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 p-4 ${i % 2 === 0 ? "bg-card" : "bg-background"}`}
              >
                <div className="font-medium">{row.feature}</div>
                <div className="text-center text-muted-foreground">{row.others}</div>
                <div className="text-center font-semibold text-primary">{row.payoff}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Section 7: Pricing Preview
function PricingPreviewSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Get started with the basics",
      features: [
        "100 transactions/month",
        "1 debt account",
        "Manual entry only",
        "Basic reports",
      ],
      cta: "Start Free",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "$50",
      period: "/year",
      description: "Everything you need to get debt-free",
      features: [
        "Unlimited transactions",
        "Unlimited debt accounts",
        "PDF bank statement import",
        "Advanced forecasting",
        "Export PDF reports",
        "Priority support",
      ],
      cta: "Go Pro",
      highlighted: true,
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Simple, <span className="text-primary">Fair</span> Pricing
          </h2>
          <p className="mt-4 text-muted-foreground">
            Half the price of competitors. Twice the focus on debt payoff.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card
                className={`h-full ${
                  plan.highlighted
                    ? "border-primary bg-primary/5 accent-glow"
                    : "border-border bg-card"
                }`}
              >
                <CardHeader>
                  {plan.highlighted && (
                    <Badge className="w-fit mb-2">Most Popular</Badge>
                  )}
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="font-mono text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={plan.highlighted ? "default" : "secondary"}
                    asChild
                  >
                    <Link href="/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          <Link href="/pricing" className="text-primary hover:underline">
            View full pricing details →
          </Link>
        </p>
      </div>
    </section>
  );
}

// Section 8: FAQ
function FAQSection() {
  const faqs = [
    {
      question: "How is PayoffPath different from YNAB or Mint?",
      answer:
        "PayoffPath is built specifically for debt payoff, not general budgeting. We use timeline visualizations instead of pie charts, support PDF bank statement imports, and cost half as much. Plus, we're dark mode by default because we respect your eyes.",
    },
    {
      question: "Do I need to connect my bank account?",
      answer:
        "No. We believe in privacy-first design. You can import PDF bank statements or enter transactions manually. No bank sync means no security worries.",
    },
    {
      question: "How does PDF import work?",
      answer:
        "Upload your bank statement PDF and our parser extracts transactions automatically. Review, categorize, and you're done. Works with most major banks.",
    },
    {
      question: "What's included in the free tier?",
      answer:
        "100 transactions per month, 1 debt account, basic reports, and manual entry. Enough to try PayoffPath and see if it fits your workflow.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. All data is encrypted at rest and in transit. We never sell your data. We never share your data. We make money from subscriptions, not your information.",
    },
    {
      question: "What happens after I'm debt-free?",
      answer:
        "Celebrate! Then keep using PayoffPath to track expenses, build savings, and stay debt-free. The skills and habits transfer.",
    },
  ];

  return (
    <section className="section-padding bg-card">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

// Section 9: Final CTA
function FinalCTASection() {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Start Your Path to <span className="text-primary">Debt-Free</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of people who've taken control of their finances with PayoffPath.
          </p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/signup">
              Start For Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            No credit card required. Free tier available forever.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DifferentiationSection />
        <PricingPreviewSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
