"use client";

import "@/styles/components/dashboard/ovioo-dropdown-wrapper.scss";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ReactNode, useState } from "react";

export default function OviooDropDownWrapper({
    onSelected,
    children,
    initialVal,
    inputLabel,
    className,
}: {
    onSelected: (selectedVal: string) => void;
    children: ReactNode;
    initialVal: string | number;
    inputLabel?: string;
    className?: string;
}) {
    const [val, setVal] = useState(String(initialVal));

    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
        onSelected(event.target.value as string);
    };

    return (
        <FormControl
            sx={{ minWidth: 120, maxWidth: 150 }}
            className={`ovioo-dropdown-wrapper ${className}`}
        >
            <Select
                value={val}
                onChange={handleChange}
                SelectDisplayProps={{
                    className: "dark:bg-slate-400",
                }}
                MenuProps={{
                    className: "ovioo-dropDown-paper",
                }}
            >
                {inputLabel && (
                    <MenuItem
                        value={initialVal}
                        className="flex items-center !py-2"
                        aria-label="fff"
                        disabled
                    >
                        {inputLabel}
                    </MenuItem>
                )}
                {children}
            </Select>
        </FormControl>
    );
}
