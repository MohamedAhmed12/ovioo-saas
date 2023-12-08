import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import JoyTypography from "@mui/joy/Typography";
import { FaCheck, FaChevronRight } from "react-icons/fa6";

export default function PlansCard({
    title,
    description,
    services,
    background_color,
    daily_fees,
    monthly_fees,
    is_full_time,
    is_most_popular,
}: {
    title: string;
    description: string;
    services: string[];
    background_color?: string;
    daily_fees: number;
    monthly_fees: number;
    is_full_time: number;
    is_most_popular: number;
}) {
    return (
        <Card
            size="lg"
            variant={background_color ? "solid" : "outlined"}
            invertedColors={background_color ? true : false}
            sx={{ bgcolor: background_color }}
            className="overflow-hidden px-6 !py-[36px]"
        >
            {is_most_popular && (
                <div className="w-52 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 transform rotate-[30deg] absolute top-[26px] right-[-38px] z-90 text-center font-semibold">
                    {is_most_popular}
                </div>
            )}

            <div className="title flex flex-row justify-start">
                <Chip
                    size="sm"
                    variant={background_color ? "solid" : "outlined"}
                    color="neutral"
                    className="capitalize"
                >
                    {is_full_time ? "full-time" : "part-time"}
                </Chip>
            </div>
            <div className="title flex flex-row justify-between mt-3">
                <JoyTypography level="h2" className="inline-flex capitalize">
                    {title}
                </JoyTypography>
                {daily_fees && (
                    <JoyTypography
                        className="inline-flex"
                        fontSize="xl4"
                        lineHeight={1}
                        startDecorator={
                            <JoyTypography
                                fontSize="md"
                                textColor="text.secondary"
                            >
                                $
                            </JoyTypography>
                        }
                        endDecorator={
                            <JoyTypography
                                fontSize="md"
                                textColor="text.secondary"
                                sx={{ marginTop: 2 }}
                            >
                                / day
                            </JoyTypography>
                        }
                        sx={{ alignItems: "flex-start" }}
                    >
                        {daily_fees}
                    </JoyTypography>
                )}
            </div>
            <div className="title flex flex-row justify-between mt-3">
                <p className="text-[14px]">{description}</p>
            </div>
            <Divider inset="none" />
            <List
                size="sm"
                sx={{ mx: "calc(-1 * var(--ListItem-paddingX))", fontSize: 19 }}
            >
                {services.map((include: string, index: number) => (
                    <ListItem key={index}>
                        <ListItemDecorator>
                            <FaCheck />
                        </ListItemDecorator>
                        {include}
                    </ListItem>
                ))}
            </List>
            <Divider inset="none" />
            <CardActions style={{ padding: 0 }}>
                <JoyTypography level="title-lg" sx={{ mr: "auto" }}>
                    {monthly_fees && (
                        <>
                            {monthly_fees}
                            <JoyTypography
                                fontSize="sm"
                                textColor="text.tertiary"
                                style={{ marginLeft: 4 }}
                            >
                                / month
                            </JoyTypography>
                        </>
                    )}
                </JoyTypography>
                <Button
                    variant="soft"
                    endDecorator={<FaChevronRight />}
                    className={
                        background_color ? "text-white" : "text-neutral-700"
                    }
                >
                    Start now
                </Button>
            </CardActions>
        </Card>
    );
}
