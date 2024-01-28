import { useMemo, useState } from 'react';

/**
 * Boolean State 를 편리하게 처리하기 위한 Hook useDisclosure
 * @author RookieAND
 */
export const useDisclosure = (initialState: boolean = false) => {
    const [value, setValue] = useState(initialState);

    return useMemo(
        () => ({
            value,
            open: () => setValue(true),
            close: () => setValue(false),
            toggle: () => setValue((prevState) => !prevState),
        }),
        [value],
    );
};
