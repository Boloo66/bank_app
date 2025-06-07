import React from "react";
import AuthForm from "../../../components/AuthForm";
import { getLoggedInUser } from "../../../lib/actions/users.action";

const SignUp = async () => {
  // const loggedInUser = await getLoggedInUser();
  // console.log("Logged In User:", loggedInUser);

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUp;
