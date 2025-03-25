"use client";
import LayoutWrapper from "@/components/layout/Layout";
import { useAuth } from "@/context/auth-provider";
import Auth from "@/components/auth/Auth";
import Bingo from "@/components/bingo/Bingo";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      {user ? (
        <LayoutWrapper>
          <Bingo />
        </LayoutWrapper>
      ) : (
        <Auth />
      )}
    </>
  );
}
