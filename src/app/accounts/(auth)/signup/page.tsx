"use client";

import { useState, FormEvent } from "react";
import NextLink from "next/link";
import { Button } from "@nextui-org/react";
import { Divider } from "@/components";
import { internalUrls } from "@/config/site-config";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/auth/provider";
import { GoogleLoginButton } from "@/components/buttons";
import { handleAuthErrors } from "@/auth/firebase";

export default function SignUpPage() {
  const router = useRouter();
  const { user, signUpWithEmail } = useAuth();
  const searchParams = useSearchParams()

  const redirectUrl = searchParams.get("redirect");

  if (user) redirectUrl? router.push(redirectUrl) : router.back();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const [errors, setErrors] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!(password === password2)) {
      setErrors("Passwords not the same!");
      return;
    }
    try {
      const user = await signUpWithEmail({ email, password });
      if (user) redirectUrl? router.push(redirectUrl) : router.back();
    } catch (error) {
      handleAuthErrors(error, setErrors);
    }
  };

  return (
    <div className="card rounded-md border-primary bg-transparent px-3 py-6 sm:px-6 sm:py-8">
      <div className="text-center">
        <h6 className="font-bold text-primary">SIGN UP</h6>
        <span className="my-2 inline-block text-sm font-semibold">
          Sign up for a better experience with serenity bot
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

        <div className="my-3">
          <label className="mb-2 block text-xs font-bold">
            Confirm password
          </label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Confirm password"
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
          Sign up
        </Button>
      </form>

      <div className="m-auto text-center first-line:font-normal">
        <span className="block">
          Have an account already?{" "}
          <NextLink
            href={internalUrls.login}
            className="text-blue-500 underline-offset-2 hover:underline"
          >
            login
          </NextLink>
        </span>
      </div>
    </div>
  );
}
