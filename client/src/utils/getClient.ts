import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

let client: ApolloClient<any> | undefined = undefined;

const httpLink = new HttpLink({
    uri: `http://localhost:3000/graphql`,
});

let authLink = (session: any) =>
    setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: `Bearer ${session?.access_token || session?.data?.access_token}`,
            },
        };
    });

export const getClient = (session?: any) => {
    // Create new client if there is no existing one
    // or if we are running on server
    if (!client || typeof window === "undefined") {
        client = new ApolloClient({
            link: session ? authLink(session).concat(httpLink) : httpLink,
            cache: new InMemoryCache({
                addTypename: false,
            }),
        });
    }

    return client;
};
