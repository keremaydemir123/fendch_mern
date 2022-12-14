import { useEffect, useState, useCallback } from 'react';
import { useQuery } from 'react-query';
import Button from '../components/Button';
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
];

function Projects() {
  const [selectValue, setSelectValue] = useState<SelectOption[]>([
    selectOptions[0],
  ]);
  const [page, setPage] = useState(1);
  const [queryString, setQueryString] = useState('page=1&tech=All');

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

  const search = () => {
    setPage(1);
    filterProjects();
  };

  useEffect(() => {
    filterProjects();
  }, [filterProjects]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  const { projects } = data;

  return (
    <div className="flex flex-col h-full w-full  gap-4">
      <div className="flex justify-between w-full bg-secondary p-4 py-2 rounded-md ">
        <Select
          multiple
          options={selectOptions}
          onChange={(value) => setSelectValue(value)}
          value={selectValue}
        />
        <Button onClick={search}>Search</Button>
      </div>

      <ProjectList projects={projects} />

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
