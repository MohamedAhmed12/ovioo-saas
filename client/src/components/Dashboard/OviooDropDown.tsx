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
            className="!min-w-[280px] lg:!min-w-fit"
        >
            {options.map((option, i) => (
                <MenuItem value={option.id || option.key} key={option}>
                    {option.title || option.name}
                </MenuItem>
            ))}
        </OviooDropDownWrapper>
    );
}
