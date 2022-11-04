import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChallengeDetails from './pages/ChallengeDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Challenges from './pages/Challenges';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { useUser } from './contexts/authProvider';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { user, setUser } = useUser();

  useEffect(() => {
    const getUser = () => {
      fetch('http://localhost:4000/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('authentication has been failed!');
        })
        .then((resObject) => {
          setUser(resObject.user);
          toast.success('Welcome back!');
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div className="App bg-dark text-light min-h-screen">
      <Navbar user={user} />
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetails />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/profile/:username" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
