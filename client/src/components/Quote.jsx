import React from 'react';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

function Quote() {
  return (
    <div className="w-96 shadow-lg shadow-dark bg-primary rounded-lg p-4 ">
      <FaQuoteLeft className="text-tahiti" />
      <p>
        The <strong className="text-silver">best</strong> way to learn{' '}
        <strong className="text-silver">frontend</strong> development is through{' '}
        <strong>practice</strong> and{' '}
        <strong className="text-silver">repetition</strong>. By actively
        building and experimenting with code, you can hone your skills and{' '}
        <strong className="text-silver">truly understand</strong> how to bring
        your ideas to life on the web.
      </p>
      <div className="flex w-full justify-between">
        <strong className="text-tahiti italic">- ChatGPT</strong>
        <FaQuoteRight className="text-tahiti " />
      </div>
    </div>
  );
}

export default Quote;
