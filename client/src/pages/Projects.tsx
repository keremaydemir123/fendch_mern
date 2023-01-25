import { useEffect, useState, useCallback } from 'react';
import { MdViewList, MdViewWeek } from 'react-icons/md';
import { FaFilter } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import ChallengeComboBox from '../components/ChallengeComboBox';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import ProjectList from '../components/ProjectList';
import { Select, SelectOption } from '../components/Select';
import TextButton from '../components/TextButton';
import { getProjects } from '../services/projects';
import UsersComboBox from '../components/UsersComboBox';
import Button from '../components/Button';

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
  const [selectValue, setSelectValue] = useState<SelectOption[]>([
    selectOptions[0],
  ]);
  const [page, setPage] = useState(1);
  const [queryString, setQueryString] = useState('page=1&tech=All');
  const [layout, setLayout] = useState<'default' | 'list'>('default');
  const [isFilterTabOpen, setIsFilterTabOpen] = useState(false);

  const { isLoading, error, data } = useQuery(['projects', queryString], () =>
    getProjects(queryString)
  );

  const filterProjects = useCallback(() => {
    let str;
    const techStr = selectValue.map((tech) => tech.label).join(',');
    if (techStr.length < 1) str = `page=${page}`;
    else str = `page=${page}&tech=${techStr}`;

    setQueryString(str);
  }, [page, selectValue]);

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  const handleFilterToggle = () => {
    setIsFilterTabOpen(!isFilterTabOpen);
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  const { projects } = data;

  return (
    <div className="flex flex-col h-full w-full  gap-4">
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
          <div className="flex md:flex-row flex-col p-4 gap-4 h-full">
            <Select
              multiple
              options={selectOptions}
              onChange={(value) => setSelectValue(value)}
              value={selectValue}
            />
            <div className="w-full flex items-center justify-center">
              <ChallengeComboBox />
            </div>
            <div className="w-full flex items-center justify-center">
              <UsersComboBox />
            </div>
            <Button>Search</Button>
          </div>
        )}
      </motion.div>

      <ProjectList projects={projects} layout={layout} />

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
