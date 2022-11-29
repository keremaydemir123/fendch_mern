import { FaLinkedin, FaDiscord, FaYoutube, FaTelegram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Socials() {
  const circleClasses = 'inline-block p-3 rounded-full w-12 mx-auto';
  const iconStyles = { color: 'white', fontSize: '1.5rem' };
  return (
    <div className="flex flex-col gap-2 item-center justify-start h-full">
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className={circleClasses}
          style={{ background: '#0072b1' }}
        >
          <FaLinkedin style={iconStyles} />
        </Link>
        <Link to="/" className="md:block hidden w-full">
          Linkedin
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className={circleClasses}
          style={{ background: '#7289DA' }}
        >
          <FaDiscord style={iconStyles} />
        </Link>
        <Link to="/" className="md:block hidden w-full">
          Discord
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className={circleClasses}
          style={{ background: '#FE0100' }}
        >
          <FaYoutube style={iconStyles} />
        </Link>
        <Link to="/" className="md:block hidden w-full">
          Youtube
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/"
          className={circleClasses}
          style={{ background: '#0088cc' }}
        >
          <FaTelegram style={iconStyles} />
        </Link>
        <Link to="/" className="md:block hidden w-full">
          Telegram
        </Link>
      </div>
    </div>
  );
}

export default Socials;
