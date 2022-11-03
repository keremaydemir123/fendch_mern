import { Link } from 'react-router-dom';

function Navbar({ user }: { user: any }) {
  const loginWithGithub = () => {
    window.open('http://localhost:4000/auth/github', '_self');
  };

  console.log(user);

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
              <Link to={`/profile/${user.username}`}>{user.username}</Link>
              <img
                src={user.photos[0].value}
                alt="user"
                className="w-8 h-8 rounded-full object-cover"
              />
            </>
          ) : (
            <li>
              <button type="button" onClick={loginWithGithub}>
                Login with Github
              </button>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
