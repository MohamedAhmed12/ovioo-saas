"use client";

import "@/styles/components/faq.scss";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import { SyntheticEvent, useState } from "react";

export default function FAQ() {
    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="faq flex pr-8 pl-8 lg:p-0 justify-center">
            <div className="container max-w-4xl">
                <div>
                    <h2 className="faq-title text-center">FAQ</h2>
                </div>
                <div className="accordion-wrapper w-full mt-20">
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        className="cursor-pointer justify-center flex-col p-0"
                    >
                        <AccordionSummary
                            expandIcon={<AddIcon style={{ color: "white" }} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography>Every day business updates - what’s that?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Every business day, your designer will provide you with an update on
                                your task, or switch to a new one when it's completed.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                        className="cursor-pointer justify-center flex-col"
                    >
                        <AccordionSummary
                            expandIcon={<AddIcon style={{ color: "white" }} />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography>How many designs do I get in a month?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                This depends on the complexity and number of iterations for each
                                task. Every task is different, but we guarantee you will receive
                                daily design updates.{" "}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
