import { useState } from 'react';

import { motion } from 'framer-motion';

import { useDisclosure } from '@/hooks/useDisclosure';
import { useEventListeners } from '@/hooks/useEventListeners';
import { useTmap } from '@/hooks/useTmap';
import type { PathModeType } from '@/types/map';
import dayjs from '@/utils/dayjs';

import * as S from './FloatMenu.css';

const FloatMenu = () => {
    const { tmapModuleRef } = useTmap();
    const { value: isShowPath, toggle: toggleShowPath } = useDisclosure(true);

    const [pathType, setPathType] = useState<PathModeType>('Vehicle');
    const [currentDuration, setCurrentDuration] = useState<number | null>(null);

    const handleChangePathMode = async (updatedMode: PathModeType) => {
        if (!tmapModuleRef.current) return;
        setPathType(updatedMode);
        await tmapModuleRef.current.togglePathMode(updatedMode);
    };

    const handleToggleShowPath = () => {
        if (!tmapModuleRef.current) return;
        toggleShowPath();
        tmapModuleRef.current.togglePathVisibility();
    };

    useEventListeners('duration:update', (event) =>
        setCurrentDuration(event.detail),
    );

    return (
        <div className={S.wrapper}>
            <div className={S.pathModeBox}>
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

                {isShowPath && (
                    <div className={S.toggleBox}>
                        <motion.button
                            onClick={() => handleChangePathMode('Pedestrian')}
                            className={S.toggleButton({
                                status: pathType === 'Pedestrian',
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
                            onClick={() => handleChangePathMode('Vehicle')}
                            className={S.toggleButton({
                                status: pathType === 'Vehicle',
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
                )}
            </div>

            {isShowPath && (
                <div className={S.pathDurationBox}>
                    <p
                        className={S.durationText}
                    >{`총 소요 시간 : ${dayjs.duration(currentDuration ?? 0, 'seconds').format('HH 시간 mm 분 ss 초')}`}</p>
                </div>
            )}
        </div>
    );
};

export default FloatMenu;
