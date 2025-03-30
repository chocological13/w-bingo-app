"use client";
import Auth from "@/components/auth/Auth";
import { AuthLevel, withAuth } from "@/components/auth/route-guard";

const AuthPage = () => {
  return <Auth />;
};

export default withAuth(AuthPage, AuthLevel.UNAUTHENTICATED);
