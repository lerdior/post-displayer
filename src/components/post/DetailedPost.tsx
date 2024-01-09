import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { DetailedPostProps, PostType } from "../../types/Post";
import Post from "../list/Post";
import { mapPost } from "../../helpers/mapPosts";
import { UserType } from "../../types/User";
import { mapUser } from "../../helpers/mapUsers";

const postErrorOnLoadData = {
  id: 1,
  user: {
    userId: 1,
    username: "",
    name: "",
  },
  title: "",
  body: "",
};

function DetailedPost({ selectedPost, logEvent }: DetailedPostProps) {
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [post, setPost] = useState<PostType>();
  const [users, setUsers] = useState<Array<UserType>>([]);

  const urlParams = useParams();

  const { postId } = urlParams;

  const fetchPost = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((res) => res.json())
      .then((postData) => {
        setPost(mapPost(postData));
      })
      .catch(() => setPost(postErrorOnLoadData))
      .finally(() => setLoadingPost(false));
  };

  const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((_users) => setUsers([..._users.map(mapUser)]))
      .catch(() => setUsers([]))
      .finally(() => setLoadingUsers(false));
  };

  useEffect(() => {
    logEvent("Detailed post");
  }, []);

  useEffect(() => {
    if (postId && !selectedPost) {
      fetchPost();
      fetchUsers();
    } else {
      setLoadingPost(false);
      setLoadingUsers(false);
      setPost(selectedPost || postErrorOnLoadData);
    }
  }, [postId, selectedPost]);

  useEffect(() => {
    if (!loadingUsers && !loadingPost && users?.length && post) {
      const authorOfPost = users.find((user) => user.id === post.user.userId);
      const newPost = {
        ...post,
        user: {
          userId: authorOfPost?.id || 1,
          username: authorOfPost?.username,
          name: authorOfPost?.name,
        },
      };

      setPost({ ...newPost });
    }
  }, [users, post, loadingPost, loadingUsers]);

  if (loadingPost || loadingUsers || !post) {
    return <></>;
  }

  return (
    <div>
      <Link className="back-home" to="/posts">
        See all posts
      </Link>
      <Post post={post} logEvent={logEvent} hasLink={false} />
    </div>
  );
}

export default DetailedPost;
