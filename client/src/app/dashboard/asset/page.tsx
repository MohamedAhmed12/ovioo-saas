import AssetListCard from "@/components/Dashboard/Asset/AssetListCard";
import ProjectDetailedCard from "@/components/Dashboard/Project/ProjectDetailedCard";
import "@/styles/app/dashboard/asset.scss";

export default function Asset() {
    return (
        <div className="asset-container flex justify-start flex-wrap">
            <ProjectDetailedCard />
            <AssetListCard />
        </div>
    );
}
