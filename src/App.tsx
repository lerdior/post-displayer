import React, { useState } from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Posts from "./components/list/Posts";
import DetailedPost from "./components/post/DetailedPost";
import { PostType } from "./types/Post";

function App() {
  const [selectedPost, setSelectedPost] = useState<PostType>();

  const logEvent = (componentName: string) => {
    console.log(`Hello from ${componentName}`);
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/posts" replace={true} />} />
      <Route
        index
        path="/posts"
        element={<Posts logEvent={logEvent} setSelectedPost={setSelectedPost} />}
      />
      <Route
        path="/post/:postId"
        element={<DetailedPost selectedPost={selectedPost} logEvent={logEvent} />}
      />
    </Routes>
  );
}

export default App;
