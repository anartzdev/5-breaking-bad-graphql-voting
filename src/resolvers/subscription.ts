import { IResolvers } from "@graphql-tools/utils";
import { PubSub } from "graphql-subscriptions";
import { CHANGE_VOTES } from "../config/constants";
const pubsub = new PubSub();
const subscription: IResolvers = {
    Subscription: {
        newVote: {
            subscribe: () => {
              console.log("dkdkdkd");
                return pubsub.asyncIterator([CHANGE_VOTES]);
            }
        },
    },
  };

export default subscription;
