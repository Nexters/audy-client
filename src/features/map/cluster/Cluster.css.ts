import { style } from '@vanilla-extract/css';

import { COLOR } from '@/styles/foundation';
import { sprinkles } from '@/styles/sprinkle.css';

export const layout = style([
    sprinkles({ typography: 'Bold26' }),
    {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 77, 133, 0.5)',
        border: '2px solid #FF4D85',
        borderRadius: '50%',
        width: '50px',
        height: '50px',
        color: COLOR.Gray950,
    },
]);
