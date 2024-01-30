import { useState } from 'react';

import { motion } from 'framer-motion';

import { useDisclosure } from '@/hooks/useDisclosure';
import { useTmap } from '@/hooks/useTmap';
import type { RouteModeType } from '@/types/map';

import * as S from './FloatMenu.css';

const FloatMenu = () => {
    const { tmapModuleRef } = useTmap();

    const { value: isShowPath, toggle: toggleShowPath } = useDisclosure(false);
    const [routeType, setRouteType] = useState<RouteModeType>('Vehicle');

    const handleChangeRouteMode = async (updatedMode: RouteModeType) => {
        if (!tmapModuleRef.current) return;
        setRouteType(updatedMode);
        await tmapModuleRef.current.togglePathMode(updatedMode);
    };

    const handleToggleShowPath = () => {
        if (!tmapModuleRef.current) return;
        tmapModuleRef.current.togglePathVisibility();
        toggleShowPath();
    }

    return (
        <div className={S.wrapper}>
            <p className={S.pathNotice}>경로 표시</p>
            <div
                className={S.switchBox({ status: isShowPath })}
                onClick={handleToggleShowPath}
            >
                <motion.div
                    className={S.switchHandle}
                    layout
                    transition={{
                        type: 'spring',
                        stiffness: 700,
                        damping: 30,
                    }}
                />
            </div>
            <div className={S.divider} />
            <div className={S.toggleBox}>
                <motion.button
                    onClick={() => handleChangeRouteMode('Pedestrian')}
                    className={S.toggleButton({
                        status: routeType === 'Pedestrian',
                    })}
                    layout
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                    }}
                >
                    보행자 경로
                </motion.button>
                <motion.button
                    onClick={() => handleChangeRouteMode('Vehicle')}
                    className={S.toggleButton({
                        status: routeType === 'Vehicle',
                    })}
                    layout
                    transition={{
                        type: 'spring',
                        stiffness: 400,
                        damping: 10,
                    }}
                >
                    자동차 경로
                </motion.button>
            </div>
        </div>
    );
};

export default FloatMenu;
