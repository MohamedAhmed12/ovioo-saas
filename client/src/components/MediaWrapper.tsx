import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import { ReactNode } from "react";

export default function MediaWrapper({ media, title }: { media: ReactNode; title?: string }) {
    return (
        <Card className="w-full h-full rounded-xl" style={{ minWidth: "300" }}>
            <CardCover>{media}</CardCover>
            <CardContent>
                <Typography
                    level="body-lg"
                    fontWeight="lg"
                    textColor="#fff"
                    mt={{ xs: 12, sm: 18 }}
                >
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}
