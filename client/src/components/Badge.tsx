import MessageInbox from './MessageInbox';
import NotificationBell from './NotificationBell';

function Badge() {
  return (
    <div className="flex gap-2 items-center">
      <MessageInbox />
      <NotificationBell />
    </div>
  );
}

export default Badge;
