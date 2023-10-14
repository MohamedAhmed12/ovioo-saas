"use client";

import { TaskTypes } from "@/constants/TaskTypes";
import "@/styles/components/dashboard/task-type-dropdown.scss";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { Tooltip } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import OviooDropDownWrapper from "./OviooDropDownWrapper";

export default function TaskTypeDropDown() {
    const onSelected = () => {};

    const infoComponent = (info: string[], extraInfo: string | null) => {
        return (
            <span>
                {info.map((elm: string) => (
                    <span key={elm} className="flex flex-wrap text-xl py-[2px]">
                        <Image
                            src={`/svg/star.svg`}
                            width={20}
                            height={20}
                            alt="star bullet-point icon"
                        />
                        {elm}
                    </span>
                ))}
                {extraInfo && (
                    <span className="flex mt-4 mb-3 text-[13px]">
                        <WarningIcon className="mr-2" fontSize="small" />
                        {extraInfo}
                    </span>
                )}
            </span>
        );
    };

    return (
        <OviooDropDownWrapper
            inputLabel="Type"
            initialVal={0}
            onSelected={onSelected}
            className="task-type__dropdown !my-4"
        >
                {TaskTypes.map(({ title, info, extraInfo, plan }, i) => (
                    <MenuItem
                        value={title}
                        key={title}
                        className="task-type__option flex items-center !py-2"
                        aria-label="fff"
                    >
                        <span className="basis-[90%] flex items-center">
                            <Tooltip title={plan} className="task-type__option-text mr-2">
                                <Image src={`/svg/${plan}.svg`} width={20} height={20} alt="pro icon" />
                            </Tooltip>
                            {title}
                        </span>

                        <span className="task-type__option-text basis-[10%] ml-2">
                            <Tooltip title={infoComponent(info, extraInfo)}>
                                <InfoIcon />
                            </Tooltip>
                        </span>
                    </MenuItem>
                ))}
        </OviooDropDownWrapper>
    );
}
