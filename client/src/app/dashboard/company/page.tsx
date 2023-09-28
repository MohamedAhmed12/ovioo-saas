"use client";
import { getClient } from "@/app/api/apollo-client";
import DashBoardCard from "@/components/DashBoardCard";
import { useInput } from "@/hooks/useInput";
import { gql, useQuery } from "@apollo/client";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FormEvent, useEffect } from "react";

const FetchProfile = gql`
    query ($id: Float!) {
        findProfile(id: $id) {
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
    const client = getClient();
    const { loading, error, data } = useQuery(FetchProfile, { client, variables: { id: 1 } });
    const {
        value: company_name,
        setValue: setValueCompanyName,
        bind: bindCompanyName,
    } = useInput("");
    const {
        value: company_website,
        setValue: setValueCompanyWebsite,
        bind: bindCompanyWebsite,
    } = useInput("");
    const {
        value: business_info,
        setValue: setValueBusinessInfo,
        bind: bindBusinessInfo,
    } = useInput("");
    const {
        value: target_audience,
        setValue: setValueTargetAudience,
        bind: bindTargetAudience,
    } = useInput("");
    const {
        value: company_links,
        setValue: setValueCompanyLinks,
        bind: bindCompanyLinks,
    } = useInput("");

    useEffect(() => {
        console.log("loain");

        if (!loading) {
            setValueCompanyName(data.findProfile.company_name || "");
            setValueCompanyWebsite(data.findProfile.company_website || "");
            setValueBusinessInfo(data.findProfile.business_info || "");
            setValueTargetAudience(data.findProfile.target_audience || "");
            setValueCompanyLinks(data.findProfile.company_links || "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, data]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get("email"),
            password: data.get("password"),
        });
    };

    if (error) throw new Error(JSON.stringify(error));

    return (
        !loading &&
        data && (
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
                                    name="Company name"
                                    {...bindCompanyName}
                                    autoFocus
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    name=" link"
                                    label="Website link"
                                    type="link"
                                    id="link"
                                    {...bindCompanyWebsite}
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    name="what is your business About"
                                    label="what is your business About?"
                                    type="what is your business About"
                                    id="what-is-your-business-About"
                                    multiline
                                    {...bindBusinessInfo}
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    name="client"
                                    label="describe your client/ target audience"
                                    type="client"
                                    id="client"
                                    multiline
                                    {...bindTargetAudience}
                                />
                                <TextField
                                    className="dashboard-input"
                                    margin="normal"
                                    fullWidth
                                    name="Other links"
                                    label="Other links"
                                    type="Other links"
                                    id="Other-links"
                                    multiline
                                    {...bindCompanyLinks}
                                />
                            </div>
                        </div>
                        <div className="flex w-full justify-end mt-6">
                            <Button type="submit" className="bg-[--dashboard-primary] text-white ">
                                update
                            </Button>
                        </div>
                    </>
                </DashBoardCard>
            </div>
        )
    );
}
