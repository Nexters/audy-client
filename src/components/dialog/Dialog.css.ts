import { COLOR } from "@/styles/foundation";
import { sprinkles } from "@/styles/sprinkle.css";
import { style } from "@vanilla-extract/css";

export const overlay = style({
    width: '100%',
    height: '100vh',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: 'rgba(0, 0, 0, 0.33)'
})

export const header = style({
    width: '100%',
    padding: '8px 0 8px 8px',
})

export const headerText = style([
    sprinkles({typography: 'Bold24'}),
    {
        color: COLOR.Gray900,
    }
])

export const content = style({
    width: '360px',
    padding: '24px',


    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    backgroundColor: COLOR.MonoWhite,
    borderRadius: '16px',
    border: `1px solid ${COLOR.Gray200}`,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.03)'
})