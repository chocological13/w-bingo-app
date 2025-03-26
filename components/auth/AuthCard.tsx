"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useSignIn } from "@/hooks/useSignIn";
import AuthForm from "@/components/auth/AuthForm";
import { useMediaQuery } from "react-responsive";

const AuthCard = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const { handleGoogleLogin } = useSignIn();
  const isMobile = useMediaQuery({ maxWidth: 640 });

  const handleTabChange = (value: string) => {
    setAuthMode(value as "signin" | "signup");
  };

  const Content = (
    <>
      <div className="absolute top-0 left-0 w-full h-1.5 bg-radial from-secondary-200 to-primary-300 dark:from-primary-700 dark:to-background animate-pulse"></div>
      <CardHeader className="relative pb-2">
        <CardTitle className="font-heading text-center text-2xl">
          Welcome to W-Bingo!!
        </CardTitle>
        <CardDescription className="font-alt-heading text-center dark:text-secondary-300">
          Make your own board 🎲
        </CardDescription>
        <div className="hidden md:block absolute top-0 right-4 z-20">
          <ThemeToggle />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <Tabs
          defaultValue="signin"
          className="w-full"
          value={authMode}
          onValueChange={handleTabChange}
        >
          <TabsList className="rounded-full w-full grid grid-cols-2 px-2 mb-4">
            <TabsTrigger
              value="signin"
              className="rounded-full data-[state=active]:shadow-md data-[state=active]:bg-primary-300/60 dark:data-[state=active]:bg-primary-900 transition-all"
            >
              Let me in!! 😤
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-full data-[state=active]:shadow-md data-[state=active]:bg-primary-300/60 dark:data-[state=active]:bg-primary-900 transition-all"
            >
              Sign me up 🙇🏻‍♀️
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <AuthForm authMode="signin" />
          </TabsContent>
          <TabsContent value="signup">
            <AuthForm authMode="signup" />
          </TabsContent>
        </Tabs>
        <div className="grid grid-cols-[5fr_1fr_5fr] items-center font-bold text-center">
          <Separator style={{ height: 2 }} />
          <p>OR</p>
          <Separator style={{ height: 2 }} />
        </div>
        <Button variant="outline" onClick={handleGoogleLogin}>
          <FcGoogle className="mr-1" /> Sign In With Google
        </Button>
      </CardContent>
      <CardFooter className="flex justify-center mt-4 md:mt-0">
        <Footer />
      </CardFooter>
    </>
  );

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", delay: 0.2 }}
      className="w-full max-w-md relative"
    >
      {isMobile ? (
        <div className="grid grid-rows-[1fr_6fr_1fr] justify-center relative h-screen">
          <div className="flex flex-row items-end justify-end mb-4">
            <ThemeToggle />
          </div>
          <div className="w-full min-h-full p-4 bg-background/50 backdrop-blur-md rounded-lg shadow-md overflow-hidden overflow-y-scroll">
            {Content}
          </div>
          <div></div>
        </div>
      ) : (
        <Card className="w-full min-w-md bg-background/80 backdrop-blur-sm shadow-lg overflow-hidden">
          {Content}
        </Card>
      )}
    </motion.div>
  );
};

export default AuthCard;
