"use client";
import React, { ComponentType, useEffect } from "react";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import LoaderSpinner from "@/components/LoaderSpinner";

// Authentication levels
export enum AuthLevel {
  PUBLIC,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  authLevel: AuthLevel = AuthLevel.AUTHENTICATED
) {
  const WithAuthWrapper: React.FC<P> = (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (loading) return;

      switch (authLevel) {
        case AuthLevel.AUTHENTICATED:
          if (!user) {
            router.push("/auth");
          }
          break;

        case AuthLevel.UNAUTHENTICATED:
          if (user) {
            router.push("/dashboard");
          }
          break;
      }
    }, [loading, router, user]);

    if (loading) {
      return <LoaderSpinner />;
    }

    const shouldRender =
      authLevel === AuthLevel.PUBLIC ||
      (authLevel === AuthLevel.AUTHENTICATED && !!user) ||
      (authLevel === AuthLevel.UNAUTHENTICATED && !user);

    return shouldRender ? <WrappedComponent {...props} /> : null;
  };

  WithAuthWrapper.displayName = `WithAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthWrapper;
}
