import { getTotalTransactions } from "@/lib/api/recipes";
import TransactionsClient from "./TransactionsClient";

export const metadata = {
  title: "Transactions | FlavorFlow Admin",
  description: "View and monitor all premium membership payment transactions.",
};

export default async function TransactionsPage() {
  const transactionsData = await getTotalTransactions();

  return <TransactionsClient initialData={transactionsData} />;
}
