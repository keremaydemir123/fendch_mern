import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ChallengeDetails from './pages/ChallengeDetails';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Challenges from './pages/Challenges';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="bg-dark text-light min-h-screen">
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/challenges" element={<Challenges />} />
          <Route path="/challenges/:id" element={<ChallengeDetails />} />

          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />

          <Route path="/profile/:username" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </div>
  );
}

export default App;
