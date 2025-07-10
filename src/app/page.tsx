import SignOutButton from "@/components/button/sign-out";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (!session) redirect("/sign-in");

  return (
    <div>
      VOCE ESTA LOGADO
      <br />
      <SignOutButton />
    </div>
  );
}
