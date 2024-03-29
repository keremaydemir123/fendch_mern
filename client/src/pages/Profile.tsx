import { useState } from 'react';
import { FcSettings } from 'react-icons/fc';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../contexts/UserProvider';
import { getUserByUsername, updateMe } from '../services/user';
import { ProjectProps, UserProps } from '../types';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Button from '../components/Button';
import ProjectCard from '../components/ProjectCard';
import Loading from '../components/Loading';
import { followUser, unfollowUser } from '../services/follows';

function Profile() {
  const [pageUser, setPageUser] = useState<UserProps | null>(null);
  const [projects, setProjects] = useState<ProjectProps[] | null>([]);
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState<string>(user?.bio || '');
  const [linkedin, setLinkedin] = useState(user?.linkedin || '');
  const [job, setJob] = useState(user?.job || '');
  const { username } = useParams();

  const { isLoading: loadingUser, error: errorUser } = useQuery(
    ['user', username],
    () => getUserByUsername(username as string),
    {
      onSuccess: (data) => {
        setPageUser(data.user);
        setProjects(data.projects);
      },
    }
  );

  if (loadingUser) return <Loading />;
  if (errorUser) return <p>Error fetching User</p>;

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.username) {
      toast.error('You must be logged in to update your profile');
      return;
    }
    try {
      await updateMe({
        username: user?.username,
        bio,
        linkedin,
        job,
      });
      toast.success('Profile updated successfully');
      setOpen(false);
      setPageUser((prev) => ({ ...(prev as UserProps), bio, linkedin, job }));
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const onFollowUser = async () => {
    if (!user?._id) {
      toast.error('You must be logged in to follow a user');
      return;
    }
    try {
      await followUser({
        followerId: user?._id,
        username: pageUser?.username as string,
      });
      toast.success('Successfully followed user');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const onUnfollowUser = async () => {
    if (!user?._id) {
      toast.error('You must be logged in to unfollow a user');
      return;
    }
    try {
      await unfollowUser({
        followerId: user?._id,
        username: pageUser?.username as string,
      });
      toast.success('Successfully unfollowed user');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  console.log('pageUser', pageUser);

  return (
    <div className="flex flex-col gap-8 items-center justify-center">
      <Toaster />
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={(e) => handleModalSubmit(e)}
          className="flex flex-col gap-4"
        >
          <Input
            type="text"
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Input
            type="text"
            label="Linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
          />
          <Input
            type="text"
            label="Current Job"
            value={job}
            onChange={(e) => setJob(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Modal>
      <div className="card relative flex flex-col rounded-xl justify-center items-center text-center bg-secondary w-full text-light p-8 shadow-md shadow-primary">
        {user?.username === pageUser?.username && (
          <FcSettings
            onClick={() => setOpen(true)}
            className="absolute top-2 right-2 text-2xl cursor-pointer"
          />
        )}
        <div className="flex w-full items-center justify-center border-b-2 border-primary pb-4 h-96">
          <div className="w-3/5 flex flex-col items-center justify-center">
            {pageUser?.avatar ? (
              <img
                src={pageUser?.avatar}
                alt={pageUser?.username}
                className="rounded-full w-64 h-64 object-cover my-4"
              />
            ) : (
              <div className="rounded-full w-64 h-64 bg-light my-4" />
            )}
            <h1 className="text-2xl font-semibold flex items-center gap-2">
              {pageUser?.username}
            </h1>
          </div>

          <div className="relative flex flex-col items-start justify-center font-regular text-lg w-2/5 mt-4 h-full">
            <h3>Projects: {projects?.length}</h3>
            <h3>Comments: {pageUser?.comments?.length}</h3>
            <h3>Followers: {pageUser?.followers?.length}</h3>
            <h3>Following: {pageUser?.following?.length}</h3>

            <div className=" flex justify-center gap-2 text-2xl absolute bottom-4">
              {pageUser?.linkedin && (
                <a href={pageUser.linkedin}>
                  <FaLinkedin fill="#eee" />
                </a>
              )}
              <a href={pageUser?.profileUrl} target="_blank" rel="noreferrer">
                <FaGithub fill="#eee" />
              </a>
            </div>
          </div>

          {user?.username !== pageUser?.username && (
            <div className="absolute top-4 right-4">
              {pageUser?.followers?.includes(user?._id as string) ? (
                <Button onClick={onUnfollowUser}>Unfollow</Button>
              ) : (
                <Button onClick={onFollowUser}>Follow</Button>
              )}
            </div>
          )}
        </div>

        <div className="p-4">
          {pageUser?.bio ? (
            <p className="text-lg font-regular">{pageUser.bio}</p>
          ) : (
            <p>No description</p>
          )}
        </div>
      </div>

      <h1>Projects</h1>

      <div className="flex flex-wrap w-full h-full items-center gap-4 justify-center">
        {projects?.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default Profile;
