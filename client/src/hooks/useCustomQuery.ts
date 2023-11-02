import {
    ApolloClient,
    DocumentNode,
    QueryResult,
    useQuery,
} from "@apollo/client";

export const useCustomQuery = (
    client: ApolloClient<any> | undefined,
    query: DocumentNode,
    queryData: any,
    fetchPolicy?: string,
    nextFetchPolicy?: string
): QueryResult<any> => {
    let options: any = {
        client,
        variables: {
            data: queryData,
        },
    };
    options = fetchPolicy ? { ...options, fetchPolicy } : options;
    options = nextFetchPolicy ? { ...options, nextFetchPolicy } : options;

    return useQuery(query, options);
};
