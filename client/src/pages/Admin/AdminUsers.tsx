import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { getUsers } from '../../services/admin';
import { UserProps } from '../../types';

function AdminUsers() {
  const { isLoading, error, data: users } = useQuery('users', getUsers);

  if (isLoading) return <Loading />;
  if (error) return <div>Something went wrong...</div>;

  return (
    <div className="bg-primary text-light px-4 py-2">
      <div className=" flex justify-between items-center border-b-4 border-secondary">
        <h1 className="underline">Users</h1>
        <h3>Total Users: {users?.length}</h3>
      </div>
      <div className=" bg-secondary mt-4">
        {users?.map((user: UserProps) => (
          <div
            key={user.githubId}
            className="p-2 bg-dark flex justify-between items-center rounded-md"
          >
            <p>
              username:
              <Link to={`/profile/${user.username}`}> {user.username}</Link>
            </p>
            <p>projects: 0</p>
            <Button type="button" className="border-red">
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminUsers;
