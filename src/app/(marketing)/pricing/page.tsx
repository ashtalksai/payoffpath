"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Get started with the basics. No credit card required.",
    features: [
      { name: "100 transactions/month", included: true },
      { name: "1 debt account", included: true },
      { name: "Manual entry", included: true },
      { name: "Basic dashboard", included: true },
      { name: "Simple reports", included: true },
      { name: "PDF import", included: false },
      { name: "Unlimited transactions", included: false },
      { name: "Unlimited debt accounts", included: false },
      { name: "Advanced forecasting", included: false },
      { name: "Export reports", included: false },
      { name: "Priority support", included: false },
    ],
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$50",
    period: "/year",
    description: "Everything you need to conquer your debt. Half the price of competitors.",
    features: [
      { name: "Unlimited transactions", included: true },
      { name: "Unlimited debt accounts", included: true },
      { name: "PDF bank statement import", included: true },
      { name: "Full dashboard with analytics", included: true },
      { name: "Advanced forecasting", included: true },
      { name: "Snowball/Avalanche/Custom strategies", included: true },
      { name: "What-if scenarios", included: true },
      { name: "Export PDF reports", included: true },
      { name: "CSV data export", included: true },
      { name: "Priority email support", included: true },
      { name: "Early access to new features", included: true },
    ],
    cta: "Go Pro",
    highlighted: true,
  },
];

const comparisons = [
  { app: "YNAB", price: "$109/year", pdfImport: "❌", debtFocus: "Limited", darkMode: "Yes" },
  { app: "Monarch", price: "$99/year", pdfImport: "❌", debtFocus: "Limited", darkMode: "Yes" },
  { app: "Quicken Simplifi", price: "$72/year", pdfImport: "❌", debtFocus: "Basic", darkMode: "No" },
  { app: "PayoffPath", price: "$50/year", pdfImport: "✓", debtFocus: "Built for it", darkMode: "Default" },
];

const faqs = [
  {
    question: "Can I try PayoffPath before paying?",
    answer:
      "Yes! The free tier is free forever. Use it for as long as you want. Upgrade to Pro when you need more features.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. All payments are processed securely through Stripe.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. Cancel anytime from your settings. You'll keep Pro access until the end of your billing period. No questions asked.",
  },
  {
    question: "Is there a refund policy?",
    answer:
      "Yes. If you're not satisfied within the first 30 days, contact us for a full refund. We want you to be happy.",
  },
  {
    question: "Do you offer team or family plans?",
    answer:
      "Not yet, but it's on our roadmap. Sign up for our newsletter to be notified when family accounts launch.",
  },
  {
    question: "Why is PayoffPath so much cheaper?",
    answer:
      "We're focused on one thing: debt payoff. No bloat means lower costs. We pass those savings to you.",
  },
];

export default function PricingPage() {
  return (
    <div className="py-20 md:py-28">
      <div className="container-custom">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h1 className="text-4xl font-bold md:text-5xl">
            Simple, <span className="text-primary">Fair</span> Pricing
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Half the price of competitors. Built specifically for debt payoff. 
            Free tier available forever.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto mb-20">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
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
                    <span className="font-mono text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="mt-4">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.name} className="flex items-center gap-3">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-primary flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span
                          className={
                            feature.included ? "" : "text-muted-foreground"
                          }
                        >
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    size="lg"
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

        {/* Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Compare to Competitors
          </h2>
          <div className="max-w-3xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4">App</th>
                  <th className="text-center py-4 px-4">Price</th>
                  <th className="text-center py-4 px-4">PDF Import</th>
                  <th className="text-center py-4 px-4">Debt Focus</th>
                  <th className="text-center py-4 px-4">Dark Mode</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr
                    key={row.app}
                    className={`border-b border-border ${
                      row.app === "PayoffPath" ? "bg-primary/5" : ""
                    }`}
                  >
                    <td className="py-4 px-4 font-medium">
                      {row.app}
                      {row.app === "PayoffPath" && (
                        <Badge className="ml-2" variant="secondary">
                          You
                        </Badge>
                      )}
                    </td>
                    <td className="text-center py-4 px-4 font-mono">
                      {row.price}
                    </td>
                    <td className="text-center py-4 px-4">{row.pdfImport}</td>
                    <td className="text-center py-4 px-4">{row.debtFocus}</td>
                    <td className="text-center py-4 px-4">{row.darkMode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-bold text-center mb-8">
            Pricing FAQ
          </h2>
          <div className="max-w-2xl mx-auto">
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
          </div>
        </motion.section>
      </div>
    </div>
  );
}
