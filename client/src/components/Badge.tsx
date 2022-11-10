import { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useUser } from '../contexts/authProvider';
import { getNotifications } from '../services/notifications';
import { NotificationProps } from '../types/Notification';

function Badge() {
  const [open, setOpen] = useState(false);

  const { user } = useUser();

  const {
    isLoading,
    error,
    data: notifications,
  } = useQuery('notifications', () => getNotifications(user?._id!));

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="relative h-max w-max ">
      <FaBell
        onClick={() => setOpen(true)}
        className="text-light text-xl hover:cursor-pointer hover:text-light-gray transition duration-100"
      />
      {notifications?.length > 0 && (
        <span className="absolute text-light flex justify-center items-center text-xs -right-2 -top-2 rounded-full w-[16px] h-[16px] bg-red">
          {
            // if count is greater than 9, show 9+
            notifications?.length > 9 ? '9+' : notifications?.length
          }
        </span>
      )}
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
                notifications?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {notifications.map((notification: NotificationProps) => (
                      <div
                        key={notification._id}
                        className="flex items-center gap-2 bg-primary rounded-md p-2"
                      >
                        {notification.message}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-light">
                    {error
                      ? 'Eror when fetching notifications'
                      : 'You have no notifications'}
                  </p>
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
