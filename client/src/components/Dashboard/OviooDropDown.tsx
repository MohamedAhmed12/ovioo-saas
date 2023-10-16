"use client";

import MenuItem from "@mui/material/MenuItem";
import OviooDropDownWrapper from "./OviooDropDownWrapper";

export default function OviooDropDown({
    onSelected,
    options,
    initialVal,
}: {
    onSelected: (selectedVal: string) => void;
    options: any[];
    initialVal: string | number;
}) {
    return (
        <OviooDropDownWrapper
            initialVal={initialVal}
            onSelected={onSelected}
            className="ovioo-dropDown"
        >
            {options.map((option, i) => (
                <MenuItem value={option.id || option.key} key={option + i}>
                    {option.title || option.name}
                </MenuItem>
            ))}
        </OviooDropDownWrapper>
    );
}
