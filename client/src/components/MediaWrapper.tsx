import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";
import { ReactNode } from "react";

export default function MediaWrapper({
    media,
    title,
    width,
    height,
}: {
    media: ReactNode;
    title?: string;
    width: string;
    height: string;
}) {
    return (
        <div className="container">
            <Card
                className="media-wrapper rounded-xl m-auto"
                style={{
                    minWidth: "300px",
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: "transparent",
                }}
            >
                <CardCover>{media}</CardCover>

                {title && (
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
                )}
            </Card>
        </div>
    );
}
