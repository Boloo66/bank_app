"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "../lib/utils";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "../lib/actions/users.action";

const AuthForm = ({ type }: { type: string }) => {
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const defaultValues =
    type === "sign-up"
      ? {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          address1: "",
          city: "",
          state: "",
          postalCode: "",
          dateOfBirth: "",
          ssn: "",
        }
      : {
          email: "",
          password: "",
        };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      //signup with appwrite and create plaid token
      if (type === "sign-up") {
        const newUser = await signUp(data);
        console.log("New User:", newUser);
        setUser(newUser!);
      } else {
        const response = await signIn({
          email: data.email,
          password: data.password,
        });
        console.log("Sign In Response:", response);

        if (response) {
          setUser(response.data);
          router.push("/");
        }
        // router.push("/");
      }
    } catch (error) {
      console.log(error);
      console.error("Error during authentication:", error);
    } finally {
    }

    setLoading(false);
  };

  return (
    <div className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center ">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="banking-logo"
            className="size-[24px] "
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign-in" : "Sign-up"}
          </h1>

          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : type === "sign-in"
              ? "Sign in to your account"
              : "Create a new account to get started"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">LINK YOUR ACCOUNT</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <CustomInput
                control={form.control}
                name={"email"}
                label="Email"
                placeholder="Enter your email"
              />
              <CustomInput
                control={form.control}
                name={"password"}
                label="Password"
                placeholder="Enter your password"
              />
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4 max-sm:flex-col">
                    <CustomInput
                      control={form.control}
                      name={"firstName"}
                      label="First Name"
                      placeholder="Enter your first name"
                    />
                    <CustomInput
                      control={form.control}
                      name={"lastName"}
                      label="Last Name"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <CustomInput
                    control={form.control}
                    name={"address1"}
                    label="Address"
                    placeholder="Enter your address"
                  />
                  <CustomInput
                    control={form.control}
                    name={"city"}
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4 max-sm:flex-col">
                    <CustomInput
                      control={form.control}
                      name={"state"}
                      label="State"
                      placeholder="Enter your state"
                    />
                    <CustomInput
                      control={form.control}
                      name={"postalCode"}
                      label="Postal Code"
                      placeholder="Enter your postal code"
                    />
                  </div>
                  <div className="flex gap-4 max-sm:flex-col">
                    <CustomInput
                      control={form.control}
                      name={"dateOfBirth"}
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      control={form.control}
                      name={"ssn"}
                      label="SSN"
                      placeholder="e.g 123-45-6789"
                    />
                  </div>
                </>
              )}

              <div className="flex flex-col gap-2">
                <Button type="submit" className="form-btn" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      &nbsp;Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-14 font-semibold text-blue-600 hover:underline"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </>
      )}
    </div>
  );
};

export default AuthForm;
