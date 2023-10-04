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
            setErrors({});

            if ([403, 404, 409, 400].includes(graphQLerror?.originalError?.statusCode)) {
                toast.error(graphQLerrorMsgs);
            }

            if ([401].includes(graphQLerror?.originalError?.statusCode)) {
                throw new Error("You have to login in order to view this page.");
            }
        }
    };

    return { errors, errorHandler };
};
