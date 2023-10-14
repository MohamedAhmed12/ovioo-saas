"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useAppSelector } from "@/hooks/redux";
import { useForm } from "@/hooks/useForm";
import { useGraphError } from "@/hooks/useGraphError";
import { getClient } from "@/utils/getClient";
import { gql, useMutation } from "@apollo/client";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "@mui/joy";
import TextField from "@mui/material/TextField";
import { Session } from "next-auth";
import Image from "next/image";
import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UPLOAD_FILE = gql`
    mutation UploadFile($file: Upload!) {
        uploadFile(file: $file)
    }
`;
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
        avatar: "",
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

    const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const files = e?.target?.files;

            if (!files || files?.length === 0) return;

            const form = new FormData();
            for (let i = 0; i < files.length; i++) {
                form.append('files[]', files[i])
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/file/upload`, {
                method: 'POST',
                body: form,
                headers: {
                    authorization: `Bearer ${session?.access_token}`
                }
            });


            if (response.ok) {
                const responseData = await response.json();

                await setFormData((prevState) => ({
                    ...prevState,
                    avatar: responseData?.[0]?.Location || formData.avatar,
                }));
            } else {
                toast.error("Something went wrong!");
            }
        } catch (e: any) {
            toast.error("Something went wrong!");
        }
    }
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
                avatar: initialData.avatar,
                fullname: initialData.fullname,
                email: initialData.email,
            });
        }
    }, [initialData]);

    return (
        <DashBoardCard handleSubmit={handleSubmit} headerTitle="profile settings">
            <>
                <div className="flex flex-row">
                    <div className="basis-1/5 flex flex-col mr-16">
                        {
                            formData.avatar
                                ? <Image
                                    src={formData.avatar}
                                    width="500"
                                    height="500"
                                    alt="profile"
                                    className="rounded-full mb-4"
                                    style={{ width: 150, height: 150 }}
                                />
                                : <AccountCircleIcon style={{ width: 150, height: 150 }} />
                        }

                        <Button
                            component="label"
                            role={undefined}
                            tabIndex={-1}
                            startDecorator={
                                <AddAPhotoIcon />
                            }
                            className="w-40 !bg-transparent"
                        >
                            <span className="mt-1">Edit photo</span>
                            <input type="file" className="dashboard-file-upload" onChange={handleAvatarUpload} multiple />
                        </Button>
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
                            onChange={handleOnChange}
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
