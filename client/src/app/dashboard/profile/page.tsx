"use client";

import NotificationSetting from "@/components/Dashboard/Profile/NotificationSetting";
import PasswordSetting from "@/components/Dashboard/Profile/PasswordSetting";
import ProfileSetting from "@/components/Dashboard/Profile/ProfileSetting";
import { useAppSelector } from "@/hooks/redux";
import { useSession } from "next-auth/react";

export default function Profile() {
    const { data: session } = useSession({ required: true });
    const user = useAppSelector((state) => state.userReducer.user);

    return (
        user &&
        session && (
            <div className="profilepage px-40 flex flex-col lg:flex-col w-full">
                <div className="profile-setting">
                    <ProfileSetting session={session} user={user} />
                </div>
                <div className="notification-setting">
                    <NotificationSetting session={session} />
                </div>
                <div className="password-setting">
                    <PasswordSetting session={session} user={user} />
                </div>
            </div>
        )
    );
}
