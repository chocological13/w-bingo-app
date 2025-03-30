"use client";
import Dashboard from "@/app/dashboard/_components/Dashboard";
import { AuthLevel, withAuth } from "@/components/auth/route-guard";
import LayoutWrapper from "@/components/layout/Layout";

const DashboardPage = () => {
  return (
    <LayoutWrapper>
      <Dashboard />
    </LayoutWrapper>
  );
};

export default withAuth(DashboardPage, AuthLevel.AUTHENTICATED);
