// Import React, useEffect, useState
import React, { useEffect, useState } from "react";
import Post from "../post/Post";
// Import Post and Navbar components

// Define Home component
function ReactJs() {
  // State to store posts
  const [posts, setPosts] = useState([]);

 // Fetch posts data on component mount
useEffect(() => {
    fetch("http://localhost:4000/post").then((res) => {
      res.json().then((posts) => {
        // Filter the posts to only include the ones with the category "Books"
        const ReactJsPosts = posts.filter(post => post.category === "ReactJs");
  
        // Set the state with the filtered posts
        setPosts(ReactJsPosts);
        
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
export default ReactJs;
