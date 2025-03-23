"use client";
import LayoutWrapper from "@/components/layout/Layout";
import { useAuth } from "@/context/auth-provider";
import Auth from "@/components/auth/Auth";

export default function Home() {
  const { user } = useAuth();
  return (
    <>{user ? <LayoutWrapper>{user.displayName}</LayoutWrapper> : <Auth />}</>
  );
}
