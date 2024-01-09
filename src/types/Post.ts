import { SharedProps } from "./Shared";

export type PostType = {
  id: number;
  user: {
    userId: number;
    username?: string;
    name?: string;
  };
  title: string;
  body: string;
};

export type PostResponseType = PostType & {
  userId: number;
};

export interface DetailedPostProps extends SharedProps {
  selectedPost?: PostType;
}

export interface PostProps extends SharedProps {
  post: PostType;
  hasLink?: boolean;
  setSelectedPost?: Function;
}
