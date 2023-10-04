import NotificationSetting from "@/components/Dashboard/Profile/NotificationSetting";
import PasswordSetting from "@/components/Dashboard/Profile/PasswordSetting";
import ProfileSetting from "@/components/Dashboard/Profile/ProfileSetting";
import { authOptions } from "@/constants/authOptions";
import { getServerSession } from "next-auth";

export default async function Profile() {
    const session = await getServerSession(authOptions);

    return (
        session && (
            <div className="profilepage px-40 flex flex-col lg:flex-col w-full">
                <div className="profile-setting">
                    <ProfileSetting session={session} />
                </div>
                <div className="notification-setting">
                    <NotificationSetting session={session} />
                </div>
                <div className="password-setting">
                    <PasswordSetting session={session} />
                </div>
            </div>
        )
    );
}
