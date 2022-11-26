import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Button from '../components/Button';
import Loading from '../components/Loading';
import Pagination from '../components/Pagination';
import ProjectCard from '../components/ProjectCard';
import ProjectList from '../components/ProjectList';
import { Select, SelectOption } from '../components/Select';
import { getProjects } from '../services/projects';
import { ProjectProps } from '../types/Project';

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
  const [queryString, setQueryString] = useState('');

  const { isLoading, error, data } = useQuery(['projects', queryString], () =>
    getProjects(queryString)
  );

  const search = () => {
    setPage(1);
    filterProjects();
  };

  const filterProjects = () => {
    let str;
    let techStr = selectValue.map((tech) => tech.label).join(',');
    if (techStr.length < 1) str = `page=${page}`;
    else str = `page=${page}&tech=${techStr}`;
    console.log(str);

    setQueryString(str);

    console.log(str);
  };

  useEffect(() => {
    filterProjects();
  }, [page]);

  if (isLoading) return <Loading />;
  if (error) return <p>Error</p>;

  const projects = data.projects;

  return (
    <div className="wrapper">
      <div className="flex flex-col justify-between h-full w-full  gap-4">
        <div className="flex justify-between w-full bg-secondary p-4 py-2 rounded-md ">
          <Select
            multiple={true}
            options={selectOptions}
            onChange={(value) => setSelectValue(value)}
            value={selectValue}
          />
          <Button onClick={search}>Search</Button>
        </div>

        <ProjectList projects={projects} />

        {data.totalPages > data.limit && (
          <Pagination
            page={page}
            setPage={setPage}
            limit={data.limit}
            total={data.totalProjects}
          />
        )}
      </div>
    </div>
  );
}

export default Projects;
