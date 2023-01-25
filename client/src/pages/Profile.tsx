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
import TextButton from '../components/TextButton';

function Profile() {
  const [pageUser, setPageUser] = useState<UserProps | null>(null);
  const [projects, setProjects] = useState<ProjectProps[] | null>([]);
  const [likedProjects, setLikedProjects] = useState<ProjectProps[] | null>([]);
  const [selectedDisplay, setSelectedDisplay] = useState<
    'projects' | 'liked projects' | 'achievements'
  >('projects');
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
        setLikedProjects(data.likedProjects);
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

    if (!linkedin.match(/^(https?:\/\/)?(www\.)?linkedin\.com\/in\//)) {
      toast.error('Please enter a valid linkedin url');
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
      <div className="card relative flex flex-col rounded-xl justify-center items-center text-center bg-gradient-to-tr from-primary to-gray w-full text-light px-8 py-4 shadow-lg shadow-dark">
        {user?.username === pageUser?.username && (
          <FcSettings
            onClick={() => setOpen(true)}
            className="absolute top-2 right-2 text-2xl cursor-pointer"
          />
        )}
        <div className="flex w-full flex-wrap items-center justify-center border-b-2 border-primary pb-4 h-96">
          <div className="w-96 flex flex-col items-center justify-center">
            <div className="bg-red h-max my-4 relative rounded-full">
              {pageUser?.avatar ? (
                <img
                  src={pageUser?.avatar}
                  alt={pageUser?.username}
                  className="rounded-full md:w-56 md:h-56 w-32 h-32 object-cover"
                />
              ) : (
                <div className="rounded-full w-64 h-64 bg-light my-4" />
              )}
            </div>
            <h3 className="tracking-wider font-semibold flex items-center gap-2">
              {pageUser?.username}
            </h3>

            <div className="flex items-center justify-center w-max gap-3 font-semibold text-sm">
              <p className="flex flex-col items-center justify-center">
                <span className="text-xl text-purple font-bold">
                  {projects?.length}
                </span>
                Projects
              </p>
              <p className="flex flex-col items-center justify-center">
                <span className="text-xl text-purple font-bold">
                  {pageUser?.comments?.length}
                </span>
                Comments
              </p>
              <p className="flex flex-col items-center justify-center">
                <span className="text-xl text-purple font-bold">
                  {pageUser?.followers?.length}
                </span>
                Followers
              </p>
              <p className="flex flex-col items-center justify-center">
                <span className="text-xl text-purple font-bold">
                  {pageUser?.following?.length}
                </span>
                Following
              </p>
            </div>
            <div className=" flex justify-center gap-2 text-2xl my-2">
              {pageUser?.linkedin && (
                <a href={pageUser.linkedin} target="_blank" rel="noreferrer">
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

        <div className="p-4 w-full">
          {pageUser?.bio ? (
            <p className="text-lg font-regular w-full">{pageUser.bio}</p>
          ) : (
            <p>No description</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <TextButton
          className={`${
            selectedDisplay === 'liked projects'
              ? 'text-2xl p-2 !border-b-2 !border-purple font-bold'
              : ''
          } text-silver hover:cursor-pointer hover:text-light`}
          onClick={() => setSelectedDisplay('liked projects')}
        >
          Liked Projects
        </TextButton>
        <TextButton
          className={`${
            selectedDisplay === 'projects'
              ? 'text-2xl p-2 !border-b-2 !border-purple font-bold'
              : ''
          } text-silver hover:cursor-pointer hover:text-light`}
          onClick={() => setSelectedDisplay('projects')}
        >
          Projects
        </TextButton>
        <TextButton
          className={`${
            selectedDisplay === 'achievements'
              ? 'text-2xl p-2 !border-b-2 !border-purple font-bold'
              : ''
          } text-silver hover:cursor-pointer hover:text-light`}
          onClick={() => setSelectedDisplay('achievements')}
        >
          Achievements
        </TextButton>
      </div>
      {selectedDisplay === 'projects' && (
        <div className="flex flex-wrap w-full h-full items-center gap-6 justify-center">
          {projects?.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
      {selectedDisplay === 'achievements' && (
        <div className="flex flex-wrap w-full h-full items-center gap-6 justify-center">
          <h1>In Development...</h1>
        </div>
      )}
      {selectedDisplay === 'liked projects' && (
        <div className="flex flex-wrap w-full h-full items-center gap-6 justify-center">
          {likedProjects?.map((project) => {
            return <ProjectCard key={project._id} project={project} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Profile;
