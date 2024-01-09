import { PostResponseType } from "../types/Post";

export const mapPost = ({ id, body, title, userId }: PostResponseType) => {
  return {
    id,
    body,
    title,
    user: {
      userId,
    },
  };
};
