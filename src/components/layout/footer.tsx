import Link from "next/link";
import { TrendingDown } from "lucide-react";

const footerLinks = {
  product: [
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/deck", label: "Pitch Deck" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-custom py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <TrendingDown className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">PayoffPath</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">
              Financial command center for people who respect data over debt. 
              Track expenses, forecast payoff timelines, and execute your plan.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold">Legal</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PayoffPath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
