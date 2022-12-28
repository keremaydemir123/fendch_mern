import { useState, useEffect } from 'react';

function ChallengeTimeLeft() {
  // make a function that calculates the time left from now to sunday 23:59:59 and render every second

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const today = new Date();
  // sunday 23:59:59 as date
  const sunday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + ((8 - today.getDay()) % 7),
    23,
    59,
    59
  );

  const deadline = sunday;

  const getTime = (deadline: string) => {
    const time = Date.parse(deadline) - Date.now();

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
    setMinutes(Math.floor((time / 1000 / 60) % 60));
    setSeconds(Math.floor((time / 1000) % 60));
  };

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline.toDateString()), 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  return (
    <div className="flex flex-wrap gap-2 items-center shadow-lg shadow-dark">
      <div className="flex flex-col items-center justify-center p-2 bg-light bg-opacity-5 md:w-28">
        <h2 className="text-tahiti">{days}</h2>
        <h4 className="text-light">Days</h4>
      </div>
      <div className="flex flex-col items-center justify-center p-2 bg-light bg-opacity-5 md:w-28">
        <h2 className="text-tahiti">{hours}</h2>
        <h4 className="text-light">Hours</h4>
      </div>
      <div className="flex flex-col items-center justify-center p-2 bg-light bg-opacity-5 md:w-28">
        <h2 className="text-tahiti">{minutes}</h2>
        <h4 className="text-light">Minutes</h4>
      </div>
      <div className="flex flex-col items-center justify-center p-2 bg-light bg-opacity-5 md:w-28">
        <h2 className="text-tahiti">{seconds}</h2>
        <h4 className="text-light">Seconds</h4>
      </div>
    </div>
  );
}

export default ChallengeTimeLeft;
