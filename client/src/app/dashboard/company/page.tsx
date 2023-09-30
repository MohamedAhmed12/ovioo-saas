"use client";
import DashBoardCard from "@/components/DashBoardCard";
import { useClient } from "@/hooks/useClient";
import { useForm } from "@/hooks/useForm";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Button } from "@mui/joy";
import { TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FETCH_PROFILE = gql`
    query {
        findProfile {
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

export default function Company() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        company_name: "",
        company_website: "",
        business_info: "",
        target_audience: "",
        company_links: "",
    });
    const { handleOnChange } = useForm(setFormData);

    const apolloClient = useClient();
    const {
        loading: graphQLloading,
        error,
        data: initialData,
    } = useQuery(FETCH_PROFILE, { client: apolloClient });

    const [updateProfile] = useMutation(UPDATE_PROFILE, {
        client: apolloClient,
        refetchQueries: [FETCH_PROFILE],
    });

    useEffect(() => {
        if (!loading && initialData) {
            setFormData(initialData.findProfile);
        }
    }, [loading, initialData]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await updateProfile({
                variables: {
                    profile: formData,
                },
            });
            data && toast.success("Profile settings updated successfully");
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
        setLoading(false);
    };

    if (error) throw new Error(JSON.stringify(error));

    return (
        !graphQLloading &&
        initialData.findProfile && (
            <div className="company-card px-40 flex flex-col lg:flex-col w-full">
                <DashBoardCard handleSubmit={handleSubmit} headerTitle="profile settings">
                    <>
                        <div className="flex flex-row">
                            <div className="w-full flex flex-col">
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    id="Company-name"
                                    label="Company name"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleOnChange}
                                    autoFocus
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    name="company_website"
                                    label="Website link"
                                    type="link"
                                    id="link"
                                    value={formData.company_website}
                                    onChange={handleOnChange}
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    name="business_info"
                                    label="what is your business About?"
                                    type="what is your business About"
                                    id="what-is-your-business-About"
                                    multiline
                                    value={formData.business_info}
                                    onChange={handleOnChange}
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    name="target_audience"
                                    label="describe your client/ target audience"
                                    type="client"
                                    id="client"
                                    multiline
                                    value={formData.target_audience}
                                    onChange={handleOnChange}
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    name="company_links"
                                    label="Other links"
                                    type="Other links"
                                    id="Other-links"
                                    multiline
                                    value={formData.company_links}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-end mt-6">
                            <Button
                                loading={loading}
                                type="submit"
                                className="bg-[--dashboard-primary] text-white "
                            >
                                update
                            </Button>
                        </div>
                    </>
                </DashBoardCard>
            </div>
        )
    );
}
