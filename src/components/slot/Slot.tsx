import {
    type ReactNode,
    cloneElement,
    isValidElement,
} from 'react';

interface PropsType {
    children?: ReactNode;
}
// asChild props 를 구현하기 위해 추가한 컴포넌트 Slot (props 로 받은 children 를 렌더링)
const Slot = ({ children, ...restProps }: PropsType) => {
        if (!isValidElement(children)) return null;

        // TODO : children ref 와 props 를 올바르게 병합하는 로직 추가 예정
        return cloneElement(children, {
            ...restProps,
            ...children.props,
        });
    }

export default Slot;
