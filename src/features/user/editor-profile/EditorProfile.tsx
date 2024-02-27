import { useState } from 'react';

import { motion } from 'framer-motion';

import Tooltip from '@/components/tooltip';

import * as S from './EditorProfile.css';

interface PropsType {
    isOnline: boolean;
    profileImageUrl?: string;
    editorName: string;
}

const EditorProfile = ({
    isOnline,
    profileImageUrl,
    editorName,
}: PropsType) => {
    const profileAlt = `${editorName}의 프로필 사진`;

    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    return (
        <div className={S.layout}>
            <div
                className={S.profileImageWrapper}
                onMouseEnter={() => setIsTooltipVisible(true)}
                onMouseLeave={() => setIsTooltipVisible(false)}
            >
                <img
                    src={profileImageUrl}
                    alt={profileAlt}
                    className={S.profileImage}
                />
                <div className={S.profileImageInnerBorder} />
                <div className={S.profileImageOuterBorder({ isOnline })} />
            </div>

            {isTooltipVisible && (
                <motion.div
                    className={S.tooltipWrapper}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                >
                    <Tooltip isOnline={isOnline} name={editorName} />
                </motion.div>
            )}
        </div>
    );
};

export default EditorProfile;
