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
        <OviooDropDownWrapper initialVal={initialVal} onSelected={onSelected}>
            {options.map((option, i) => (
                <MenuItem value={option} key={option}>
                    {option}
                </MenuItem>
            ))}
        </OviooDropDownWrapper>
    );
}
