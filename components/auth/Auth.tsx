import React from "react";
import AuthCard from "@/components/auth/AuthCard";

const Auth = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary-100 to-primary-200 dark:from-background dark:to-primary-950">
      <div>
        <AuthCard />
      </div>
    </div>
  );
};

export default Auth;
