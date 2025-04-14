import React from 'react';
import { StoryCardComponentProps } from '../../utils/types';
import { useViewer } from '../common/viewer/ViewerContext';

const StoryCardComponent: React.FC<StoryCardComponentProps> = ({ user, userIndex }) => {
    const { openStories } = useViewer();

    return (
        <div className='rounded-full flex-none w-[70px] h-[70px] bg-transparent p-[1px] border-2 border-orange-400' data-test-id={`first-story-thumb-${user.id}`}>
            <div
                className='w-full h-full bg-cover bg-size-1 bg-center overflow-hidden bg-no-repeat rounded-full px-2 border-2'
                style={{ backgroundImage: `url('${user.profilePicture}')` }}
                onClick={() => openStories(user, userIndex)}
            />
            <div className='text-xs text-center mt-2'>{user.name}</div>
        </div>
    );
};

export default StoryCardComponent;
