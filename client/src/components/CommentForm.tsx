import React, { useState } from 'react';

import { useUser } from '../contexts/UserProvider';
import Button from './Button';

type CommentFormProps = {
  onSubmit: (message: string) => Promise<void>;
  loading: boolean;
  error: string;
  autoFocus?: boolean;
  initialValue?: string;
};

function CommentForm({
  loading,
  error,
  autoFocus,
  onSubmit,
  initialValue = '',
}: CommentFormProps) {
  const [message, setMessage] = useState<string>(initialValue);
  const { user } = useUser();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (message?.trim() !== '') onSubmit(message).then(() => setMessage(''));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full h-[50px] items-center my-4">
      <div className="flex h-full gap-2">
        <textarea
          autoFocus={autoFocus}
          className="flex-grow resize-none h-full rounded-lg p-2 outline-none text-dark bg-light font-medium leading-8 shadow-md shadow-dark"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            !user ? 'please login to send a comment' : 'Write a comment'
          }
          disabled={!user || loading}
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Loading' : 'Post'}
        </Button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
}

CommentForm.defaultProps = {
  autoFocus: false,
  initialValue: '',
};

export default CommentForm;
