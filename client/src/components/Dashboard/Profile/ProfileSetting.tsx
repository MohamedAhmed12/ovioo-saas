"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useAppSelector } from "@/hooks/redux";
import { useForm } from "@/hooks/useForm";
import { useGraphError } from "@/hooks/useGraphError";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "@mui/joy";
import TextField from "@mui/material/TextField";
import { Session } from "next-auth";
import Image from "next/image";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UPDATE_USER = gql`
    mutation ($data: UpdateUserDto!) {
        updateUser(data: $data) {
            fullname
            email
        }
    }
`;

export default function ProfileSetting({ session }: { session: Session | null }): ReactNode {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
    });

    const { errors, errorHandler } = useGraphError({});
    const { handleOnChange } = useForm(setFormData);
    const initialData = useAppSelector((state) => state.userReducer.user);
    const client = getClient(session);

    const [updateUser] = useMutation(UPDATE_USER, {
        client,
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await updateUser({
                variables: {
                    data: formData,
                },
            });
            toast.success("Profile settings updated successfully");
            errorHandler({});
        } catch (e: any) {
            errorHandler(e);
            toast.error("Something went wrong!");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (initialData) {
            setFormData({
                fullname: initialData.fullname,
                email: initialData.email,
            });
        }
    }, [initialData]);

    return (
        <DashBoardCard handleSubmit={handleSubmit} headerTitle="profile settings">
            <>
                <div className="flex flex-row">
                    <div className="basis-1/5 flex flex-col pr-5">
                        <Image
                            src="https://picsum.photos/id/12/400/400"
                            width="1500"
                            height="1500"
                            alt="profile"
                            className="rounded-full"
                        />
                        <div className="mt-5 mb-3 flex items-center cursor-pointer">
                            <AddAPhotoIcon />
                            <span className="blue-text px-3">Edit photo</span>
                        </div>
                    </div>
                    <div className="basis-4/5 flex flex-col">
                        <TextField
                            className="dashboard-input"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Full name"
                            name="fullname"
                            error={errors.hasOwnProperty("fullname")}
                            helperText={errors["fullname"]}
                            value={formData.fullname}
                            onChange={handleOnChange}
                        />
                        <TextField
                            className="dashboard-input"
                            margin="normal"
                            required
                            fullWidth
                            name="email"
                            label="Email Address"
                            type="email"
                            id="email"
                            disabled
                            value={formData.email}
                            // onChange={handleOnChange}
                            inputProps={{
                                style: {
                                    WebkitTextFillColor: "grey",
                                    cursor: "not-allowed",
                                },
                            }}
                        />
                    </div>
                </div>
                <div className="flex w-full justify-end mt-5">
                    <Button loading={loading} type="submit" className="dashboard__btn">
                        Update
                    </Button>
                </div>
            </>
        </DashBoardCard>
    );
}
