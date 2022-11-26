import { useRef } from 'react';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import { sendSuggestion } from '../services/suggestions';
import toast, { Toaster } from 'react-hot-toast';

function AboutUs() {
  const suggestionRef = useRef<HTMLTextAreaElement>(null);

  async function onSendSuggestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await sendSuggestion(suggestionRef.current!.value);
      toast.success('Your suggestion has been sent! Thank you!');
    } catch (error) {
      toast.error('Something went wrong! Please try again later.');
    }
  }

  return (
    <div className="wrapper">
      <Toaster />
      <h1>Selam ben Kerem</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ea
        nesciunt porro eius. Maiores doloremque quis praesentium nisi illum,
        sapiente sit velit, culpa dolore optio libero ratione possimus pariatur
        quam!
      </p>
      <h1>Selam ben Turhan</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus ea
        nesciunt porro eius. Maiores doloremque quis praesentium nisi illum,
        sapiente sit velit, culpa dolore optio libero ratione possimus pariatur
        quam!
      </p>
      <h1 className="mt-4">
        If you have any suggestion feel free to write us!
      </h1>
      <form onSubmit={onSendSuggestion}>
        <Textarea ref={suggestionRef} className="w-full" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}

export default AboutUs;
