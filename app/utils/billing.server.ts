export async function getShopPlan(admin: any): Promise<"FREE" | "PRO" | "ULTIMATE"> {
  try {
    const response = await admin.graphql(
      `#graphql
      query {
        currentAppInstallation {
          activeSubscriptions {
            name
            status
          }
        }
      }`
    );

    const data = await response.json();
    const activeSubscriptions = data?.data?.currentAppInstallation?.activeSubscriptions;

    if (activeSubscriptions && activeSubscriptions.length > 0) {
      const activeSub = activeSubscriptions.find((sub: any) => sub.status === 'ACTIVE');
      if (activeSub) {
        const name = activeSub.name.toLowerCase();
        if (name.includes("ultimate")) return "ULTIMATE";
        if (name.includes("pro")) return "PRO";
        
        // If they have an active subscription but it doesn't match Pro/Ultimate names exactly
        // we default to FREE, otherwise selecting the "Free Plan" will give them PRO features.
        return "FREE"; 
      }
    }
    
    return "FREE";
  } catch (error) {
    console.error("Error fetching shop plan:", error);
    return "FREE"; // Fallback to free if API fails
  }
}
