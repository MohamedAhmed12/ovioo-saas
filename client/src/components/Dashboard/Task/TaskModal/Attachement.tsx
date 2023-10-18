import AssetList from "@/components/Dashboard/Asset/AssetList";
import { Asset } from "@/interfaces";

export default function Attachement({ assets }: { assets: Asset[] }) {
    return (
        <>
            <p className="text-gray-500 tracking-widest text-sm mt-8 mb-3">
                Attachments
            </p>
            <AssetList assets={assets} />
        </>
    );
}
