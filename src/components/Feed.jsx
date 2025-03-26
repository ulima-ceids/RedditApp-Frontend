import React from "react";
import "./Feed.css";

const posts = [
  {
    user: "dev_john",
    content: "¿Alguien más ama React tanto como yo?",
    image: "https://source.unsplash.com/400x200/?code,react",
    likes: 12,
  },
  {
    user: "gamer_lu",
    content: "Mi nuevo setup gamer 🔥",
    image: "https://source.unsplash.com/400x200/?gaming,setup",
    likes: 45,
  },
];

export default function Feed() {
  return (
    <section className="feed">
      {posts.map((post, index) => (
        <div className="post" key={index}>
          <div className="post-header">
            <strong>@{post.user}</strong>
          </div>
          <p>{post.content}</p>
          <img src={post.image} alt="post" />
          <div className="likes">❤️ {post.likes} likes</div>
        </div>
      ))}
    </section>
  );
}
