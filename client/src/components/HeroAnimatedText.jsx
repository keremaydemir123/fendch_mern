import { TypeAnimation } from 'react-type-animation';
import GradientTitle from './GradientTitle';

function HeroAnimatedText() {
  return (
    <div className="flex flex-col gap-2 w-full text-center">
      <h1 className="text-silver opacity-90 text-5xl">
        <strong className="underline">Learn</strong> frontend development by
      </h1>
      <GradientTitle className="text-4xl mb-4">
        <TypeAnimation
          sequence={[
            'Building Projects', // Deletes 'One' and types 'Two'
            1000, // Waits 2s
            "Checking Other's Code",
            1000, // Types 'Three' without deleting 'Two'
            'Getting Feedback',
            1000,
          ]}
          wrapper="div"
          cursor
          repeat={Infinity}
        />
      </GradientTitle>
    </div>
  );
}

export default HeroAnimatedText;
