import React, { createContext, useContext, useState } from 'react';
import { Story, User } from '../../../utils/types';

interface ViewerContextType {
    activeUser: User | null;
    activeStoryIndex: number;
    openStories: (user: User, userIndex: number) => void;
    next: () => void;
    prev: () => void;
    closeStories: () => void;
    setUserData: (data: Story[]) => void;
    getUserData: () => void
}

const ViewerContext = createContext<ViewerContextType | undefined>(undefined);

export const ViewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeUser, setActiveUser] = useState<User | null>(null);
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);
    const [activeUserIndex, setActiveUserIndex] = useState<number>(0);
    const [userData, setUserStories] = useState<Story[]>([]);

    const setUserData = (data: Story[]) => {
        setUserStories(data)
    }

    const getUserData = () => {
        return userData
    }

    const openStories = (user: User, userIndex: number): void => {
        setActiveUser(user);
        setActiveStoryIndex(0);
        setActiveUserIndex(userIndex)
    };

    const closeStories = (): void => {
        setActiveUser(null);
        setActiveStoryIndex(0);
        setActiveUserIndex(0)
    };

    const next = () => {
        if (activeUser && activeStoryIndex < activeUser.stories.length - 1) {
            setActiveStoryIndex((prev) => prev + 1);
        } else if (activeUserIndex < userData.length) {
            setActiveStoryIndex(0);
            setActiveUserIndex(activeUserIndex + 1);
            const nextuser = userData[activeUserIndex + 1];
            setActiveUser(nextuser as User)
        } else {
            closeStories();
        }
    };

    const prev = () => {
        if (activeStoryIndex > 0) {
            setActiveStoryIndex((prev) => prev - 1);
        } else if (activeUserIndex > 0) {
            setActiveStoryIndex(0);
            setActiveUserIndex(activeUserIndex - 1)
            const prevUser = userData[activeUserIndex - 1];
            setActiveUser(prevUser as User)
        }
    };


    return (
        <ViewerContext.Provider value={{ activeUser, activeStoryIndex, openStories, next, prev, closeStories, setUserData, getUserData }}>
            <div className="w-full h-full z-100">
                {children}
            </div>
        </ViewerContext.Provider>
    );
};

export const useViewer = () => {
    const context = useContext(ViewerContext);
    if (!context) throw new Error('useStory must be used within StoryProvider');
    return context;
};
