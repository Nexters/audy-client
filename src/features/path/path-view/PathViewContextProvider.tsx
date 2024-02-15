import { createContext, useMemo, useState } from 'react';
import type { Dispatch, PropsWithChildren, SetStateAction } from 'react';

interface PathViewContextValueType {
    selectedId: string | null;
}

interface PathViewContextActionType {
    setSelectedId: Dispatch<SetStateAction<string | null>>;
}

export const PathViewContextValue = createContext<PathViewContextValueType>(
    {} as PathViewContextValueType,
);
export const PathViewContextAction = createContext<PathViewContextActionType>(
    {} as PathViewContextActionType,
);

const PathViewContextProvider = ({ children }: PropsWithChildren) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const value = useMemo(
        () => ({
            selectedId,
        }),
        [selectedId],
    );

    const action = useMemo(
        () => ({
            setSelectedId,
        }),
        [],
    );

    return (
        <PathViewContextValue.Provider value={value}>
            <PathViewContextAction.Provider value={action}>
                {children}
            </PathViewContextAction.Provider>
        </PathViewContextValue.Provider>
    );
};

export default PathViewContextProvider;
