import { TrendingDown } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
          <TrendingDown className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold">PayoffPath</span>
      </Link>
      {children}
    </div>
  );
}
