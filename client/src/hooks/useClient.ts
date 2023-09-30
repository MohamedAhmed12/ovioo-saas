import { authOptions } from "@/constants/authOptions";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

let client: ApolloClient<any> | undefined;
let useClient: any;
let session: any;

const httpLink = new HttpLink({
    uri: `http://localhost:3000/graphql`,
});

let authLink = (session?: any) =>
    setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${session?.access_token || session?.data?.access_token}`,
            },
        };
    });

const getClient = (session: any): ApolloClient<any> | null => {
    // if there client exists return else create one
    if (!client) {
        client = new ApolloClient({
            link: session ? authLink(session).concat(httpLink) : httpLink,
            cache: new InMemoryCache(),
        });
    }

    return client;
};

// handle session to pass to client in both ends (server-client)
if (typeof window === "undefined") {
    useClient = async () => {
        session = await getServerSession(authOptions);
        return getClient(session);
    };
} else {
    useClient = () => {
        session = useSession();
        return getClient(session);
    };
}

export { useClient };
