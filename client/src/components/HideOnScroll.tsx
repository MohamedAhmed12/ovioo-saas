import { Slide, useScrollTrigger } from "@mui/material";
import { ReactElement } from "react";

export default function HideOnScroll({ children }: { children: ReactElement }) {
 const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}
