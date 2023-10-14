"use client";

import MenuItem from "@mui/material/MenuItem";
import OviooDropDownWrapper from "./OviooDropDownWrapper";

export default function OviooDropDown({
    onSelected,
    options,
    initialVal,
}: {
    onSelected: (selectedVal: string) => void;
    options: string[];
    initialVal: string | number;
}) {
    return (
        <OviooDropDownWrapper
            initialVal={initialVal}
            onSelected={onSelected}
            className="!min-w-[280px] lg:!min-w-fit"
        >
            {options.map((option, i) => (
                <MenuItem value={option} key={option}>
                    {option}
                </MenuItem>
            ))}
        </OviooDropDownWrapper>
    );
}
