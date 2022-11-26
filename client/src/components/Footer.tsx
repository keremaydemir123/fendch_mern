import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="h-16 w-full flex justify-between px-16 items-center border-t-2 border-secondary">
      <h1 className="text-left">FENDCH</h1>
      <Link to="/about">About Us</Link>
    </div>
  );
}

export default Footer;
