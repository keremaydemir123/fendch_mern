import ChallengeCard from './ChallengeCard';
import { StoryFn } from '@storybook/react';

export default {
  title: 'Challenge Card',
  component: ChallengeCard,
  argTypes: {
    backgroundColor: { control: 'color', defaultValue: '#220707' },
    innerBorderColor: { control: 'color', defaultValue: '#16133a' },
    outerBorderColor: { control: 'color', defaultValue: '#1f267b' },
  },
};

// example video: https://www.youtube.com/watch?v=FUKpWgRyPlU
export const ChallengeCardTemplate: StoryFn<typeof ChallengeCard> = (args) => ( // eslint-disable-line  @typescript-eslint/no-unused-vars -- ignore unused args warning for now
  <ChallengeCard {...args} />
);

