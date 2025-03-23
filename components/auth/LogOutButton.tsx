import React from "react";
import { LogOutIcon } from "lucide-react";
import { useAuth } from "@/context/auth-provider";
import { Button } from "@/components/ui/button";

const LogOutButton = ({ className }: { className?: string }) => {
  const { logOut } = useAuth();

  return (
    <div className={className}>
      <Button
        variant="outline"
        className="text-strawberry-600 rounded-full hover:bg-strawberry-100 dark:hover:bg-strawberry-900 border-strawberry-300 dark:border-strawberry-700"
        onClick={logOut}
      >
        <LogOutIcon />
        <p className="hidden md:block">Sign Out</p>
      </Button>
    </div>
  );
};

export default LogOutButton;
