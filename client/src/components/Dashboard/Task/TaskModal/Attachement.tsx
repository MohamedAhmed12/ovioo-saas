import AssetList from "@/components/Dashboard/Asset/AssetList";
import { AssetList as AssetListInterface } from "@/interfaces";

export default function Attachement({ assetsList }: { assetsList: AssetListInterface[] }) {
    return (
        <>
            <p className="text-gray-500 tracking-widest text-sm mt-8 mb-3">Attachments</p>
            <AssetList assetsList={assetsList} />
        </>
    );
}
