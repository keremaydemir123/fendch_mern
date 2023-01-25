import { FaLinkedin, FaDiscord, FaYoutube, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Socials() {
  const circleClasses =
    'flex justify-center items-center rounded-full w-10 h-10';
  const iconStyles = { color: 'white', fontSize: '1.2rem' };
  return (
    <div className="sm:flex hidden gap-2">
      <Link to="/" className={circleClasses} style={{ background: '#0072b1' }}>
        <FaLinkedin style={iconStyles} />
      </Link>
      <Link to="/" className={circleClasses} style={{ background: '#7289DA' }}>
        <FaDiscord style={iconStyles} />
      </Link>
      <Link to="/" className={circleClasses} style={{ background: '#FE0100' }}>
        <FaYoutube style={iconStyles} />
      </Link>
      <Link to="/" className={circleClasses} style={{ background: '#0088cc' }}>
        <FaTelegram style={iconStyles} />
      </Link>
    </div>
  );
}

export default Socials;
