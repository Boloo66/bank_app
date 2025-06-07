import React from "react";
import { signOut } from "../lib/actions/users.action";
import Image from "next/image";

const Footer = ({
  user,
  type = "desktop",
}: {
  user: User;
  type?: "desktop" | "mobile";
}) => {
  return (
    <footer className="footer">
      <div className={type === "mobile" ? "footer_name-mobile" : "footer_name"}>
        <p className="text-xl font-bold text-gray-700">{user?.name[0]}</p>
      </div>

      <div
        className={type === "mobile" ? "footer_email-mobile" : "footer_email"}
      >
        <h1 className="text-2xl truncate font-semibold text-gray-800">
          {user?.name}
          <p className="text-14 truncate font-normal text-gray-600">
            {user?.email}
          </p>
        </h1>
      </div>
      <div className="footer_image" onClick={() => signOut()}>
        <Image src="icons/logout.svg" alt="log-out" width={30} height={30} />
      </div>
    </footer>
  );
};

export default Footer;
