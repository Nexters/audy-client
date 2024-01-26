import MarkerImage from '@/assets/icons/marker.svg?react';

const Marker = (number: number) => {
    return (
        <div>
            <MarkerImage />
            <p>{number}</p>
        </div>
    );
};

export default Marker;
