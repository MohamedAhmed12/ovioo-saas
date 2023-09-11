import { useTheme } from "@emotion/react";
import { ImageList, ImageListItem, useMediaQuery } from "@mui/material";
import Image from "next/image";

export default function Attachement({ images }: { images: string[] }) {
    return (
        <>
            <p className="text-gray-500 tracking-widest text-sm">Attachments</p>

            <div className="grid grid-cols-1 lg:grid-cols-3">
                {images.map((image, i) => (
                    <ImageListItem key={i + "img"} className="h-full p-2">
                        <Image
                            src="/images/smile.jpg"
                            alt="smile"
                            width="1000"
                            height="1000"
                            objectFit="crop"
                            className="w-full h-full rounded-lg"
                        />
                    </ImageListItem>
                ))}
            </div>
        </>
    );
}
