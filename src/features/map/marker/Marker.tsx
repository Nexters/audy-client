import MarkerBlackImage from '@/assets/images/markerBlack.svg?react';
import MarkerWhiteImage from '@/assets/images/markerWhite.svg?react';

import * as S from './Marker.css';

interface PropsType {
    order: number;
    isHidden: boolean;
}

const Marker = ({ order, isHidden }: PropsType) => {
    return (
        <div>
            {isHidden ? (
                <MarkerWhiteImage className={S.marker} />
            ) : (
                <MarkerBlackImage className={S.marker} />
            )}

            <p className={S.numberWrapper({ isHidden })}>{order}</p>
        </div>
    );
};

export default Marker;
