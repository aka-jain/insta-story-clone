import React from 'react';
import StoriesListComponent from './StoriesList/StoriesListComponent';
import { ViewerProvider } from './common/viewer/ViewerContext';
import { StoryViewer } from './StoriesList/StoryViewComponent';

const StageComponent: React.FC = () => {
    return (
        <ViewerProvider>
            <StoriesListComponent />
            <StoryViewer />
        </ViewerProvider>
    );
};

export default StageComponent;
