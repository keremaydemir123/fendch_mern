import Button from '../components/Button';
import SolutionCard from '../components/SolutionCard';

function Solutions() {
  return (
    <>
      <div className="border-2 border-blue p-2 ">
        <h1>Subscribe to see all solutions</h1>
        <Button>Subsrice (10$/month)</Button>
      </div>
      <div className="mt-4">
        <SolutionCard sideBorder="right" />
        <SolutionCard sideBorder="left" />
        <SolutionCard sideBorder="right" />
        <SolutionCard sideBorder="left" />
        <SolutionCard sideBorder="right" />
        <SolutionCard sideBorder="left" />
        <SolutionCard sideBorder="right" />
        <SolutionCard sideBorder="left" />
        <SolutionCard sideBorder="right" />
      </div>
    </>
  );
}

export default Solutions;
