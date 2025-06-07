"use server";

import { cookies } from "next/headers";
import {
  createAdminClient,
  createPublicClient,
  createSessionClient,
} from "../server/appwrite";
import { ID } from "appwrite";
import { parseStringify } from "../../app/assets/lib/utils";
import { redirect } from "next/navigation";

export const signIn = async (userData: signInProps) => {
  const { email, password } = userData;

  try {
    const { account } = await createPublicClient();

    const session = await account.createEmailPasswordSession(email, password);

    console.log("Session object:", session);

    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    console.log("logged in user:", session);
    return parseStringify(session);
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
};

// Sign up function (improved)
export const signUp = async (userData: SignUpParams) => {
  const {
    email,
    password,
    firstName,
    lastName,
    address1,
    state,
    postalCode,
    dateOfBirth,
    ssn,
    city,
  } = userData;

  try {
    // Create user account using admin client
    const { account: adminAccount } = await createAdminClient();
    const newUserAccount = await adminAccount.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`
    );

    // Create session using public client
    const session = await adminAccount.createEmailPasswordSession(
      email,
      password
    );

    console.log("session object:", session);

    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    // You might want to create a user document in your database here
    // with additional user data like address, ssn, etc.

    return parseStringify(newUserAccount);
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
};

// Get logged in user (improved error handling)
export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    console.log("Logged in user:", user);
    return parseStringify(user);
  } catch (error) {
    // Don't log "No session" errors as they're expected for unauthenticated users
    if (!(error as Error).message?.includes("No active session")) {
      console.error("Error fetching logged-in user:", error);
    }
    return null;
  }
}

// Sign out function
export async function signOut() {
  try {
    const { account } = await createSessionClient();

    await account.deleteSession("current");

    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");

    redirect("/sign-in");
    return true;
  } catch (error) {
    console.error("Sign out error:", error);
    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");
    redirect("/sign-in");
  }
}
