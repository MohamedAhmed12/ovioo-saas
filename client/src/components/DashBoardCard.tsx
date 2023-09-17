import Box from "@mui/joy/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { CSSProperties, FormEvent, ReactElement } from "react";

export default function DashBoardCard({
    children,
    handleSubmit,
    headerTitle,
    style,
}: {
    children: ReactElement;
    handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    headerTitle?: string;
    style?: CSSProperties;
}) {
    return (
        <Card component="main" className="ovioo-card with-shadow mt10 mb-10">
            {headerTitle && (
                <CardHeader
                    className="bg-slate-300 dark:bg-slate-500 w-full capitalize font-semibold text-start"
                    title={headerTitle}
                />
            )}
            <Box
                className="box bg-secondary flex flex-col p-5 lg:p-7"
                component="form"
                onSubmit={handleSubmit}
                noValidate
                style={style}
            >
                {children}
            </Box>
        </Card>
    );
}
