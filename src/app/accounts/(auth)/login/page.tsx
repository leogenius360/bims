"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import { FcGoogle } from "react-icons/fc";
import { Divider } from "@/components";
import { internalUrls } from "@/config/site-config";
import { useAuth } from "@/auth/provider";
import { GoogleLoginButton } from "@/components/buttons";
import { handleAuthErrors } from "@/auth/firebase";

export default function LoginPage() {
  const router = useRouter();
  const { user, loginWithEmail } = useAuth();

  if (user) router.back();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginWithEmail({ email, password });
      router.back();
      return;
    } catch (error) {
      handleAuthErrors(error, setErrors);
      return;
    }
  };

  return (
    <div className="card rounded-md border-primary bg-transparent px-3 py-6 sm:px-6 sm:py-8">
      <div className="text-center">
        <h6 className="font-bold">LOGIN</h6>
        <span className="my-2 inline-block text-sm font-semibold">
          Login for a better experience with serenity bot
        </span>
      </div>

      <div className="my-2 inline-flex w-full flex-nowrap justify-center gap-x-4">
        <GoogleLoginButton />
      </div>

      <Divider textContent="or" />

      <form onSubmit={handleSubmit} className="mt-3">
        {errors && (
          <p className="pb-3 text-center text-sm font-semibold text-danger">
            {errors}
          </p>
        )}
        <div className="">
          <label className="mb-2 block text-xs font-bold">email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address..."
            className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
          />
        </div>

        <div className="my-3">
          <label className="mb-2 block text-xs font-bold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="mb-3 w-full truncate rounded-md border border-emerald-200 px-3 py-2 leading-tight focus:border-primary focus:outline-none dark:border-emerald-700 dark:focus:border-emerald-400"
          />
        </div>

        <Button
          type="submit"
          size="sm"
          color="primary"
          variant="solid"
          // radius="full"
          className="my-3 w-full"
        >
          Login
        </Button>
      </form>

      <div className="m-auto text-center first-line:font-normal">
        <span className="m-1 block">
          <NextLink
            href={internalUrls.forgotPassword}
            className="text-blue-500 underline-offset-2 hover:underline"
          >
            Forgot your password
          </NextLink>
        </span>
        <span className="block">
          Don&apos;s have an account?{" "}
          <NextLink
            href={internalUrls.signUp}
            className="text-blue-500 underline-offset-2 hover:underline"
          >
            sign up
          </NextLink>
        </span>
      </div>
    </div>
  );
}
