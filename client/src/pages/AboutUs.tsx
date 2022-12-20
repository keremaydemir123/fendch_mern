import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from '../components/Button';
import Textarea from '../components/Textarea';
import { sendSuggestion } from '../services/suggestions';
import BuyMeACoffeeButton from '../components/BuyMeCoffeeButton';

function AboutUs() {
  const suggestionRef = useRef<HTMLTextAreaElement>(null);

  async function onSendSuggestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!suggestionRef.current?.value) {
      toast.error('Please write your suggestion!');
      return;
    }
    try {
      await sendSuggestion(suggestionRef.current?.value);
      toast.success('Your suggestion has been sent! Thank you!');
    } catch (error) {
      toast.error('Something went wrong! Please try again later.');
    }
  }

  return (
    <div>
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
      <BuyMeACoffeeButton />
    </div>
  );
}

export default AboutUs;
