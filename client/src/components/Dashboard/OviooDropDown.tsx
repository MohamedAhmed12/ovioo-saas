"use client";

import MenuItem from "@mui/material/MenuItem";
import OviooDropDownWrapper from "./OviooDropDownWrapper";

export default function OviooDropDown({
    onSelected,
    options,
    inputLabel,
    initialVal,
    className,
}: {
    onSelected: (selectedVal: string) => void;
    options: any[];
    inputLabel?: string;
    initialVal?: string | number;
    className?: string;
}) {
    return (
        <OviooDropDownWrapper
            inputLabel={inputLabel}
            initialVal={initialVal}
            onSelected={onSelected}
            className={className}
        >
            {options.map((option, i) => (
                <MenuItem
                    value={option.id || option.key || option}
                    key={option + i}
                >
                    {option.title || option.name || option}
                </MenuItem>
            ))}
        </OviooDropDownWrapper>
    );
}
