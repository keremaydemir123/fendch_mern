import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { getOldChallengesNames } from '../services/challenges';
import Loading from './Loading';

type Challenge = {
  objective: string;
  _id: string;
};

export default function ChallengeComboBox({
  handleChange,
}: {
  handleChange: any;
}) {
  const [selected, setSelected] = useState<Challenge>();
  const [query, setQuery] = useState('');
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  const { isLoading, error } = useQuery(
    'oldChallenges',
    () => getOldChallengesNames(),
    {
      onSuccess: (data) => {
        setChallenges(data);
        setSelected(data[0]);
      },
    }
  );

  const filteredChallenges =
    query === ''
      ? challenges
      : challenges.filter((challenge) =>
          challenge?.objective
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const handleSelect = (value: { _id: string; objective: string }) => {
    setSelected(value);
    handleChange(value._id);
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <div className="relative w-72 text-light outline-none">
      <Combobox value={selected} onChange={handleSelect}>
        <div className="relative mt-1 h-16">
          <div className="relative w-full h-full cursor-default outline-none text-left sm:text-sm">
            <Combobox.Input
              className="w-full h-full rounded-md border-2 border-dark py-2 pl-3 pr-10 text-sm leading-5 text-light bg-primary"
              displayValue={(challenge: Challenge) => challenge.objective}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute top-full mt-1 max-h-60 w-full overflow-auto rounded-md outline-none border-none bg-primary py-1 text-base shadow-lg sm:text-sm">
              {filteredChallenges.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredChallenges.map((challenge) => (
                  <Combobox.Option
                    key={challenge._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-purple text-light' : 'text-muted'
                      }`
                    }
                    value={challenge}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {challenge.objective}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
