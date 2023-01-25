import { Fragment, useState } from 'react';
import { useQuery } from 'react-query';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { getUsernames } from '../services/user';
import Loading from './Loading';

type User = {
  username: string;
  _id: string;
};

export default function UsersComboBox() {
  const [selected, setSelected] = useState<User>();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const { isLoading, error } = useQuery('usernames', () => getUsernames(), {
    onSuccess: (data) => {
      setUsers(data);
      setSelected(data[0]);
    },
  });

  const filteredChallenges =
    query === ''
      ? users
      : users.filter((user) =>
          user?.username
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <div className="absolute w-72 text-light">
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 h-16">
          <div className="relative w-full h-full cursor-default text-left sm:text-sm">
            <Combobox.Input
              className="w-full h-full border-2 border-dark py-2 pl-3 pr-10 text-sm leading-5 text-light bg-primary focus:ring-0"
              displayValue={(user: User) => user.username}
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
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-primary py-1 text-light shadow-lg ring-1 ring-dark ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredChallenges.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredChallenges.map((user) => (
                  <Combobox.Option
                    key={user._id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-purple text-light' : 'text-muted'
                      }`
                    }
                    value={user}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {user.username}
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
