declare const _default: {
    content: string[];
    darkMode: "class";
    theme: {
        extend: {
            colors: {
                dark: {
                    bg: string;
                    surface: string;
                    surface2: string;
                    border: string;
                    accent: string;
                    text: string;
                    muted: string;
                };
                light: {
                    bg: string;
                    surface: string;
                    surface2: string;
                    border: string;
                    accent: string;
                    text: string;
                    muted: string;
                };
                success: {
                    DEFAULT: string;
                    light: string;
                };
                warning: string;
            };
            fontFamily: {
                display: [string, string];
                heading: [string, string];
                body: [string, string];
                mono: [string, string];
            };
            fontSize: {
                '2xs': string;
                xs: string;
                sm: string;
                base: string;
                lg: string;
                xl: string;
                '2xl': string;
                '3xl': string;
                '4xl': string;
                '5xl': string;
                '6xl': string;
            };
            backdropBlur: {
                xs: string;
            };
            animation: {
                'pulse-slow': string;
                float: string;
                'spin-slow': string;
            };
            keyframes: {
                float: {
                    '0%, 100%': {
                        transform: string;
                    };
                    '50%': {
                        transform: string;
                    };
                };
            };
        };
    };
    plugins: any[];
};
export default _default;
