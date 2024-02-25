import * as S from './Cluster.css';

interface PropsType {
    count: number;
}

const Cluster = ({ count }: PropsType) => {
    return <div className={S.layout}>{count}</div>;
};

export default Cluster;
