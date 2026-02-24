import { Sidebar, MobileSidebar } from "@/components/layout/sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <MobileSidebar />
          <span className="font-bold">PayoffPath</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
