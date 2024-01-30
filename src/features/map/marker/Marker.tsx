import MarkerImage from '@/assets/icons/marker.svg?react';

import * as S from './Marker.css';

interface PropsType {
    order: number;
}

const Marker = ({ order }: PropsType) => {
    return (
        <div>
            <MarkerImage className={S.marker} />
            <p className={S.numberWrapper}>{order}</p>
        </div>
    );
};

export default Marker;
