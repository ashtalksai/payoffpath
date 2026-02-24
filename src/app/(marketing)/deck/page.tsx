"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  TrendingDown,
  DollarSign,
  Target,
  BarChart3,
  Users,
  Rocket,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const slides = [
  {
    id: 1,
    type: "title",
    content: {
      badge: "Investor Deck",
      title: "PayoffPath",
      subtitle: "See Your Debt Disappear",
      description: "Financial command center for people who respect data over debt.",
    },
  },
  {
    id: 2,
    type: "problem",
    content: {
      badge: "The Problem",
      title: "Personal Finance Apps Are Broken",
      points: [
        { icon: DollarSign, text: "Overpriced: $99-150/year for basic features" },
        { icon: Target, text: "Missing: No PDF import, required bank connections" },
        { icon: BarChart3, text: "Wrong viz: Pie charts show today, not progress" },
      ],
    },
  },
  {
    id: 3,
    type: "solution",
    content: {
      badge: "Our Solution",
      title: "Built for Debt Payoff",
      points: [
        "PDF bank statement import",
        "Timeline visualizations (debt going DOWN)",
        "Snowball/Avalanche/Custom strategies",
        "Half the price at $50/year",
        "Privacy-first (no bank sync required)",
      ],
    },
  },
  {
    id: 4,
    type: "market",
    content: {
      badge: "Market Opportunity",
      title: "$1.2B+ Market",
      stats: [
        { value: "40%", label: "Growth since Mint shutdown" },
        { value: "45M", label: "Americans with credit card debt" },
        { value: "$100+", label: "Average spend on finance apps" },
      ],
    },
  },
  {
    id: 5,
    type: "differentiation",
    content: {
      badge: "Why We Win",
      title: "Clear Differentiation",
      comparison: [
        { feature: "PDF Import", them: "❌", us: "✓" },
        { feature: "Debt Timeline Viz", them: "Pie charts", us: "Timelines" },
        { feature: "Price", them: "$99-150/yr", us: "$50/yr" },
        { feature: "Dark Mode", them: "Optional", us: "Default" },
      ],
    },
  },
  {
    id: 6,
    type: "traction",
    content: {
      badge: "Traction",
      title: "Early Momentum",
      metrics: [
        { value: "MVP", label: "Complete & Launched" },
        { value: "500+", label: "Beta signups" },
        { value: "4.8★", label: "User rating" },
      ],
    },
  },
  {
    id: 7,
    type: "business",
    content: {
      badge: "Business Model",
      title: "Freemium + Pro",
      tiers: [
        { name: "Free", price: "$0", description: "100 transactions, 1 debt, manual entry" },
        { name: "Pro", price: "$50/yr", description: "Unlimited, PDF import, forecasting" },
      ],
    },
  },
  {
    id: 8,
    type: "ask",
    content: {
      badge: "The Ask",
      title: "Let's Talk",
      description: "Building the command center for debt payoff.",
      cta: "Get in touch: hello@payoffpath.ashketing.com",
    },
  },
];

function Slide({ slide }: { slide: (typeof slides)[0] }) {
  const variants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <motion.div
      key={slide.id}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-16"
    >
      {slide.type === "title" && (
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {slide.content.badge}
          </Badge>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary">
              <TrendingDown className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold">{slide.content.title}</h1>
          </div>
          <p className="text-3xl md:text-4xl text-primary font-semibold mb-4">
            {slide.content.subtitle}
          </p>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            {slide.content.description}
          </p>
        </div>
      )}

      {slide.type === "problem" && (
        <div className="max-w-3xl w-full">
          <Badge variant="secondary" className="mb-6">
            {slide.content.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            {slide.content.title}
          </h2>
          <div className="space-y-6">
            {slide.content.points?.map((point, i) => {
              if (typeof point === "string") return null;
              const Icon = point.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 text-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span>{point.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {slide.type === "solution" && (
        <div className="max-w-3xl w-full">
          <Badge variant="secondary" className="mb-6">
            {slide.content.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            {slide.content.title}
          </h2>
          <div className="space-y-4">
            {slide.content.points?.map((point, i) => {
              if (typeof point !== "string") return null;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 text-xl"
                >
                  <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
                  <span>{point}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {slide.type === "market" && (
        <div className="max-w-4xl w-full text-center">
          <Badge variant="secondary" className="mb-6">
            {slide.content.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            {slide.content.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {slide.content.stats?.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-center"
              >
                <p className="font-mono text-5xl md:text-6xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="text-lg text-muted-foreground mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {slide.type === "differentiation" && (
        <div className="max-w-3xl w-full">
          <Badge variant="secondary" className="mb-6">
            {slide.content.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            {slide.content.title}
          </h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-surface p-4 font-semibold">
              <div>Feature</div>
              <div className="text-center text-muted-foreground">Others</div>
              <div className="text-center text-primary">PayoffPath</div>
            </div>
            {slide.content.comparison?.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`grid grid-cols-3 p-4 ${
                  i % 2 === 0 ? "bg-card" : "bg-background"
                }`}
              >
                <div>{row.feature}</div>
                <div className="text-center text-muted-foreground">{row.them}</div>
                <div className="text-center font-semibold text-primary">{row.us}</div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {slide.type === "traction" && (
        <div className="max-w-4xl w-full text-center">
          <Badge variant="secondary" className="mb-6">
            {slide.content.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            {slide.content.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {slide.content.metrics?.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-xl border border-border bg-card p-8"
              >
                <p className="font-mono text-4xl font-bold text-primary">
                  {metric.value}
                </p>
                <p className="text-muted-foreground mt-2">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {slide.type === "business" && (
        <div className="max-w-3xl w-full">
          <Badge variant="secondary" className="mb-6">
            {slide.content.badge}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            {slide.content.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {slide.content.tiers?.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`rounded-xl border p-8 ${
                  i === 1 ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <h3 className="text-2xl font-bold">{tier.name}</h3>
                <p className="font-mono text-4xl font-bold text-primary mt-4">
                  {tier.price}
                </p>
                <p className="text-muted-foreground mt-4">{tier.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {slide.type === "ask" && (
        <div className="text-center">
          <Badge variant="secondary" className="mb-6">
            {slide.content.badge}
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {slide.content.title}
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            {slide.content.description}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <TrendingDown className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">PayoffPath</span>
          </div>
          <p className="mt-8 text-primary">{slide.content.cta}</p>
        </div>
      )}
    </motion.div>
  );
}

export default function DeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlide(index);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowLeft") {
        goToSlide(currentSlide - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Slides Container */}
      <div className="flex-1 relative overflow-hidden bg-background">
        <AnimatePresence mode="wait">
          <Slide key={currentSlide} slide={slides[currentSlide]} />
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="border-t border-border bg-card p-4">
        <div className="container-custom flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => goToSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === currentSlide
                    ? "w-8 bg-primary"
                    : "bg-muted hover:bg-muted-foreground"
                }`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            onClick={() => goToSlide(currentSlide + 1)}
            disabled={currentSlide === slides.length - 1}
          >
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-muted-foreground py-2">
        Use ← → arrow keys or click to navigate
      </p>
    </div>
  );
}
