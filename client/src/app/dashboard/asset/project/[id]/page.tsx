"use client";

import AssetListCard from "@/components/Dashboard/Asset/AssetListCard";
import ProjectDetailedCard from "@/components/Dashboard/Project/ProjectDetailedCard";
import { AssetList as AssetListInterface } from "@/interfaces";
import "@/styles/app/dashboard/asset.scss";

export default function AssetViewProject() {
    const assetsList: AssetListInterface[] = [
        {
            title: "logo",
            assets: [
                {
                    src: "https://picsum.photos/id/100/400/400",
                    alt: "img logo",
                    type: "png",
                },
                {
                    src: "https://picsum.photos/id/200/400/400",
                    alt: "img logo 2",
                    type: "png",
                },
                {
                    src: "/videos/sample-video.webm",
                    alt: "video",
                    type: "mp4",
                },
            ],
        },
        {
            title: "guideline",
            assets: [
                {
                    src: "https://picsum.photos/id/300/800/2500",
                    alt: "img guideline",
                    type: "png",
                },
                {
                    src: "https://www.behance.net/gallery/149948837/BRAND-GUIDELINES-BATODA-bakery",
                    alt: "link",
                    type: "link",
                },
                {
                    src: "/videos/sample.xlsx",
                    alt: "xlxx",
                    type: "xlxx",
                },
            ],
        },
        {
            title: "fonts",
            assets: [
                {
                    src: "https://picsum.photos/id/40/400/400",
                    alt: "img fonts",
                    type: "png",
                },
            ],
        },
        {
            title: "colors",
            assets: [
                {
                    src: "https://picsum.photos/id/25/400/400",
                    alt: "img colors",
                    type: "png",
                },
            ],
        },
        {
            title: "Illustrations",
            assets: [
                {
                    src: "https://picsum.photos/id/16/400/400",
                    alt: "img Illustrations",
                    type: "png",
                },
            ],
        },
        {
            title: "UI{title:/UX",
            assets: [
                {
                    src: "https://picsum.photos/id/40/400/400",
                    alt: "img UI/UX 1",
                    type: "png",
                },
                {
                    src: "https://picsum.photos/id/400/400",
                    alt: "img UI/UX 2",
                    type: "png",
                },
                {
                    src: "https://picsum.photos/id/400/400",
                    alt: "img UI/UX3",
                    type: "png",
                },
            ],
        },
        {
            title: "References (Design you{title: like)",
            assets: [
                {
                    src: "https://picsum.photos/id/400/400",
                    alt: "img References",
                    type: "png",
                },
            ],
        },
        {
            title: "presentation",
            assets: [
                {
                    src: "https://picsum.photos/id/400/400",
                    alt: "img presentation",
                    type: "png",
                },
            ],
        },
        {
            title: "video",
            assets: [
                {
                    src: "https://picsum.photos/id/400/400",
                    alt: "img video",
                    type: "png",
                },
            ],
        },
        {
            title: "others",
            assets: [
                {
                    src: "https://picsum.photos/id/400/400",
                    alt: "img others",
                    type: "png",
                },
            ],
        },
    ];

    return (
        <div className="asset-container flex justify-start flex-wrap flex-col gap-14">
            <ProjectDetailedCard />
            <AssetListCard assetsList={assetsList} sortBy="projects" />
        </div>
    );
}
