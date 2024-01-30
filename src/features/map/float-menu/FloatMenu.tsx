import { useState } from 'react';

import { motion } from 'framer-motion';

import { useDisclosure } from '@/hooks/useDisclosure';
import type { RouteModeType } from '@/types/map';

import * as S from './FloatMenu.css';

const FloatMenu = () => {
    const { value: isShowPath, toggle: toggleShowPath } = useDisclosure(false);
    const [routeMode, setRouteMode] = useState<RouteModeType>('Pedestrian');

    return (
        <div className={S.wrapper}>
            <p className={S.pathNotice}>경로 표시</p>
            <div
                className={S.switchBox({ status: isShowPath })}
                data-isOn={isShowPath}
            >
                <motion.div
                    className={S.switchHandle}
                    layout
                    onClick={toggleShowPath}
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
                    onClick={() => setRouteMode('Pedestrian')}
                    className={S.toggleButton({
                        status: routeMode === 'Pedestrian',
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
                    onClick={() => setRouteMode('Vehicle')}
                    className={S.toggleButton({
                        status: routeMode === 'Vehicle',
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
