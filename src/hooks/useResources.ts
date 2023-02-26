import { API, graphqlOperation } from "aws-amplify";
import { getResources } from "@/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GetResourcesQuery } from "@/API";
import { useQuery } from "react-query";

export const RESOURCES_QUERY_KEY = "resources";

export const useResources = () => {
  return useQuery(RESOURCES_QUERY_KEY, async () => {
    const result = (await API.graphql(
      graphqlOperation(getResources)
    )) as GraphQLResult<GetResourcesQuery>;
    return result.data?.getResources;
  });
};
