import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

let client: ApolloClient<any> | undefined = undefined;

const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
});

const wsLink = (session: any) =>
    new GraphQLWsLink(
        createClient({
            url: `ws://localhost:3000/graphql`,
            connectionParams: () => {
                return {
                    Authorization: `Bearer ${
                        session?.access_token || session?.data?.access_token
                    }`,
                };
            },
        })
    );

let authLink = (session: any) =>
    setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                Authorization: `Bearer ${
                    session?.access_token || session?.data?.access_token
                }`,
            },
        };
    });

const splitLink = (session: any) =>
    split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            );
        },
        wsLink(session),
        httpLink
    );

export const getClient = (session?: any) => {
    // Create new client if there is no existing one
    // or if we are running on server
    if (!client || typeof window === "undefined") {
        client = new ApolloClient({
            link: session
                ? authLink(session).concat(splitLink(session))
                : httpLink,
            cache: new InMemoryCache({
                addTypename: false,
            }),
        });
    }

    return client;
};
