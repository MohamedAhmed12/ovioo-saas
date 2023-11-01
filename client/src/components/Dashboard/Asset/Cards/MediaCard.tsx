"use client";

import { Asset as AssetInterface } from "@/interfaces";
import "@/styles/components/dashboard/asset/cards/media-card.scss";
import { isVideo as isVideoHelper} from "@/utils/helpers";
import { Backdrop } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import Image from "next/image";
import { useState } from "react";
import { BiZoomIn } from "react-icons/bi";
import { BsFillPlayCircleFill } from "react-icons/bs";

export default function MediaCard({ asset }: { asset: AssetInterface }) {
    const isVideo = isVideoHelper(asset);
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <>
            <ButtonBase
                className="assets__media-card !w-full h-[100px] lg:w-[200px] !text-gray-300 font-bold"
                focusRipple
                onClick={handleToggle}
            >
                {isVideo ? (
                    <video
                        loop
                        src={asset.src}
                        className="assets__media-card__cover object-cover"
                    ></video>
                ) : (
                    <span
                        style={{ backgroundImage: `url(${asset.src})` }}
                        className="assets__media-card__cover"
                    />
                )}

                <span className="assets__backdrop" />

                <div className="assets__media-card__content flex flex-col opacity-0">
                    <div className="h-full w-full flex justify-center items-center">
                        {isVideo ? (
                            <BsFillPlayCircleFill
                                fontSize="large"
                                className="mt-10"
                                style={{ fontSize: 36 }}
                            />
                        ) : (
                            <BiZoomIn
                                fontSize="large"
                                className="mt-10"
                                style={{ fontSize: 36 }}
                            />
                        )}
                    </div>
                    <span className="px-4 pb-4 w-full text-start truncate">
                        {asset.alt}
                    </span>
                </div>
            </ButtonBase>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleToggle}
                className="overflow-y-auto"
            >
                {isVideo ? (
                    <video autoPlay loop muted src={asset.src} />
                ) : (
                    <Image
                        src={asset.src}
                        width={500}
                        height={500}
                        alt={asset.alt}
                    />
                )}
            </Backdrop>
        </>
    );
}
