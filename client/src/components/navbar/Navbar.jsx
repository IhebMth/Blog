import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Dropdown from "react-bootstrap/Dropdown";
import menu from "../../images/menu.svg";
import Loading from "../loading/Loading";
function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:4000/profile", {
          credentials: "include",
        });

        if (response.ok) {
          const userInfo = await response.json();
          setUserInfo(userInfo);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Rest of your component code

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo({});
  };
  const userName = userInfo?.userName;
  const role = userInfo?.role;

  return (
    <main>
      <header className="d-flex flex-column">
        <div className="menu-top ">
          <Link to="/" className="logo">
            MyBlog
          </Link>
          <nav>
            {userName && (
              <>
                <div className="user mt-2">
                  <p>
                    <b>Hello {userName}</b>
                  </p>
                </div>
                {role === "Admin" && (
                  <Link to="/create" className="login">
                    Create new Post
                  </Link>
                )}
                <a className="login" onClick={logout}>
                  Logout
                </a>
              </>
            )}
            {!userName && (
              <>
                <Link to="/login" className="login">
                  Login
                </Link>
                <Link to="/register" className="register">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
        <hr />
        <div className="menu-bottom d-flex align-items-center gap-30 p-1">
          <div>
            <Dropdown className="header-bottom">
              <img src={menu} alt="menu" />
              <Dropdown.Toggle variant="bg-white" id="dropdown-basic">
                Show Categories
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu">
                <Dropdown.Item href="#" className="dropdown-item">
                  <button onClick={() => navigate("/html")}>Html</button>
                </Dropdown.Item>
                <Dropdown.Item href="#" className="dropdown-item">
                  <button onClick={() => navigate("/css")}>Css</button>
                </Dropdown.Item>
                <Dropdown.Item href="#" className="dropdown-item">
                  <button onClick={() => navigate("/javaScript")}>
                    JavaScript
                  </button>
                </Dropdown.Item>
                <Dropdown.Item href="#" className="dropdown-item">
                  <button onClick={() => navigate("/reactJs")}>ReactJS</button>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="menu-links ">
            <Link to="/jobs">Jobs</Link>
            <Link to="/books">Books</Link>
          </div>
        </div>
      </header>
    </main>
  );
}

export default Navbar;
