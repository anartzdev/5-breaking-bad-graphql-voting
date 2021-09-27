import query from "./query";
import mutation from "./mutation";
import type from "./type";
import subscription from "./subscription";
import { IResolvers } from "@graphql-tools/utils";

const resolvers : IResolvers = {
    ...query,
    ...mutation,
    ...subscription,
    ...type
}

export default resolvers;
