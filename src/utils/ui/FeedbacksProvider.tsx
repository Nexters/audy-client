import { PropsWithChildren, useState } from 'react';
import { createContext } from 'react';

import { FeedbackType } from '@/types/feedback';

interface FeedbacksProviderType {
    feedbacks: FeedbackType[];
    setFeedbacks: React.Dispatch<React.SetStateAction<FeedbackType[]>>;
}

export const FeedbacksContext = createContext<FeedbacksProviderType>(
    {} as FeedbacksProviderType,
);

export const FeedbacksProvider = ({ children }: PropsWithChildren) => {
    const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);

    return (
        <FeedbacksContext.Provider value={{ feedbacks, setFeedbacks }}>
            {children}
        </FeedbacksContext.Provider>
    );
};
