import { useState, useRef } from 'react';
import { FcSettings } from 'react-icons/fc';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useUser } from '../contexts/authProvider';
import { useQuery } from 'react-query';
import { getUserByUsername, updateMe } from '../services/user';
import { UserProps } from '../types/User';
import Modal from '../components/Modal';
import Input from '../components/Input';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../components/Button';
import { getProjectsByUserId } from '../services/projects';
import { ProjectProps } from '../types/Project';
import ProjectCard from '../components/ProjectCard';
import { createFollowNotification, createLikeNotification } from '../services/notifications';

function Profile() {
  const [pageUser, setPageUser] = useState<UserProps | null>(null);
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [open, setOpen] = useState(false);
  const bioRef = useRef<HTMLInputElement | null>(null);
  const { username } = useParams();
  const { user } = useUser();

  const { isLoading: loadingUser, error: errorUser } = useQuery(
    ['user', username],
    () => getUserByUsername(username!),
    {
      onSuccess: (data: UserProps) => {
        setPageUser(data);
      },
    }
  );
  const { isLoading: loadingProjects, error: errorProjects } = useQuery(
    ['projects', pageUser?._id],
    () => getProjectsByUserId(pageUser?._id!),
    {
      onSuccess: (data: ProjectProps[]) => {
        setProjects(data);
      },
    }
  );
  if (loadingUser) return <p>Loading...</p>;
  if (errorUser) return <p>Error fetching User</p>;

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('worked');

    try {
      console.log('here');
      await updateMe({
        username: user?.username!,
        bio: bioRef.current?.value!,
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const sendFollowNotification = async () => {
    try {
      await createLikeNotification({
        userId: user?._id!,
        receiverUsername: pageUser?.username!,
        challengeId: projects[0]?.challenge!,
        projectId: projects[0]._id
      });
      toast.success('Follow notification sent');
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-8 items-center justify-center p-8">
      <>
        <Toaster />
        <Modal open={open} onClose={() => setOpen(false)}>
          <form onSubmit={(e) => handleModalSubmit(e)}>
            <Input type="text" label="Bio" ref={bioRef} />
            <Button type="submit">Submit</Button>
          </form>
        </Modal>
        <div className="card relative flex flex-col rounded-xl justify-center items-center text-center bg-secondary md:w-[700px] w-5/6 text-slate-200 p-8 shadow-md shadow-primary">
          {user?.username === pageUser?.username && (
            <FcSettings
              onClick={() => setOpen(true)}
              className="absolute top-2 right-2 text-2xl cursor-pointer"
            />
          )}
          <div className="w-max">
            {pageUser?.avatar ? (
              <img
                src={pageUser?.avatar}
                alt={pageUser?.username}
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
            {pageUser?.username}{' '}
            <span className="font-light text-sm">(23)</span>
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

            <Button onClick={sendFollowNotification}>Follow</Button>
          </div>

          <div className="p-4">
            {pageUser?.bio ? (
              <p className="text-lg font-regular">{pageUser.bio}</p>
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
          {errorProjects ? 'Error fetching projects' : 'Projects'}
        </h1>
        <div className="flex flex-col gap-4 w-full h-full items-center justify-center">
          {loadingProjects && <p>Loading...</p>}

          {projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </>
    </div>
  );
}

export default Profile;
