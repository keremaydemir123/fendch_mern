import { useState } from 'react';
import { useQuery } from 'react-query';
import { Toaster, toast } from 'react-hot-toast';
import ChallengeCard from '../components/ChallengeCard';
import { getActiveChallenges } from '../services/challenges';
import Loading from '../components/Loading';
import { ChallengeProps } from '../types';
import GradientTitle from '../components/GradientTitle';
import Quote from '../components/Quote';
import HeroAnimatedText from '../components/HeroAnimatedText';
import TextArea from '../components/Textarea';
import Button from '../components/Button';
import { useUser } from '../contexts/UserProvider';
import { sendSuggestion } from '../services/suggestions';
import TopProjects from '../components/TopProjects';
import TopUsers from '../components/TopUsers';

function Home() {
  const [suggestionText, setSuggestionText] = useState('');
  const { user } = useUser();
  const {
    isLoading,
    error,
    data: activeChallenges,
  } = useQuery('activeChallenges', getActiveChallenges);

  const handleSuggestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('You must be logged in to give us feedback');
      return;
    }
    try {
      await sendSuggestion({
        suggestion: suggestionText,
        username: user.username as string,
      });
      toast.success('Thanks for your suggestion');
      setSuggestionText('');
    } catch (error) {
      toast.error("Couldn't send your suggestion");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <div>Error...</div>;
  if (!activeChallenges) return <div>No active challenges</div>;

  return (
    <>
      <Toaster />
      <div className="flex w-full flex-col justify-center items-center gap-4">
        <HeroAnimatedText />

        {activeChallenges.map((challenge: ChallengeProps) => (
          <ChallengeCard key={challenge?._id} challenge={challenge} />
        ))}
        <GradientTitle className="uppercase my-4 p-2 border-b-2 border-purple">
          Best way to learn frontend
        </GradientTitle>

        <div className="flex flex-wrap gap-6 w-full justify-center p-4">
          <Quote />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-2">
          <TopProjects />
          <TopUsers />
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <GradientTitle className="uppercase my-4 p-2 border-b-2 border-purple">
            Give Us Feedback
          </GradientTitle>
          <form className="w-full" onSubmit={handleSuggestion}>
            <TextArea
              className="w-full h-64"
              onChange={(e) => setSuggestionText(e.target.value)}
              value={suggestionText}
            />
            <div className="w-full flex items-center justify-end">
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Home;
