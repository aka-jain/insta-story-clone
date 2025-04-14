import React, { useEffect, useState } from 'react';
import StoryCardComponent from './StoryCardComponent';
import { User } from '../../utils/types';
import { useViewer } from '../common/viewer/ViewerContext';

const StoriesListComponent: React.FC = () => {
    const [stories, setStories] = useState<User[]>([]);
    const { setUserData } = useViewer();

    useEffect(() => {
        const fetchStories = async () => {
            const response = await fetch('../src/utils/db_mock.json');
            const data = await response.json();
            setUserData(data);
            setStories(data);
        };
        fetchStories();
    }, []);

    return (
        <div className='w-full flex h-[100px] overflow-x-scroll gap-4 no-scrollbar p-2'>
            {
                stories.map((story, index) => (
                    <StoryCardComponent key={index} user={story} userIndex={index} />
                ))
            }
        </div>
    );
};

export default StoriesListComponent;
