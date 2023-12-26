import { Avatar, SxProps, Theme } from "@mui/material";

export default function OviooAvatar({
    src,
    alt,
    sx,
}: {
    src?: string;
    alt?: string;
    sx?: SxProps<Theme>;
}) {
    return <Avatar alt={alt} src={src} sx={sx} />;
}
