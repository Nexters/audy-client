import {
    type PropsWithChildren,
    createContext,
    useContext,
    useMemo,
} from 'react';

import { useDisclosure } from '@/hooks/useDisclosure';

import * as S from './PopOver.css';
import PopOverContent from './PopOverContent';
import PopOverItem from './PopOverItem';
import PopOverTrigger from './PopOverTrigger';

interface PopOverContextType {
    isPopOverOpen: boolean;
    openPopOver: () => void;
    closePopOver: () => void;
}

const PopOverContext = createContext<PopOverContextType | null>(null);

const PopOverRoot = ({ children }: PropsWithChildren) => {
    const {
        value: isPopOverOpen,
        open: openPopOver,
        close: closePopOver,
    } = useDisclosure(false);

    const value = useMemo(
        () => ({
            isPopOverOpen,
            openPopOver,
            closePopOver,
        }),
        [closePopOver, isPopOverOpen, openPopOver],
    );

    return (
        <PopOverContext.Provider value={value}>
            <div className={S.wrapper}>{children}</div>
        </PopOverContext.Provider>
    );
};

export const usePopOverContext = () => {
    const context = useContext(PopOverContext);

    if (!context) {
        throw new Error('usePopOverContext must be used within PopOverContext');
    }

    return context;
};

const PopOver = Object.assign(PopOverRoot, {
    Content: PopOverContent,
    Item: PopOverItem,
    Trigger: PopOverTrigger,
});

export default PopOver;