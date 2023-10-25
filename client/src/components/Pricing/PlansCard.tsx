"use client";

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
    bgColor,
    tag,
    title,
    monthlyFees,
    dailyFees,
    fullTime,
    includes,
}: {
    bgColor?: string;
    tag?: string;
    title: string;
    monthlyFees: number;
    dailyFees: number;
    fullTime: boolean;
    includes: string[];
}) {
    return (
        <Card
            size="lg"
            variant={bgColor ? "solid" : "outlined"}
            key={tag}
            invertedColors={bgColor ? true : false}
            sx={{ bgcolor: bgColor }}
            className="overflow-hidden px-6 !py-[36px]"
        >
            {tag && (
                <div className="w-52 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 transform rotate-[30deg] absolute top-[26px] right-[-38px] z-90 text-center font-semibold">
                    {tag}
                </div>
            )}

            <div className="title flex flex-row justify-start">
                <Chip
                    size="sm"
                    variant={bgColor ? "solid" : "outlined"}
                    color="neutral"
                    className="capitalize"
                >
                    {fullTime ? "full-time" : "part-time"}
                </Chip>
            </div>
            <div className="title flex flex-row justify-between mt-3">
                <JoyTypography level="h2" className="inline-flex capitalize">
                    {title}
                </JoyTypography>

                <JoyTypography
                    className="inline-flex"
                    fontSize="xl4"
                    lineHeight={1}
                    startDecorator={
                        <JoyTypography fontSize="md" textColor="text.secondary">
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
                    {dailyFees}
                </JoyTypography>
            </div>
            <Divider inset="none" />
            <List
                size="sm"
                sx={{ mx: "calc(-1 * var(--ListItem-paddingX))", fontSize: 19 }}
            >
                {includes.map((include: string, index: number) => (
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
                    {monthlyFees}
                    <JoyTypography
                        fontSize="sm"
                        textColor="text.tertiary"
                        style={{ marginLeft: 4 }}
                    >
                        / month
                    </JoyTypography>
                </JoyTypography>
                <Button
                    variant="soft"
                    endDecorator={<FaChevronRight />}
                    className={bgColor ? "text-white" : "text-neutral-700"}
                >
                    Start now
                </Button>
            </CardActions>
        </Card>
    );
}
