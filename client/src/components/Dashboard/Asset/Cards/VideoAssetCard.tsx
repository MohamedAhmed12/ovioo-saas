import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/components/dashboard/asset/asset-list.scss";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import Typography from "@mui/joy/Typography";

export default function VideoAssetCard({ asset }: { asset: AssetInterface }) {
    return (
        <>
            <CardCover className="bg-slate-200">
                <span className="MuiImageBackdrop-root" />
                <video autoPlay loop muted>
                    <source src={asset.src} type={asset.type} />
                </video>
            </CardCover>

            <CardContent sx={{ justifyContent: "flex-end", padding: "8px 16px" }}>
                <Typography level="body-lg" fontWeight="lg" textColor="#fff">
                    {asset.alt}
                </Typography>
            </CardContent>
        </>
    );
}
