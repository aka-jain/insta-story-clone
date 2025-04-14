import React, { useEffect, useState } from 'react';
import { Story } from '../../utils/types';


interface ProgressProps {
    activeUser: any; // Replace 'any' with the appropriate type
    activeStoryIndex: number;
}

const Progress: React.FC<ProgressProps> = ({ activeUser, activeStoryIndex }) => {
    const [progress, setProgress] = useState(0);
    const duration = 2000;
    const interval = 100;

    useEffect(() => {
        if (!activeUser) return;

        setProgress(0);
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + (interval / duration) * 100;
            });
        }, interval);

        return () => {
            clearInterval(progressInterval);
            setProgress(0);
        };
    }, [activeStoryIndex, activeUser]);
    if (!activeUser) return null;
    return (
        <div className='flex-1 w-full flex gap-2'>
            {
                activeUser.stories.map((story: Story, index: number) => (
                    <div className="text-white w-5 flex-1 h-0.5 bg-gray-700" key={story.id}>
                        {
                            <div
                                className="h-full bg-white w-0 "
                                style={{ width: index < activeStoryIndex ? '100%' : index === activeStoryIndex ? `${progress}%` : '0%', transition: 'width 0.1s ease-in-out' }}
                            />
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default Progress; 