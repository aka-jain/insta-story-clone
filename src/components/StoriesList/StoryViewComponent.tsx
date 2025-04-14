import React, { useEffect, useState } from 'react';
import { useViewer } from '../common/viewer/ViewerContext';
import Progress from '../common/Progress';

// Multiple story of a user progress bar
export const StoryViewer: React.FC = () => {
    const { activeUser, activeStoryIndex, next, prev, closeStories } = useViewer();
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        if (!activeUser) return;
        const duration = 5000;

        const timer = setTimeout(() => {
            if (activeStoryIndex === activeUser.stories.length - 1) {
                setFadeOut(true);
                setTimeout(() => {
                    next();
                    setFadeOut(false);
                }, 500);
            } else {
                next();
            }
        }, duration);

        return () => {
            clearTimeout(timer);
        };
    }, [activeUser, activeStoryIndex]);

    if (!activeUser) return null;

    const story = activeUser.stories[activeStoryIndex];

    if(!activeUser){
        return null
    }

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500" data-test-id="story-viewer">
            <img
                src={story.imageUrl}
                className={`max-w-full max-h-full object-contain transition-transform duration-500 ${fadeOut ? 'scale-0' : 'scale-100'}`}
                alt="story"
            />
            <div className='flex gap-2 flex-col absolute w-full top-4 left-0' data-test-id={`progress-bar-${activeUser.id}`}>
                <Progress activeUser={activeUser} activeStoryIndex={activeStoryIndex} />
                <div className='text-gray-300 px-2 font-medium text-sm'>{activeUser.name}</div>
            </div>
            <button className="absolute top-6 right-4 text-white z-10" onClick={closeStories} data-test-id={`cross-icon`}>X</button>
            <div className="absolute left-0 top-0 w-1/3 h-full" onClick={(e) => { e.stopPropagation(); prev(); }} />
            <div className="absolute right-0 top-0 w-1/3 h-full" onClick={(e) => { e.stopPropagation(); next(); }} />
        </div>
    );
};