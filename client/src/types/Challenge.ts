export type ChallengeProps = {
  _id?: string;
  isActive?: boolean;
  tech: string;
  description: string;
  tags: string[];
  tasks: string[];
  week: number;
  startDate: string;
  objective: string;
  liveExample: string;
};
