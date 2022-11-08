import { useState } from 'react';
import { FaBell } from 'react-icons/fa';

function Badge() {
  const [count, setCount] = useState(10);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-max w-max ">
      <FaBell
        onClick={() => setOpen(true)}
        className="text-light text-xl hover:cursor-pointer hover:text-light-gray transition duration-100"
      />
      <span className="absolute text-light flex justify-center items-center text-xs -right-2 -top-2 rounded-full w-[16px] h-[16px] bg-red">
        {
          // if count is greater than 9, show 9+
          count > 9 ? '9+' : count
        }
      </span>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 right-0 left-0 bottom-0 bg-transparent"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-16 right-16 w-[300px] h-[300px] bg-gray rounded-lg"
          >
            <div className="h-full w-full flex flex-col p-2">
              <h1 className="text-2xl font-bold border-b-2 border-secondary mb-2">
                Notifications
              </h1>
              {
                // if count is greater than 0, show notifications
                count > 0 ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 bg-primary rounded-md p-2">
                      Turhan Liked your project
                    </div>
                    <div className="flex items-center gap-2 bg-primary rounded-md p-2">
                      Barkın make a comment to your project: "Wow this is
                      awesome!"
                    </div>
                  </div>
                ) : (
                  <p className="text-light">You have no notifications</p>
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Badge;
