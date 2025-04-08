"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/auth";
import React from "react";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { GitHubIcon, GoogleIcon, Logo } from "@/lib/logos";
import { toast } from "sonner";

const SignIn = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    const res = await signIn("credentials", {
      ...values,
      redirectTo: "/dashborad",
    });

    if (res?.error) {
      toast.error("Invalid credentials.");
    }
  };

  return (
    <section className="h-screen w-full flex items-center justify-center p-5">
      <div className="border p-3 sm:p-5 md:p-6 rounded-xl w-full sm:w-fit">
        <div className="flex gap-2 items-center">
          <Logo />
          <h1 className="font-bold">Glint</h1>
        </div>
        <div>
          <h1 className="font-semibold">Sign in to your account</h1>
          <p className="text-xs text-muted-foreground">
            Don&apos;t have and account?
            <Link
              href={"/signup"}
              className="font-semibold mx-1 cursor-pointer hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row mt-5">
          <Button
            variant={"outline"}
            className="rounded-full"
            onClick={() => signIn("github", { redirectTo: "/dashborad" })}
          >
            <GitHubIcon />
            Sign in with GitHub
          </Button>
          <Button
            variant={"outline"}
            className="rounded-full"
            onClick={() => signIn("google", { redirectTo: "/dashborad" })}
          >
            <GoogleIcon />
            Sign in with Google
          </Button>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      {...field}
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="********"
                      {...field}
                      className="rounded-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full rounded-full bg-gradient-to-t from-zinc-950 via-zinc-700 to-zinc-800"
              type="submit"
            >
              Sign in
            </Button>
          </form>
        </Form>

        <p className="text-xs text-muted-foreground mt-3">
          Forgot your password?{" "}
          <Link
            href={"/"}
            className="font-semibold mx-1 cursor-pointer hover:underline transition-all"
          >
            Reset password
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignIn;
