import SubscriptionCard from "@/components/Dashboard/Payment/SubscriptionCard";
import OviooTable from "@/components/Dashboard/Layout/OviooTable";

const headers = ["plan", "unit cost", "quantity", "amount"];
const rows = [
    {
        plan: "basic tier",
        unitCost: 668,
        quantity: 1,
    },
    {
        plan: "pro tier",
        unitCost: 1485,
        quantity: 1,
    },
    {
        plan: "1 to 1",
        unitCost: 3580,
        quantity: 1,
    },
];

export default function Payment() {
    return (
        <div className="dashboard-payment">
            <SubscriptionCard />
            <OviooTable headers={headers} rows={rows} />
        </div>
    );
}
