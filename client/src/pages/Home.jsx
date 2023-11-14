// Import React, useEffect, useState
import React, { useEffect, useState } from "react";
// Import Post and Navbar components
import Post from "../components/post/Post";
import Navbar from "../components/navbar/Navbar";

// Define Home component
function Home() {
  // State to store posts
  const [posts, setPosts] = useState([]);

  // Fetch posts data on component mount
  useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  // Render the component
  return (
    <main>
      {/* Iterate over posts and render Post components */}
      {posts.length > 0 &&
        posts.map((post) => (
          // Use Post component with key prop
          <React.Fragment key={post._id}>
            <Post {...post} />
            <div className="line mb-3">
              <div className="right-line"></div>
            </div>
          </React.Fragment>
        ))}
    </main>
  );
}

// Export the Home component
export default Home;
