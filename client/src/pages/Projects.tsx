import { useEffect, useState, useCallback } from 'react';
import { MdViewList, MdViewWeek } from 'react-icons/md';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import ChallengeComboBox from '../components/ChallengeComboBox';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import ProjectList from '../components/ProjectList';
import { Select, SelectOption } from '../components/Select';
import TextButton from '../components/TextButton';
import { getProjects } from '../services/projects';
import Button from '../components/Button';
import { ProjectProps } from '../types';

const selectOptions = [
  { label: 'All', value: 'all' },
  { label: 'React', value: 'react' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'Tailwind', value: 'tailwind' },
  { label: 'Angular', value: 'angular' },
  { label: 'Vue', value: 'vue' },
  { label: 'Redux', value: 'redux' },
];

function Projects() {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [selectedTags, setSelectedTags] = useState<SelectOption[]>([
    selectOptions[0],
  ]);
  const [selectedChallenge, setSelectedChallenge] = useState<string>('All');
  const [page, setPage] = useState(1);
  const [layout, setLayout] = useState<'default' | 'list'>('default');
  const [isFilterTabOpen, setIsFilterTabOpen] = useState(false);

  const { isLoading, error, data } = useQuery(
    'projects',
    () => getProjects('page=1&tech=all&challenge=all'),
    {
      onSuccess: (data) => {
        setProjects(data.projects);
        console.log(data.projects);
      },
    }
  );

  const fetchProjects = async (str: string) => {
    try {
      const projects = await getProjects(str);
      setProjects(projects);
    } catch (error) {
      console.log(error);
    }
  };

  const filterProjects = async () => {
    let str;
    const tags = selectedTags.map((tech) => tech.label).join(',');
    if (tags.length < 1) str = `page=${page}`;
    else str = `page=${page}&tags=${tags}&challenge=${selectedChallenge}`;
    fetchProjects(str);
  };

  const handleFilterToggle = () => {
    setIsFilterTabOpen(!isFilterTabOpen);
  };

  const handleChallengeSelect = (challengeId: string) => {
    setSelectedChallenge(challengeId);
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  return (
    <div className="flex flex-col h-full w-full  gap-4">
      <Toaster />
      <div className="flex justify-between w-full bg-gradient-to-tr from-primary to-gray p-4 py-2 rounded-md shadow-lg shadow-dark">
        <div className="flex items-center text-4xl gap-2">
          <MdViewList
            onClick={() => setLayout('list')}
            className={`${
              layout === 'list' ? 'text-light-purple' : 'text-muted'
            }  hover:opacity-50 hover:cursor-pointer border-transparent rounded-md text-white`}
          />
          <MdViewWeek
            onClick={() => setLayout('default')}
            className={`${
              layout === 'default' ? 'text-light-purple' : 'text-muted'
            }  hover:opacity-50 hover:cursor-pointer border-transparent rounded-md text-white`}
          />
        </div>
        <TextButton onClick={handleFilterToggle}>Filters</TextButton>
      </div>
      <motion.div
        initial={{ x: -1200, overflow: 'hidden' }}
        animate={{ x: isFilterTabOpen ? 0 : -1200 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-tr from-primary to-gray shadow-lg shadow-dark rounded-md"
      >
        {isFilterTabOpen && (
          <div className="flex md:flex-row flex-col p-4 gap-4 h-64">
            <Select
              multiple
              options={selectOptions}
              onChange={(value) => setSelectedTags(value)}
              value={selectedTags}
            />
            <ChallengeComboBox handleChange={handleChallengeSelect} />
            <Button onClick={filterProjects}>Search</Button>
          </div>
        )}
      </motion.div>

      {projects && projects.length > 0 && (
        <ProjectList projects={projects} layout={layout} />
      )}

      {data.totalProjects > data.limit && (
        <Pagination
          page={page}
          setPage={setPage}
          limit={data.limit}
          total={data.totalProjects}
        />
      )}
    </div>
  );
}

export default Projects;
