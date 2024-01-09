import { CommentType } from "../types/Comment";

export const mapComment = ({ id, postId, name, body, ...rest }: CommentType) => ({
  id,
  postId,
  name,
  body,
});
