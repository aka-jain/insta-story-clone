export interface StoryCardComponentProps {
    user: User,
    userIndex: number
}

export interface User {
    id: number;
    profilePicture: string;
    imageUrl: string;
    status: string;
    stories: Story[];
    name: string;
}

export interface Story {
    id: number;
    imageUrl: string;
}