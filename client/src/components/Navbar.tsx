import { Link } from 'react-router-dom';

function Navbar({ user }: { user: any }) {
  const loginWithGithub = () => {
    window.open('http://localhost:4000/auth/github', '_self');
  };

  console.log(user);

  return (
    <nav className="h-16 flex items-center px-16 border-b-2 border-primary">
      <ul className="flex gap-8 items-center">
        <li>
          <h1>FENDCH</h1>
        </li>
        <li>
          <Link to="/challenges">Challenges</Link>
        </li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to={`/profile/${user.displayName}`}>Profile</Link>
            </li>
            <img
              src={user.photos[0].value}
              alt="user"
              className="w-8 h-8 rounded-full object-cover"
            />
            <h3>{user.displayName}</h3>
          </>
        ) : (
          <li>
            <button type="button" onClick={loginWithGithub}>
              Login with Github
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
