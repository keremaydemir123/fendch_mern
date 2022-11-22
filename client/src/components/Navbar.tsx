import { Link } from 'react-router-dom';
import Button from './Button';
import CustomLink from './CustomLink';
import { User } from '../contexts/UserProvider';
import Badge from './Badge';

function Navbar({ user }: { user: User }) {
  const loginWithGithub = () => {
    window.open('http://localhost:4000/auth/github', '_self');
  };

  return (
    <nav className="h-16 flex items-center px-16 border-b-2 border-primary">
      <div className="flex gap-8 items-center justify-between w-full">
        <div className="left flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            FENDCH
          </Link>
          <Link to="/challenges">Challenges</Link>
          <Link to="/projects">Projects</Link>
        </div>
        <div className="right flex items-center gap-4">
          {user ? (
            <>
              <Badge />
              <Link to={`/profile/${user.username}`}>{user.username}</Link>
              <img
                src={user.avatar}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
              {user.role === 'admin' && (
                <CustomLink to="/admin">Admin</CustomLink>
              )}
            </>
          ) : (
            <Button type="button" onClick={loginWithGithub}>
              Login with Github
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
