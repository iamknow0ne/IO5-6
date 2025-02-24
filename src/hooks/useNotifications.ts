import { useState, useRef } from 'react';

export default function useNotifications() {
  const [notifications, setNotifications] = useState<{ id: number; text: string; top: number; left: number, icon?: React.ReactNode }[]>([]);
  const notificationId = useRef(0);

  const addNotification = (text: string, top: number, left: number, icon?: React.ReactNode) => {
    const id = notificationId.current++;
    setNotifications(prev => [...prev, { id, text, top, left, icon }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 2000);
  };

  return { notifications, addNotification };
}
