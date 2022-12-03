import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import Button from './Button';
import CustomLink from './CustomLink';
import Badge from './Badge';
import { UserProps } from '../types';

function Navbar({ user }: { user: UserProps | null }) {
  const [open, setOpen] = useState(false);

  const loginWithGithub = () => {
    window.open('http://localhost:4000/auth/github', '_self');
  };

  return (
    <nav className="h-16 w-full sticky top-0 z-50 bg-dark flex items-center px-16 border-b-2 border-primary">
      <div className="container h-full max-w-7xl flex gap-8 items-center justify-between w-full">
        <div className=" flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            FENDCH
          </Link>
          <div className="md:flex hidden items-center gap-4">
            <Link to="/challenges">Challenges</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/solutions">Solutions</Link>
          </div>
        </div>
        <div className="md:flex hidden items-center gap-4">
          {user ? (
            <>
              <Badge />
              <Link to={`/profile/${user.username}`} className="lg:flex hidden">
                {user.username}
              </Link>
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
        <FaBars
          onClick={() => setOpen(true)}
          className="md:hidden flex text-light text-2xl hover:opacity-80 transition duration-150 cursor-pointer"
        />
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed top-0 left-0 w-full h-full bg-dark z-50 flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4">
            <Link to="/" className="border-b-2 border-light-gray">
              <h1>FENDCH</h1>
            </Link>
            <Link to="/challenges">Challenges</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/solutions">Solutions</Link>
            {user ? (
              <>
                <Link to={`/profile/${user.username}`}>{user.username}</Link>
                <img src={user.avatar} alt="user" className="rounded w-8 h-8" />
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
          <Button type="button" onClick={() => setOpen(false)} className="mt-4">
            Close
          </Button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
