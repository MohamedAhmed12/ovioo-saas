import "@/styles/components/dashboard/layout/navbar.scss";
import { Drawer, SwipeableDrawer } from "@mui/material";
import { ReactNode } from "react";
import "simplebar-react/dist/simplebar.min.css";

export default function NavbarWrapper({
    content,
    openNav,
    onCloseNav,
}: {
    content: ReactNode;
    openNav: boolean;
    onCloseNav: () => void;
}) {
    return (
        <div className="navbar bg-transparent">
            <Drawer open variant="permanent" className="hidden lg:flex">
                {content}
            </Drawer>

            <SwipeableDrawer
                open={openNav}
                onClose={onCloseNav}
                onOpen={onCloseNav}
                className="flex lg:hidden swipeable-drawer"
            >
                {content}
            </SwipeableDrawer>
        </div>
    );
}
