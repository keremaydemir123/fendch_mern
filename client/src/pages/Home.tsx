import { useUser } from '../contexts/authProvider';

function Home() {
  const { user } = useUser();

  return <div>{user?.displayName}</div>;
}

export default Home;
