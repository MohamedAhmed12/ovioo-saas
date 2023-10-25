"use client";

import { FAQ as FAQInterface } from "@/interfaces";
import "@/styles/components/faq.scss";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useState } from "react";
import { FaPlus } from "react-icons/fa6";

export default function FAQ({ faq }: { faq: FAQInterface[] }) {
    const [expanded, setExpanded] = useState<number | false>(false);

    const handleChange = (panel: number) => (event: SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="faq flex pr-8 pl-8 lg:p-0 justify-center">
            <div className="container max-w-4xl">
                <div>
                    <h2 className="faq-title text-center">FAQ</h2>
                </div>
                <div className="accordion-wrapper w-full mt-20">
                    {faq.map(({ question, answer }: FAQInterface, index: number) => (
                        <Accordion
                            key={question}
                            expanded={expanded === index}
                            onChange={handleChange(index)}
                            className="cursor-pointer justify-center flex-col p-0"
                        >
                            <AccordionSummary
                                expandIcon={<FaPlus className="text-white hover:text-[#fee4a5]" size="24"/>}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography>{question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </div>
            </div>
        </div>
    );
}
