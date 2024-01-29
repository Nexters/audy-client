import { motion } from 'framer-motion';

import { useDisclosure } from '@/hooks/useDisclosure';

import * as S from './FloatMenu.css';

const FloatMenu = () => {
    const { value: isShowPath, toggle: toggleShowPath } = useDisclosure(false);

    return (
        <div className={S.wrapper}>
            <p className={S.pathNotice}>경로 표시</p>
            <div className={S.switchBox} data-isOn={isShowPath}>
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
                <button
                    className={S.toggleButton({
                        status: !isShowPath ? 'on' : 'off',
                    })}
                >
                    보행자 경로
                </button>
                <button
                    className={S.toggleButton({
                        status: isShowPath ? 'on' : 'off',
                    })}
                >
                    자동차 경로
                </button>
            </div>
        </div>
    );
};

export default FloatMenu;
