"use client";

import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/components/dashboard/asset/cards/default-card.scss";
import { AiOutlineLink } from "react-icons/ai";
import { IoMdDownload } from "react-icons/io";
import { TbExternalLink } from "react-icons/tb";

export default function DefaultCard({ asset }: { asset: AssetInterface }) {
    return (
        <a
            href={asset.src}
            className="assets__default-card !text-slate-300 font-bold h-full w-full"
            target="_blank"
            rel="noopener noreferrer"
        >
            <div className="h-full w-full flex justify-center items-center truncate px-3">
                {asset.type == "link" ? (
                    <AiOutlineLink className="mt-8" style={{ fontSize: 38 }} />
                ) : (
                    <span className="default-card__text truncate">
                        {asset.alt}
                    </span>
                )}
            </div>

            <span className="assets__backdrop" />

            <div className="assets__default-card__content flex flex-col opacity-0">
                <div className="h-full w-full flex justify-center items-center">
                    {asset.type == "link" ? (
                        <TbExternalLink
                            className="mt-8"
                            style={{ fontSize: 36 }}
                        />
                    ) : (
                        <IoMdDownload
                            className="mt-8"
                            style={{ fontSize: 36 }}
                        />
                    )}
                </div>
                <span className="px-4 pb-4 w-full text-start truncate">
                    {asset.alt}
                </span>
            </div>
        </a>
    );
}
