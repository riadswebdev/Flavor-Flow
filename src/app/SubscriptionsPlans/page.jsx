import { getSubscriptionsPlans } from "@/lib/api/recipes";
import PricingSection from "./PricingSection";
import { getUserSession } from "@/lib/core/session";

export const metadata = {
  title: "Flavor Flow - Subscriptions",
  description:
    "View our subscription plans and choose the perfect one for your needs.",
};

const SubscriptionsPage = async () => {

  const user = await getUserSession()
  const subscriptionPlans = await getSubscriptionsPlans();
 

  return (
    <PricingSection
      plans={subscriptionPlans}
      currentPlan={user?.plan}
    />
  );
};

export default SubscriptionsPage;