"use client";
import LayoutWrapper from "@/components/layout/Layout";
import { useAuth } from "@/components/auth-provider";

export default function Home() {
  const { user } = useAuth();
  return <LayoutWrapper>{user ? user.displayName : "Home"}</LayoutWrapper>;
}
