"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { ModeEnum } from "@/interfaces/store/main";
import { toggleMode } from "@/store/features/main";
import "@/styles/app/unauth/home.scss";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { IconButton } from "@mui/joy";

export default function Task() {
    const mode = useAppSelector((state) => state.mainReducer.mode);
    const dispatch = useAppDispatch();

    return (
        <div>
            <IconButton sx={{ ml: 1 }} onClick={() => dispatch(toggleMode())}>
                {mode === ModeEnum.Dark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </div>
    );
}
