import { getClient } from "@/app/api/apollo-client";
import { UserRegister as UserRegisterInterface } from "@/interfaces/user";
import { gql } from "@apollo/client";

const Register = gql`
    mutation ($user: RegisterDto!) {
        register(user: $user) {
            id
            firstname
            lastname
            email
            avatar
            created_at
            updated_at
        }
    }
`;

export const useRegister = async (user: UserRegisterInterface) => {
    const client = getClient();
    const { data } = await client.mutate({
        mutation: Register,
        variables: {
            user,
        },
    });

    return data;
};
