"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, Target, Shield, Zap, Users, Rocket } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Focus on Results",
    description:
      "Every feature exists to help you become debt-free faster. No bloat, no distractions.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your data is yours. No bank connections required. No selling your information.",
  },
  {
    icon: Zap,
    title: "Speed Matters",
    description:
      "Fast UI, instant calculations, quick imports. Your time is valuable.",
  },
  {
    icon: TrendingDown,
    title: "Progress Visible",
    description:
      "Timeline visualizations that show debt going DOWN. Motivation built in.",
  },
];

const roadmap = [
  { status: "done", title: "Core app launch", description: "Dashboard, transactions, debts, budgets" },
  { status: "done", title: "PDF import", description: "Bank statement parsing" },
  { status: "current", title: "Mobile app", description: "iOS and Android native apps" },
  { status: "planned", title: "Smart insights", description: "AI-powered spending analysis" },
  { status: "planned", title: "Partner integrations", description: "Debt consolidation recommendations" },
];

export default function AboutPage() {
  return (
    <div className="py-20 md:py-28">
      <div className="container-custom">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <Badge variant="secondary" className="mb-4">
            Our Story
          </Badge>
          <h1 className="text-4xl font-bold md:text-5xl">
            Built for People Who{" "}
            <span className="text-primary">Respect Their Money</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            PayoffPath was born from frustration with overpriced, bloated finance apps 
            that treat debt payoff as an afterthought. We believe in tools that are 
            focused, fast, and fair.
          </p>
        </motion.div>

        {/* The Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-3xl mx-auto prose prose-invert">
            <h2 className="text-2xl font-bold mb-6">Why We Built This</h2>
            <p className="text-muted-foreground mb-4">
              We were tired of personal finance apps that cost $100+ per year, 
              required bank account connections we weren't comfortable with, and 
              showed us the same unhelpful pie charts everyone else uses.
            </p>
            <p className="text-muted-foreground mb-4">
              We wanted something different. Something that showed <strong>progress</strong> — 
              debt timelines going down, not static snapshots of where we are. Something 
              that let us import bank statements as PDFs instead of connecting our accounts. 
              Something that costs half as much and works twice as well for debt payoff.
            </p>
            <p className="text-muted-foreground">
              So we built it. PayoffPath is the financial command center we wanted 
              for ourselves. Now it's yours too.
            </p>
          </div>
        </motion.section>

        {/* Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-12">Our Philosophy</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-border bg-card hover:bg-surface-hover transition-colors">
                  <CardContent className="p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4">
                      <value.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Roadmap */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-center mb-12">Product Roadmap</h2>
          <div className="max-w-2xl mx-auto">
            <div className="space-y-6">
              {roadmap.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-4 w-4 rounded-full ${
                        item.status === "done"
                          ? "bg-primary"
                          : item.status === "current"
                          ? "bg-warning"
                          : "bg-muted"
                      }`}
                    />
                    {i < roadmap.length - 1 && (
                      <div className="w-0.5 h-full bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.status === "done" && (
                        <Badge variant="secondary" className="text-xs">
                          Complete
                        </Badge>
                      )}
                      {item.status === "current" && (
                        <Badge className="text-xs">In Progress</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
