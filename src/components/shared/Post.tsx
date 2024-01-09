import React, { ReactNode, useEffect, useState } from "react";
import { PostProps } from "../../types/Post";
import { CommentType } from "../../types/Comment";
import { mapComment } from "../../helpers/mapComments";
import { Link } from "react-router-dom";
import Title from "./Title";

interface OptionalLinkProps {
  postId: number;
  children: ReactNode;
  hasLink: boolean;
  onClick?: Function;
}

const OptionalLink = ({ postId, children, onClick = () => {}, hasLink }: OptionalLinkProps) => {
  return (
    <>
      {hasLink ? (
        <Link to={`/post/${postId}`} onClick={() => onClick()}>
          {children}
        </Link>
      ) : (
        children
      )}
    </>
  );
};

function Post({ post, hasLink = true, setSelectedPost = () => {}, logEvent }: PostProps) {
  const [comments, setComments] = useState<Array<CommentType>>([]);

  const fetchPostComments = () => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`)
      .then((res) => res.json())
      .then((_comments) => {
        setComments([..._comments.map(mapComment)]);
      })
      .catch(() => setComments([]));
  };

  useEffect(() => {
    logEvent("Post");

    fetchPostComments();
  }, []);

  const { id, title, body, user } = post;

  return (
    <OptionalLink postId={post.id} onClick={() => setSelectedPost(post)} hasLink={hasLink}>
      <div key={id} className="post">
        <Title text={title} titleSize={2} />
        <p className="post-description">{body}</p>
        <div className="author">
          <span>{user?.name || ""}</span>
        </div>

        <h4>Comments</h4>
        <div className="comments">
          {comments.map(({ id, name, body }) => (
            <div key={id} className="comment">
              <h5>{name}</h5>
              <p>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </OptionalLink>
  );
}

export default Post;
