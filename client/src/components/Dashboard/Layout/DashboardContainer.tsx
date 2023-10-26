"use client";

import DashboardHeader from "@/components/Dashboard/Layout/Header/index";
import Navbar from "@/components/Dashboard/Layout/Navbar/index";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useGraphError } from "@/hooks/useGraphError";
import { ModeEnum } from "@/interfaces/store/main";
import { setUser } from "@/store/features/user";
import "@/styles/app/dashboard/layout.scss";
import { getClient } from "@/utils/getClient";
import { gql, useQuery } from "@apollo/client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

const FETCH_PROFILE_WITH_USER = gql`
    query {
        me {
            id
            fullname
            email
            company
            phone
            provider
            avatar
            role
            profile {
                id
                push_notification_enabled
                mail_notification_enabled
            }
        }
    }
`;

export default function DashboardContainer({
    children,
    session,
}: {
    children: React.ReactNode;
    session: Session | null;
}) {
    const dispatch = useAppDispatch();
    const { errorHandler } = useGraphError({});
    const apolloClient = getClient(session);
    const mode = useAppSelector((state) => state.mainReducer.mode);

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const {
        loading: graphQLloading,
        data: userData,
        error: GQLErr,
    } = useQuery(FETCH_PROFILE_WITH_USER, {
        client: apolloClient,
        fetchPolicy: "no-cache",
    });

    useEffect(() => {
        if (!graphQLloading) {
            userData?.me && dispatch(setUser(userData.me));

            if (GQLErr) {
                if (
                    GQLErr?.graphQLErrors?.[0]?.extensions?.originalError
                        ?.statusCode == 401
                )
                    signOut();
            }
        }
    }, [userData, graphQLloading, GQLErr, dispatch]);

    useEffect(() => {
        const htmlElement: HTMLElement = document.documentElement;

        if (htmlElement.classList.contains(ModeEnum.Dark))
            htmlElement.classList.remove(ModeEnum.Dark);

        if (htmlElement.classList.contains(ModeEnum.Light))
            htmlElement.classList.remove(ModeEnum.Light);

        htmlElement.classList.add(mode);
        setLoading(false);
    }, [mode]);

    return (
        !loading && (
            <main className="flex min-h-screen flex-col dashboard-main-layout pt-32 pb-14 pl-80 pr-8 bg-[#f4f7fd] dark:bg-[#20212c]">
                <DashboardHeader
                    openNav={open}
                    onOpenNav={() => setOpen(true)}
                />
                <Navbar openNav={open} onCloseNav={() => setOpen(false)} />
                {children}
                <Toaster
                    position="top-right"
                    toastOptions={{
                        style: {
                            backgroundColor: "#20212c",
                            color: "#fff",
                        },
                    }}
                />
            </main>
        )
    );
}
