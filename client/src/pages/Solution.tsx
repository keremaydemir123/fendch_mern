import React from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/Button';
import MarkdownTest from '../components/MarkdownTest';
import { getChallenge } from '../services/challenges';

function Solution() {
  const { id } = useParams();
  const {
    isLoading,
    error,
    data: challenge,
  } = useQuery('getSolutions', () => getChallenge(id!));

  console.log(challenge?.tags);

  return (
    <div>
      <div className="bg-secondary rounded-md p-4">
        <h1>{challenge?.tech}</h1>
        <h2>{challenge?.objective}</h2>
        <img src={challenge?.thumbnail} alt="tumbnail" width={500} />
        <div className="p-2 bg-dark rounded-md">
          <MarkdownTest markdown={challenge?.solutionMd} />
        </div>
      </div>
    </div>
  );
}

export default Solution;
