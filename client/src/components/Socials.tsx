import { FaLinkedin, FaDiscord, FaYoutube, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Socials() {
  const circleClasses =
    'flex justify-center items-center rounded-full w-10 h-10';
  const iconStyles = { color: 'white', fontSize: '1.4rem' };
  return (
    <div className="fixed top-1/2 -translate-y-1/2 right-6 xl:flex flex-col hidden gap-2">
      <Link
        to="/"
        className={`${circleClasses} transition-all duration-200 hover:bg-purple hover:-translate-x-2`}
      >
        <FaLinkedin style={iconStyles} />
      </Link>
      <Link
        to="/"
        className={`${circleClasses} transition-all duration-200 hover:bg-purple hover:-translate-x-2`}
      >
        <FaDiscord style={iconStyles} />
      </Link>
      <Link
        to="/"
        className={`${circleClasses} transition-all duration-200 hover:bg-purple hover:-translate-x-2`}
      >
        <FaYoutube style={iconStyles} />
      </Link>
      <Link
        to="/"
        className={`${circleClasses} transition-all duration-200 hover:bg-purple hover:-translate-x-2`}
      >
        <FaTelegram style={iconStyles} />
      </Link>
    </div>
  );
}

export default Socials;
