import MarkerImage from '@/assets/icons/marker.svg?react';

import * as S from './Marker.css';

interface PropsType {
    number: number;
}

const Marker = ({ number }: PropsType) => {
    return (
        <div>
            <MarkerImage className={S.marker} />
            <p className={S.numberWrapper}>{number}</p>
        </div>
    );
};

export default Marker;
