import React, { useEffect, useState } from "react";
import { PostsProps } from "../../types/Posts";
import { PostType } from "../../types/Post";
import { UserType } from "../../types/User";
import { mapUser } from "../../helpers/mapUsers";
import { mapPost } from "../../helpers/mapPosts";
import Post from "../shared/Post";
import Title from "../shared/Title";

function Posts({ logEvent, setSelectedPost }: PostsProps) {
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [initializedUsers, setInitializedUsers] = useState(false);

  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchAndSetPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((_posts) => {
        setPosts([..._posts.map(mapPost)]);
      })
      .catch((err) => {
        setPosts([]);
      })
      .finally(() => setLoadingPosts(false));
  };

  const fetchUsersAndUpdatePosts = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((_users) => _users.map(mapUser))
      .then((mappedUsers) => {
        const postsWithUsers = posts.map((post: PostType) => {
          const userId = post?.user?.userId;
          const userData = mappedUsers.find((user: UserType) => user.id === userId);
          return {
            ...post,
            user: {
              userId,
              username: userData.username,
              name: userData.name,
            },
          };
        });

        setPosts([...postsWithUsers]);
      })
      .catch((err) => console.log("Failed to load users. ", err));
  };

  useEffect(() => {
    logEvent("Posts");

    setLoadingPosts(true);
    fetchAndSetPosts();
  }, []);

  useEffect(() => {
    if (!loadingPosts && posts.length && !initializedUsers) {
      fetchUsersAndUpdatePosts();
      setInitializedUsers(true);
    }
  }, [posts, initializedUsers, loadingPosts]);

  return (
    <main>
      <div className="flex space-between">
        <Title text="Posts" titleSize={1} />
        <input
          type="search"
          value={searchInput}
          placeholder="Filter by user's name"
          onChange={(evt) => setSearchInput(evt.target.value)}
        />
      </div>

      <section className="posts-container">
        {posts
          .filter((post) => {
            if (!searchInput) return true;
            return post?.user?.name?.toLowerCase().includes(searchInput.toLowerCase());
          })
          .map((post) => (
            <Post key={post.id} post={post} logEvent={logEvent} setSelectedPost={setSelectedPost} />
          ))}
      </section>
    </main>
  );
}

export default Posts;
