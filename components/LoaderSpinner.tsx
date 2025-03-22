import React from "react";
import { Loader2 } from "lucide-react";

const LoaderSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="w-10 h-10 animate-spin text-primary-600 dark:text-primary-300" />
    </div>
  );
};

export default LoaderSpinner;
