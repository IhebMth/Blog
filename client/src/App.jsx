import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Navbar from './components/navbar/Navbar';
import Layout from './components/Layout';
import { UserContextProvider } from './UserContext';
import Create from './pages/create/Create';
import PostPage from './pages/postPage/PostPage';
import EditPost from './components/edit/EditPost';
import Html from './components/categories/Html';
import Css from './components/categories/Css';
import JavaScript from './components/categories/JavaScript'; // Corrected import
import ReactJs from './components/categories/ReactJs';
import Books from './components/categories/Books';
import Jobs from './components/categories/Jobs';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create' element={<Create />} />
            <Route path='/post/:id' element={<PostPage />} />
            <Route path='/edit/:id' element={<EditPost />} />
            
            <Route path='/html' element={<Html />} />
            <Route path='/css' element={<Css />} />
            <Route path='/javaScript' element={<JavaScript />} />
            <Route path='/reactJs' element={<ReactJs />} />
            <Route path='/books' element={<Books />} />
            <Route path='/jobs' element={<Jobs />} />
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
