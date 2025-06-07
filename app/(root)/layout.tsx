import MobileNav from "../../components/MobileNav";
import SideBar from "../../components/SideBar";
import Image from "next/image";
import { getLoggedInUser } from "../../lib/actions/users.action";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  console.log("Logged In User:", loggedIn);

  if (!loggedIn) {
    redirect("/sign-in");
  }

  return (
    <main className="flex h-screen w-full font-family-inter">
      <SideBar user={loggedIn} />
      <div className="flex size-full flex-col">
        <div className="root-layout">
          <Image src="/icons/logo.svg" width={30} height={30} alt="menu icon" />
          <div>
            <MobileNav user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
