import { FcSettings } from 'react-icons/fc';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useUser } from '../contexts/authProvider';

function Profile() {
  const { user } = useUser();
  const { username } = useParams();

  return (
    <div className="flex flex-col gap-8 items-center justify-center p-8">
      <div className="card relative flex flex-col rounded-xl justify-center items-center text-center bg-secondary md:w-[700px] w-5/6 text-slate-200 p-8 shadow-md shadow-primary">
        {user?.username === username && (
          <FcSettings className="absolute top-2 right-2 text-2xl cursor-pointer" />
        )}
        <div className="w-max">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.username}
              className="rounded-full w-64 h-64 object-cover my-4"
            />
          ) : (
            <img
              src="../../kerem2.jpeg"
              alt="kerem2"
              className="w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          {user?.username} <span className="font-light text-sm">(23)</span>
        </h1>

        <div className="flex justify-between font-regular text-lg w-full mt-4 px-6 border-b-2 border-slate-400">
          <div className="flex flex-col">
            <h1 className="font-semibold">16</h1>
            <h1 className="">Projexts</h1>
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold">16</h1>
            <h1 className="">Comments</h1>
          </div>

          <div className="flex flex-col">
            <h1 className="font-semibold">16</h1>
            <h1 className="">Likes</h1>
          </div>
        </div>

        <div className="p-4">
          {user?.bio ? (
            <p className="text-lg font-regular">{user.bio}</p>
          ) : (
            <p>No description</p>
          )}
        </div>

        <div className=" flex justify-center gap-2 text-2xl">
          <FaLinkedin fill="#eee" />
          <FaGithub fill="#eee" />
        </div>
      </div>
      <h1 className="text-2xl text-center border-b-2 p-4 text-blue-50">
        Projects
      </h1>
      <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
        PROJECTS.MAP
      </div>
    </div>
  );
}

export default Profile;
