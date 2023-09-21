"use client";

import "@/styles/components/dashboard/sortby.scss";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

export default function OviooDropDown({
    onSelected,
    options,
    initialVal,
}: {
    onSelected: (selectedVal: string) => void;
    options: string[];
    initialVal: string | number;
}) {
    const [val, setVal] = useState(String(initialVal));

    const handleChange = (event: SelectChangeEvent) => {
        setVal(event.target.value as string);
        onSelected(event.target.value as string);
    };

    return (
        <FormControl sx={{ minWidth: 120, maxWidth: 150 }} className="sortby-component self-end">
            <Select
                value={val}
                onChange={handleChange}
                SelectDisplayProps={{
                    className: "dark:bg-slate-400",
                }}
            >
                {options.map((option, i) => (
                    <MenuItem value={option} key={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
