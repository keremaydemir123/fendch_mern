type PaginationProps = {
  page: number;
  total: number;
  limit: number;
  setPage: any;
};

function Pagination({ total, limit, page, setPage }: PaginationProps) {
  return (
    <div className="w-full bg-secondary rounded-md">
      <div className="flex justify-between items-center p-4">
        <div className="text-white">
          {page} of {Math.ceil(total / limit)}
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="p-2 rounded-full bg-primary text-light hover:bg-dark hover:cursor-pointer"
            onClick={() => setPage((prev: number) => prev - 1)}
            disabled={page === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            className="p-2 rounded-full bg-primary text-light hover:bg-dark hover:cursor-pointer"
            onClick={() => setPage((prev: number) => prev + 1)}
            disabled={page === Math.ceil(total / limit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
