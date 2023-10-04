"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useAppSelector } from "@/hooks/redux";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import Switch from "@mui/joy/Switch";
import { Session } from "next-auth";
import Image from "next/image";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const UPDATE_PROFILE = gql`
    mutation ($profile: UpdateProfileDto!) {
        updateProfile(profile: $profile) {
            id
            company_name
            company_links
            company_website
            target_audience
            business_info
            push_notification_enabled
            mail_notification_enabled
            created_at
            updated_at
        }
    }
`;

export default function NotificationSetting({ session }: { session: Session | null }): ReactNode {
    const initialData = useAppSelector((state) => state.userReducer.user);
    const client = getClient(session);
    const [updateProfile] = useMutation(UPDATE_PROFILE, {
        client: client,
    });

    const [formData, setFormData] = useState({
        id: null,
        push_notification_enabled: false,
        mail_notification_enabled: false,
    });

    const handleOnChanges = async (e: ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;

        await setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: checked,
        }));

        handleSubmit(name, checked);
    };

    const handleSubmit = async (name: string, checked: boolean) => {
        try {
            const { data } = await updateProfile({
                variables: {
                    profile: { ...formData, [name]: checked },
                },
            });

            data && toast.success("Notification settings updated successfully");
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    };

    useEffect(() => {
        if (initialData) {
            setFormData((prevState) => ({
                ...prevState,
                id: initialData.profile.id,
                push_notification_enabled: initialData.profile.push_notification_enabled,
                mail_notification_enabled: initialData.profile.mail_notification_enabled,
            }));
        }
    }, [initialData]);

    return (
        <DashBoardCard headerTitle="Notification Settings">
            <>
                <div className="flex flex-col px-[35px] py-[24px]">
                    <div className="flex flex-row justify-between">
                        <div className="text-base">
                            Browser push notifications (Updates & Messages from designers)
                        </div>
                        <div>
                            <Switch
                                slotProps={{ input: { name: "push_notification_enabled" } }}
                                checked={formData.push_notification_enabled}
                                onChange={handleOnChanges}
                            />
                        </div>
                    </div>
                    <div className="md:mt-0 mt-[20px] flex flex-raw">
                        <Image
                            src="https://res.cloudinary.com/pizdata/image/upload/v1626192951/app/platform/images/i-alert.svg"
                            width={20}
                            height={20}
                            alt="img"
                        />
                        <span className="ml-1 text-aw-gray-400 text-sm font-light">
                            Unfortunately, this function is not currently available in Safari
                        </span>
                    </div>
                </div>
                <div className="flex flex-col px-[35px] py-[24px]">
                    <div className="flex flex-row justify-between">
                        <div className="text-base">
                            Mail notifications (Updates & Messages from designers)
                        </div>
                        <div>
                            <Switch
                                slotProps={{ input: { name: "mail_notification_enabled" } }}
                                checked={formData.mail_notification_enabled}
                                onChange={handleOnChanges}
                            />
                        </div>
                    </div>
                </div>
            </>
        </DashBoardCard>
    );
}
