import { createContext, useContext, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getChallenge } from '../services/challenges';
import Loading from '../components/Loading';
import { ChallengeProps } from '../types';

interface IChallengeContext {
  challenge: ChallengeProps | undefined;
}

const Context = createContext<IChallengeContext>({} as IChallengeContext);

export function useChallenge() {
  return useContext(Context);
}

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const [challenge, setChallenge] = useState<ChallengeProps>();

  const { isLoading } = useQuery(['getChallenge', id], () => getChallenge(id), {
    onSuccess: (data) => {
      setChallenge(data);
    },
  });

  const contextValues = useMemo(
    () => ({
      challenge,
    }),
    [challenge]
  );

  return (
    <Context.Provider value={contextValues}>
      <>
        {isLoading && <Loading />}
        {children}
      </>
    </Context.Provider>
  );
}
