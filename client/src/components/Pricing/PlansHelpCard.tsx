"use client";

import AnimatedBtn from "@/components/AnimatedBtn";
import "@/styles/components/pricing/plans-help-card.scss";
import { Chip, List } from "@mui/joy";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import ListItem from "@mui/joy/ListItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Image from "next/image";

export default function PlansHelpCard() {
    return (
        <Card
            variant="solid"
            invertedColors
            className="plans__help-card mt-20 rounded-lg shadow-xl"
        >
            <CardContent orientation="horizontal" className="basis-1/2 pricing__add-ons">
                <Chip size="md" variant="solid" color="neutral" className="mr-3">
                    Add-on
                </Chip>
                <List aria-labelledby="decorated-list-demo">
                    <ListItem className="flex flex-row text-2xl p-0 pt-4">
                        <span className="basis-4/5">
                            <ListItemDecorator>
                                <Image
                                    src="/icons/web-flow.png"
                                    alt="webflow icon"
                                    width={25}
                                    height={25}
                                />
                            </ListItemDecorator>
                            Full web design using Webflow
                        </span>
                        <span className="basis-1/5 font-semibold text-secondary">$500</span>
                    </ListItem>
                    <ListItem className="flex flex-row text-2xl p-0 pt-4">
                        <span className="basis-4/5">
                            <ListItemDecorator>📹</ListItemDecorator> Video editing
                        </span>
                        <span className="basis-1/5 font-semibold text-secondary">$1000</span>
                    </ListItem>
                </List>
            </CardContent>
            <CardContent orientation="horizontal" className="pricing__not-sure basis-1/2 flex-col">
                <div>
                    <h2>Not sure what to choose?</h2>
                    <p>We will help you build a plan acording to you needs</p>
                </div>
                <div className="mt-12 flex justify-end">
                    <AnimatedBtn title="Book a Demo" />
                </div>
            </CardContent>
        </Card>
    );
}
