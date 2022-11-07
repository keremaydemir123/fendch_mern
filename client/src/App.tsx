import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChallengeDetails from './pages/ChallengeDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Challenges from './pages/Challenges';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { useUser } from './contexts/authProvider';
import Admin from './pages/Admin/Admin';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminSecretChallenges from './pages/Admin/AdminSecretChallenges';
import AdminOldChallenges from './pages/Admin/AdminOldChallenges';
import AdminActiveChallenges from './pages/Admin/AdminActiveChallenges';
import AdminCreateChallenge from './pages/Admin/AdminCreateChallenge';
import AdminChallengeEdit from './pages/Admin/AdminChallengeEdit';

function App() {
  const { user, setUser } = useUser();
  const [session] = useState(
    document.cookie.split(';').find((c) => c == 'session')
  );

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
        .then((user) => {
          setUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, [session]);

  return (
    <div className="App bg-dark text-light min-h-screen">
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/challenges" element={<Challenges />} />
        <Route path="/challenges/:id" element={<ChallengeDetails />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />

        <Route path="/profile/:username" element={<Profile />} />

        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route
            path="/admin/create-challenge"
            element={<AdminCreateChallenge />}
          />
          <Route
            path="/admin/challenges/secret"
            element={<AdminSecretChallenges />}
          />
          <Route
            path="/admin/challenges/old"
            element={<AdminOldChallenges />}
          />
          <Route
            path="/admin/challenges/active"
            element={<AdminActiveChallenges />}
          />
          <Route
            path="/admin/challenges/secret/:id/edit"
            element={<AdminChallengeEdit />}
          />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
