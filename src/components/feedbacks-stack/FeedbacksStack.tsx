import { useContext } from 'react';

import { FeedbacksContext } from '@/utils/ui/FeedBacksProvider';

import AppPortal from '../app-portal';
import SnackBar from '../snack-bar';
import Toast from '../toast';

import * as S from './FeedbacksStack.css';

const FeedbacksStacks = () => {
    const { feedbacks } = useContext(FeedbacksContext);

    return (
        <AppPortal.Wrapper>
            <div className={S.layout}>
                {feedbacks.map(({ message, type, undoFunction }, index) => {
                    return type === 'toast' ? (
                        <Toast message={message} key={index} />
                    ) : (
                        <SnackBar
                            message={message}
                            undoFunction={undoFunction}
                            key={index}
                        />
                    );
                })}
            </div>
        </AppPortal.Wrapper>
    );
};

export default FeedbacksStacks;
