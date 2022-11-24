import { useQuery } from 'react-query';
import Loading from '../../components/Loading';
import { getSuggestions } from '../../services/suggestions';

function AdminGetSuggestions() {
  const {
    isLoading,
    error,
    data: suggestions,
  } = useQuery('suggestions', getSuggestions);

  if (isLoading) return <Loading />;
  if (error) return <div>Something went wrong!</div>;
  return (
    <div>
      {suggestions.map((suggestion: { suggestion: string; _id: string }) => (
        <div key={suggestion._id}>
          <p>{suggestion.suggestion}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminGetSuggestions;
