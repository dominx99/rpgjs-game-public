export interface Theme {
    colors: {
        text: {
            default: string;
            light: string;
            success: string;
            warning: string;
            error: string;
            info: string;
            cyan: string;
            purple: string;
            gray: string;
        };
        background: {
            primary: string;
        };
    };
    typography: {
        sizes: {
            size1: string;
            size2: string;
            size3: string;
            size4: string;
            size5: string;
            size6: string;
            size7: string;
            size8: string;
            small: string;
            medium: string;
            large: string;
        };
    },
    spacing: (factor: number) => string;
}

export const globalTheme: Theme = {
    colors: {
        text: {
            default: '#fefefe',
            light: '#fefefe',
            info: '#79ffe1',
            success: '#79ffe1',
            cyan: '#00ffff',
            warning: '#ffcc00',
            error: '#ff0000',
            purple: '#ff00ff',
            gray: '#808080',
        },
        background: {
            primary: '#0070f3',
        },
    },
    typography: {
        sizes: {
            size1: '0.5rem',
            size2: '0.75rem',
            size3: '1rem',
            size4: '1.25rem',
            size5: '1.5rem',
            size6: '2rem',
            size7: '3rem',
            size8: '4rem',
            small: '1rem',
            medium: '1.5rem',
            large: '2rem',
        },
    },
    spacing: (factor: number) => `${factor / 8}rem`,
}
