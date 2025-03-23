import React from "react";
import { useForm } from "react-hook-form";
import { authFormSchema, AuthFormSchemaType } from "@/schema/authSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignIn } from "@/hooks/useSignIn";
import { Loader2, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface AuthFormProps {
  authMode: "signin" | "signup";
}

const AuthForm: React.FC<AuthFormProps> = ({ authMode }) => {
  const { loading, handleAuth, setPassword, setEmail } = useSignIn();

  const form = useForm<AuthFormSchemaType>({
    resolver: zodResolver(authFormSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const handleSubmit = async (values: AuthFormSchemaType) => {
    setEmail(values.email);
    setPassword(values.password);
    await handleAuth(authMode);
    form.reset();
  };

  const disabled =
    loading ||
    form.formState.isSubmitting ||
    !form.watch("email") ||
    !form.watch("password") ||
    !form.formState.isValid;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Mail size={16} />
                Email
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="rounded-lg h-12 pl-4 focus-visible:ring-strawberry-400 dark:focus-visible:ring-mint-800"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <Lock size={16} />
                Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  className="rounded-lg h-12 pl-4 focus-visible:ring-strawberry-400 dark:focus-visible:ring-mint-800"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <motion.div
          whileHover={!disabled ? { scale: 1.02 } : {}}
          whileTap={!disabled ? { scale: 0.98 } : {}}
        >
          <Button
            type="submit"
            disabled={disabled}
            className="w-full text-md font-bold h-12 rounded-lg shadow-md transition-all disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
          >
            {loading || form.formState.isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : authMode === "signin" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
};

export default AuthForm;
