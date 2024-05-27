import React, { useEffect, useState } from 'react';

const CurrentTime: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(() => 
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  );

  useEffect(() => {
    const update = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="time" id="taskbarTime">
      {currentTime}
    </div>
  );
};

export default CurrentTime;
