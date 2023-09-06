import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { ReactNode, memo } from "react";
import SimpleBar from "simplebar-react";
import "@/styles/components/dashboard/layout/scrollbar.scss";
import SimpleBarReact from "simplebar-react";

Scrollbar.propTypes = {
    sx: PropTypes.object,
    children: PropTypes.node,
};

function Scrollbar({ children, sx, ...other }: { children: ReactNode; sx?: any }) {
    return (
        <>
            <Box sx={{ overflowX: "auto", ...sx }} {...other} className="lg:hidden aaaaa">
                {children}
            </Box>

            <div className="scrollbar-root hidden lg:flex">
                <SimpleBarReact style={{ maxHeight: 300 }} className="scrollbar">
                    {children}
                </SimpleBarReact>
            </div>
        </>
    );
}

export default memo(Scrollbar);
