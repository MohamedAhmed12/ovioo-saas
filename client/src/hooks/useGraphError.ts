import { useState } from "react";
import toast from "react-hot-toast";

export const useGraphError = (initialVal: { [key: string]: string }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>(initialVal);

    const errorHandler = (e: any) => {
        const graphQLerror = e?.graphQLErrors?.[0]?.extensions;
        const graphQLerrorMsgs = graphQLerror?.originalError?.message;

        if (Array.isArray(graphQLerrorMsgs)) {
            setErrors(graphQLerrorMsgs[0]);
        } else {
            if (["BAD_REQUEST", "UNAUTHENTICATED"].includes(graphQLerror?.code)) {
                setErrors({});
                toast.error(graphQLerrorMsgs);
            }
        }
    };

    return { errors, errorHandler };
};
