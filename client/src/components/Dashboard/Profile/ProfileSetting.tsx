"use client";

import DashBoardCard from "@/components/DashBoardCard";
import { useAppSelector } from "@/hooks/redux";
import { useForm } from "@/hooks/useForm";
import { useGraphError } from "@/hooks/useGraphError";
import { getClient } from "@/utils/getClient";
import { uploadFiles } from "@/utils/helpers";
import { gql, useMutation } from "@apollo/client";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { Button } from "@mui/joy";
import { CircularProgress } from "@mui/material";
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

export default function ProfileSetting({
    session,
}: {
    session: Session | null;
}): ReactNode {
    const [loading, setLoading] = useState(false);
    const [refreshAvatar, setRefreshAvatar] = useState(0);
    const [avatarLoading, setAvatarLoading] = useState(false);
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
        setAvatarLoading(true);

        const res = await uploadFiles(e, session, `avatars/${initialData.id}`);
        if (res?.[0]?.s3Path?.Location) {
            setRefreshAvatar((prevState) => prevState + 1);
            toast.success("Avatar updated successfully");
        }

        setAvatarLoading(false);
    };

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
        <DashBoardCard
            handleSubmit={handleSubmit}
            headerTitle="profile settings"
        >
            <>
                <div className="flex flex-row">
                    <div className="basis-1/5 flex flex-col">
                        {initialData.avatar ? (
                            <Image
                                src={`${formData.avatar}?refreshKey=${refreshAvatar}`}
                                width="500"
                                height="500"
                                alt="profile"
                                className="rounded-full mb-4"
                                style={{
                                    width: 150,
                                    height: 150,
                                    minWidth: 150,
                                }}
                                key={refreshAvatar}
                                unoptimized
                            />
                        ) : (
                            <AccountCircleIcon
                                style={{ width: 150, height: 150 }}
                            />
                        )}

                        {avatarLoading ? (
                            <div className="w-full flex justify-center min-w-[160px]">
                                <CircularProgress color="inherit" />
                            </div>
                        ) : (
                            <Button
                                component="label"
                                role={undefined}
                                tabIndex={-1}
                                startDecorator={<AddAPhotoIcon />}
                                className="w-40 !bg-transparent mt-1"
                            >
                                <span>Edit photo</span>
                                <input
                                    type="file"
                                    className="dashboard-file-upload"
                                    onChange={handleAvatarUpload}
                                    multiple
                                />
                            </Button>
                        )}
                    </div>
                    <div className="basis-4/5 flex flex-col ml-16">
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
                    <Button
                        loading={loading}
                        type="submit"
                        className="dashboard__btn"
                    >
                        Update
                    </Button>
                </div>
            </>
        </DashBoardCard>
    );
}
