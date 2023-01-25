import { useEffect, useState, useCallback } from 'react';
import { MdViewList, MdViewWeek } from 'react-icons/md';
import { useQuery } from 'react-query';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import ProjectList from '../components/ProjectList';
import { Select, SelectOption } from '../components/Select';
import { getProjects } from '../services/projects';

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

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  const { projects } = data;

  return (
    <div className="flex flex-col h-full w-full  gap-4">
      <div className="flex justify-between w-full bg-dark-purple p-4 py-2 rounded-md ">
        <Select
          multiple
          options={selectOptions}
          onChange={(value) => setSelectValue(value)}
          value={selectValue}
        />

        <div className="flex items-center text-4xl gap-2">
          <MdViewList
            onClick={() => setLayout('list')}
            className="bg-purple hover:bg-opacity-50 hover:text-light hover:cursor-pointer border-transparent rounded-md text-white"
          />
          <MdViewWeek
            onClick={() => setLayout('default')}
            className="bg-purple hover:bg-opacity-50 hover:text-light hover:cursor-pointer border-transparent rounded-md text-white"
          />
        </div>
      </div>

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
