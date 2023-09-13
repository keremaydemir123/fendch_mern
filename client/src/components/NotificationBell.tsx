import { useState } from 'react';
import { FaBell, FaTrash } from 'react-icons/fa';
import { useQuery } from 'react-query';
import { useUser } from '../contexts/UserProvider';
import {
  deleteNotification,
  getNotifications,
} from '../services/notifications';
import { NotificationProps } from '../types';
import GradientTitle from './GradientTitle';
import toast from 'react-hot-toast';

function NotificationBell() {
  const [open, setOpen] = useState(false);

  const { user } = useUser();

  const { error, data: notifications } = useQuery(
    ['notifications', user?.username],
    () => getNotifications(user?.username)
  );

  const onDeleteNotification = async (notificationId: string) => {
    if (!user?._id) return;
    try {
      await deleteNotification({ userId: user?._id, notificationId });
    } catch (err) {
      toast.error('Something went wrong!');
    }
  };
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
          className="fixed top-0 right-0 left-0 bottom-0 bg-transparent z-20"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-16 right-16 md:w-[500px] md:h-max md:max-h-[400px] p-2 bg-primary rounded-lg shadow-dark shadow-lg overflow-y-auto"
          >
            <div className="h-full w-full flex flex-col p-2">
              <GradientTitle className="text-3xl py-2 font-bold border-b-2 border-tahiti mb-2">
                Notifications
              </GradientTitle>
              {
                // if count is greater than 0, show notifications
                notifications?.length > 0 ? (
                  <div className="flex flex-col gap-2">
                    {notifications.map((notification: NotificationProps) => (
                      <div
                        key={notification._id}
                        className="flex items-center justify-between gap-2 bg-light-gray bg-opacity-20 rounded-md p-2"
                      >
                        <p>{notification.message}</p>
                        <FaTrash
                          className="text-light text-xl hover:cursor-pointer hover:text-light-gray transition duration-100"
                          onClick={() => {
                            if (notification?._id)
                              onDeleteNotification(notification?._id);
                          }}
                        />
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

export default NotificationBell;
