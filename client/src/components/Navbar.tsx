import { Link } from 'react-router-dom';

function Navbar() {
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
      </ul>
    </nav>
  );
}

export default Navbar;
