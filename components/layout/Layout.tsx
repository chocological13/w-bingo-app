import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 md:py-10">{children}</main>
      <Footer className="border-t bg-muted py-4" />
    </div>
  );
};

export default LayoutWrapper;
