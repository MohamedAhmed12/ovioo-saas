"use client";

import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/components/dashboard/asset/cards/default-card.scss";
import LinkIcon from "@mui/icons-material/Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";

export default function DefaultCard({ asset }: { asset: AssetInterface }) {
    return (
        <a
            href={asset.src}
            className="assets__default-card !text-slate-300 font-bold h-full w-full"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="h-full w-full flex justify-center items-center">
                {asset.type == "link" ? (
                    <LinkIcon className="!text-8xl m-auto rotate-[135deg]" />
                ) : (
                    <span className="text-6xl">{asset.alt}</span>
                )}
            </div>

            <span className="assets__backdrop" />

            <div className="assets__default-card__content flex flex-col opacity-0">
                <div className="h-full w-full flex justify-center items-center">
                    {asset.type == "link" ? (
                        <OpenInNewIcon fontSize="large" className="mt-10" />
                    ) : (
                        <DownloadIcon fontSize="large" className="mt-10" />
                    )}
                </div>
                <span className="px-4 py-2 w-full text-start">{asset.alt}</span>
            </div>
        </a>
    );
}
