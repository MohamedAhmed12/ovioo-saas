import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const cardNumbers = 1234;

export default function SubscriptionCard() {
    return (
        <Card sx={{ minWidth: 275, maxWidth: 500, borderRadius: '10px'}} className="dark:shadow-md dark:shadow-slate-300" >
            <CardContent>
                <span className="flex justify-between">
                    <Typography variant="h5" component="div" style={{marginBottom: 32}}>
                        Current Plan <span className="capitalize text-slate-500">(pro)</span>
                    </Typography>
                    <Link
                        href="/dashboard/plan"
                        className="text-lg font-semibold hover:bg-transparent text-slate-500 capitalize p-0"
                    >
                        change plan
                    </Link>
                </span>
                <Typography color="text.secondary" style={{marginBottom: 4}}>
                    card number
                </Typography>
                <Typography variant="body2">**** **** **** {cardNumbers}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small" className="hover:bg-transparent" style={{color:'rgb(30 41 59 / var(--tw-text-opacity))', fontWeight: 700}}>
                    Replace credit card
                </Button>
            </CardActions>
        </Card>
    );
}
