import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ChallengeDetails from './pages/ChallengeDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Challenges from './pages/Challenges';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import { useUser } from './contexts/UserProvider';
import Admin from './pages/Admin/Admin';
import AdminUsers from './pages/Admin/AdminUsers';
import AdminSecretChallenges from './pages/Admin/AdminSecretChallenges';
import AdminOldChallenges from './pages/Admin/AdminOldChallenges';
import AdminActiveChallenges from './pages/Admin/AdminActiveChallenges';
import AdminCreateChallenge from './pages/Admin/AdminCreateChallenge';
import AdminChallengeEdit from './pages/Admin/AdminChallengeEdit';
import Footer from './components/Footer';
import { ChallengeProvider } from './contexts/ChallengeProvider';
import { ProjectProvider } from './contexts/ProjectProvider';
import AboutUs from './pages/AboutUs';
import AdminGetSuggestions from './pages/Admin/AdminGetSuggestions';
import SolutionList from './pages/SolutionList';
import Solution from './pages/Solution';
import { CommentProvider } from './contexts/CommentProvider';

function App() {
  const { user } = useUser();

  return (
    <div className="App bg-gradient-to-t from-[#112] to-dark text-light min-h-screen">
      <Navbar user={user} />
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/challenges" element={<Challenges />} />
          <Route
            path="/challenges/:id"
            element={
              <ChallengeProvider>
                <CommentProvider>
                  <ChallengeDetails />
                </CommentProvider>
              </ChallengeProvider>
            }
          />
          <Route path="/solutions" element={<SolutionList />} />
          <Route path="/solutions/:id" element={<Solution />} />

          <Route path="/projects" element={<Projects />} />
          <Route
            path="/projects/:id"
            element={
              <ProjectProvider>
                <CommentProvider>
                  <ProjectDetails />
                </CommentProvider>
              </ProjectProvider>
            }
          />

          <Route path="/profile/:username" element={<Profile />} />

          <Route path="/admin" element={<Admin />}>
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route
              path="/admin/suggestions"
              element={<AdminGetSuggestions />}
            />
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
      <Footer />
    </div>
  );
}

export default App;
