import React from "react";
import { useState } from "react";
import { useUser } from "../../contexts/UserProvider";
import Button from "../Button";

function CommentForm({
  loading,
  error,
  autoFocus = false,
  onSubmit,
  initialValue = "",
}) {
  const [message, setMessage] = useState(initialValue);
  const { user } = useUser();

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(message).then(() => setMessage(""));
  }

  return (
    <form onSubmit={handleSubmit} className="w-full h-[50px] items-center my-4">
      <div className="flex h-full gap-2">
        <textarea
          autoFocus={autoFocus}
          className="flex-grow resize-none h-full rounded-lg p-2 outline-none text-blue-900 shadow-md bg-blue-50 leading-8"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            !user ? "please login to send a comment" : "Write a comment"
          }
          disabled={!user || loading}
        />
        <Button className="btn" disabled={!user || loading} type="submit">
          {loading ? "Loading" : "Post"}
        </Button>
      </div>
      <div className="error-msg">{error}</div>
    </form>
  );
}

export default CommentForm;
