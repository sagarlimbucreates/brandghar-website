import { redirect } from "next/navigation";
import { getSession } from "../lib/session";
import LoginForm from "./LoginForm";

type SearchParams = Promise<{ next?: string }>;

export default async function DashboardLoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { next } = await searchParams;
  const session = await getSession();
  if (session.userId) {
    redirect(next && next.startsWith("/dashboard") ? next : "/dashboard");
  }

  return <LoginForm next={next ?? ""} />;
}
