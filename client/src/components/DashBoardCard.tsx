import Box from "@mui/joy/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { CSSProperties, FormEvent, ReactNode } from "react";

export default function DashBoardCard({
    children,
    handleSubmit,
    headerTitle,
    action,
    style,
}: {
    children: ReactNode;
    handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    headerTitle?: string;
    action?: ReactNode;
    style?: CSSProperties;
}) {
    return (
        <Card component="main" className="ovioo-card with-shadow mt-10 mb-10 w-full">
            {headerTitle && (
                <CardHeader
                    className="bg-slate-300 dark:bg-slate-500 w-full capitalize font-semibold text-start items-center"
                    title={headerTitle}
                    action={action}
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
