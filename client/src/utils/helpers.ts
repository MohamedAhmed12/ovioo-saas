import { Session } from "next-auth";
import { ChangeEvent } from "react";
import toast from "react-hot-toast";

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const ObjectHasVal = (object: Object, val: any) =>
    Object.values(object).includes(val);

export const uploadFiles = async (
    e: ChangeEvent<HTMLInputElement>,
    session: Session | null,
    path: string
): Promise<any> => {
    try {
        const files = e?.target?.files;

        if (!files || files?.length === 0) return;

        const form = new FormData();
        form.append("path", path);
        for (let i = 0; i < files.length; i++) {
            form.append("files[]", files[i]);
        }

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/upload`,
            {
                method: "POST",
                body: form,
                headers: {
                    authorization: `Bearer ${session?.access_token}`,
                },
            }
        );

        if (response.ok) {
            return await response.json();
        } else {
            toast.error("Something went wrong!");
        }
    } catch (e: any) {
        toast.error("Something went wrong!");
    }
};
