import { withFilter } from "apollo-server-express";
import { IResolvers } from "graphql-tools";
import { CHANGE_VOTES, CHANGE_VOTE } from "../config/constants";

const subscription: IResolvers = {
    Subscription: {
        newVote: {
            subscribe: (_: void, __: any, { pubsub }: any) => {
                return pubsub.asyncIterator(CHANGE_VOTES);
            }
        },
    },
  };

export default subscription;
