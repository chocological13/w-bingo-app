import { useState } from "react";
import { useAuth } from "@/context/auth-provider";
import { toast } from "sonner";

export const useSignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { signUp, signIn, signInWithGoogle } = useAuth();

  const handleAuth = async (authMode: "signin" | "signup") => {
    setLoading(true);
    setError("");

    try {
      if (authMode === "signin") {
        await signIn(email, password);
        toast.success("Signed in successfully!");
      } else {
        await signUp(email, password);
        toast.success("Signed up succesfully!");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "An error occured during authentication :(");
        toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      await signInWithGoogle();
      toast.success("Signed in successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Failed to Login with Google!");
        toast.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    setEmail,
    setPassword,
    handleAuth,
    handleGoogleLogin,
  };
};
