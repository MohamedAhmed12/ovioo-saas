import OviooTable from "@/components/Dashboard/Layout/OviooTable";
import SubscriptionCard from "@/components/Dashboard/Payment/SubscriptionCard";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, TableCell } from "@mui/material";

const headers = ["plan", "unit cost", "quantity", "amount"];
const rows = [
    {
        plan: "standard tier",
        unitCost: 668,
        quantity: 1,
        totalCost: 668 * 1,
    },
    {
        plan: "pro tier",
        unitCost: 1485,
        quantity: 1,
        totalCost: 1485 * 1,
    },
    {
        plan: "1 to 1",
        unitCost: 3580,
        quantity: 1,
        totalCost: 3580 * 1,
    },
];

export default function Payment() {
    return (
        <div className="dashboard-payment">
            <SubscriptionCard />
            <OviooTable
                headers={headers}
                rows={rows}
                actions={
                    <TableCell>
                        <Button
                            variant="contained"
                            type="submit"
                            className="dashboard__link bg-transparent shadow-none hover:bg-transparent hover:shadow-none font-semibold"
                        >
                            <DownloadIcon />
                            Download
                        </Button>
                    </TableCell>
                }
            />
        </div>
    );
}
