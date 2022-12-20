import { useQuery } from 'react-query';
import ChallengeCard from '../../components/ChallengeCard';
import CustomLink from '../../components/CustomLink';
import Loading from '../../components/Loading';
import { getSecretChallenges } from '../../services/admin';
import { ChallengeProps } from '../../types/Challenge';

function AdminSecretChallenges() {
  const {
    isLoading,
    error,
    data: secretChallenges,
  } = useQuery('secretChallenges', getSecretChallenges);

  if (isLoading) return <Loading />;
  if (error) return <div>Error...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-center flex-wrap gap-6">
        {secretChallenges?.map((challenge: ChallengeProps) => {
          return (
            <div
              key={challenge?._id}
              className="flex flex-col gap-2 w-max items-center"
            >
              <ChallengeCard challenge={challenge} />
              <CustomLink
                to={`${challenge?._id}/edit`}
                className=" border-blue w-16 text-center text-lg font-semibold border-2"
              >
                Edit
              </CustomLink>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminSecretChallenges;
