"use client";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/LoaderSpinner";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (user) {
    router.push("/dashboard");
  } else {
    router.push("/auth");
  }

  if (loading) {
    return <LoaderSpinner />;
  }
}
