import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaGithub, FaTimes } from 'react-icons/fa';
import Button from './Button';
import CustomLink from './CustomLink';
import { UserProps } from '../types';
import GradientTitle from './GradientTitle';

function Navbar({ user }: { user: UserProps | null }) {
  const [open, setOpen] = useState(false);

  const loginWithGithub = () => {
    window.open('http://localhost:4000/auth/github', '_self');
  };

  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      document.querySelector('.navbar')?.classList.remove('bg-transparent');
      document.querySelector('.navbar')?.classList.add('bg-primary');
    } else {
      document.querySelector('.navbar')?.classList.add('bg-transparent');
      document.querySelector('.navbar')?.classList.remove('bg-primary');
    }
  });

  return (
    <nav className="navbar h-16 w-full sticky top-0 z-50 flex items-center px-16">
      <div className="container h-full max-w-7xl flex gap-8 items-center justify-between w-full text-light tracking-wide font-semibold">
        <div className=" flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            <GradientTitle>FENDCH</GradientTitle>
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
            <Button
              type="button"
              onClick={loginWithGithub}
              className="flex items-center gap-2"
            >
              Login with Github
              <FaGithub className="text-lg" />
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
          <div className="flex flex-col gap-4 w-64">
            <Link to="/" className="border-b-2 p-2 border-light-gray">
              <h1>FENDCH</h1>
            </Link>
            {user ? (
              <div className="flex items-center gap-2 p-2">
                <img
                  src={user.avatar}
                  alt="user"
                  className="rounded-full w-8 h-8"
                />
                <Link
                  to={`/profile/${user.username}`}
                  onClick={() => setOpen(false)}
                >
                  {user.username}
                </Link>
              </div>
            ) : (
              <Button type="button" onClick={loginWithGithub}>
                Login with Github
              </Button>
            )}
            <Link
              className="hover:bg-purple p-2"
              to="/challenges"
              onClick={() => setOpen(false)}
            >
              Challenges
            </Link>
            <Link
              className="hover:bg-purple p-2"
              to="/projects"
              onClick={() => setOpen(false)}
            >
              Projects
            </Link>
            <Link
              className="hover:bg-purple p-2"
              to="/solutions"
              onClick={() => setOpen(false)}
            >
              Solutions
            </Link>
          </div>
          <FaTimes
            onClick={() => setOpen(false)}
            className="absolute top-8 right-8 text-3xl hover:opacity-80 hover:cursor-pointer"
          >
            Close
          </FaTimes>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
