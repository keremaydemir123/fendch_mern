function ProjectCard({
  layout = 'default',
}: {
  layout: 'default' | 'grid' | 'list';
}) {
  return (
    <div>
      {layout === 'default' && (
        <div className="bg-red w-64 h-64" style={{ background: 'red' }}>
          <h1>Project Card</h1>
        </div>
      )}
      {layout === 'grid' && (
        <div className="bg-red w-32 h-32">
          <h1>Project Card</h1>
        </div>
      )}
      {layout === 'list' && (
        <div className="bg-red w-64 h-16">
          <h1>Project Card</h1>
        </div>
      )}
    </div>
  );
}

export default ProjectCard;
