import { Box, Card } from "@mui/material";
import { FormEvent, ReactElement } from "react";

export default function DashBoardCard({
    children,
    handleSubmit,
}: {
    children: ReactElement;
    handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}) {
    return (
        <Card className="auth-card w-2/6" sx={{ minWidth: 275 }}>
        <Box
            className="box bg-secondary flex flex-col p-5 lg:p-10"
            component="form"
            onSubmit={handleSubmit}
            noValidate
        >
            {children}
        </Box>
    </Card>
);
}
