import {
    type PropsWithChildren,
    createContext,
    useContext,
    useState,
} from 'react';

import { createPortal } from 'react-dom';

import * as S from './AppPortal.css';

interface PropsType extends PropsWithChildren {
    portalName?: string | undefined;
}

const PortalContext = createContext<HTMLDivElement | null>(null);

const PortalProvider = ({ children }: PropsType) => {
    const [portalContainer, setPortalContainer] =
        useState<HTMLDivElement | null>(null);

    return (
        <PortalContext.Provider value={portalContainer}>
            <div
                className={S.Wrapper}
                id="app-portal"
                ref={(element) => {
                    if (element && !portalContainer)
                        setPortalContainer(element);
                }}
            />
            {children}
        </PortalContext.Provider>
    );
};

const PortalWrapper = ({ children }: PropsType) => {
    const portalContainer = useContext(PortalContext);
    return portalContainer ? createPortal(children, portalContainer) : null;
};

export const AppPortal = {
    Provider: PortalProvider,
    Wrapper: PortalWrapper,
};
