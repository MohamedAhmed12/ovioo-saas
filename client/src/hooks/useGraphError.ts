import { useState } from "react";
import toast from "react-hot-toast";

export const useGraphError = (initialVal: { [key: string]: string }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const errorHandler = (e: any) => {
        const graphQLerror = e?.graphQLErrors?.[0]?.extensions?.originalError;

        if (Array.isArray(graphQLerror?.message)) {
            setErrors(e.graphQLErrors[0].extensions.originalError.message[0]);
        } else {
            if (graphQLerror?.statusCode == 400) {
                setErrors({});
                toast.error(graphQLerror?.message);
            }
        }
    };

    return { errors, errorHandler };
};
