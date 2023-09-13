import React, { useState } from 'react';
import { Combobox } from '@headlessui/react';

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
];

type PeopleProps = {
  id: number;
  name: string;
};

function MultipleSelect() {
  const [selectedPeople, setSelectedPeople] = useState<PeopleProps[]>([
    people[0],
    people[1],
  ]);

  return (
    <Combobox value={selectedPeople} onChange={setSelectedPeople} multiple>
      <Combobox.Input
        displayValue={(people) =>
          people.map((person) => person.name).join(', ')
        }
      />
      <Combobox.Options>
        {people.map((person) => (
          <Combobox.Option key={person.id} value={person}>
            {person.name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}

export default MultipleSelect;
