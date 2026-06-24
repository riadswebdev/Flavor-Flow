import { getSubscriptionsPlans } from "@/lib/api/recipes";
import PricingSection from "./PricingSection";
import { getUserSession } from "@/lib/core/session";

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
