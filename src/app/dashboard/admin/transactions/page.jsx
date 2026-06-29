import { getTotalTransactions } from "@/lib/api/transaction";
import TransactionsClient from "./TransactionsClient";
import { redirect } from "next/navigation";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Transactions | FlavorFlow Admin",
  description: "View and monitor all premium membership payment transactions.",
};

export default async function TransactionsPage() {
  const user = await getUserSession();

  if (!user || user?.role !== "admin") {
    redirect("/unauthorized");
  }
  const transactionsData = await getTotalTransactions();

  return <TransactionsClient initialData={transactionsData} />;
}
