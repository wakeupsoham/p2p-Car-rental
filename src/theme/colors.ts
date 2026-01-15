// Premium Dark Theme Palette for P2P Car Rental
export const colors = {
    // Primary colors - kept similar but slightly adjusted for dark mode contrast
    primary: '#3B82F6',        // Bright blue for primary actions on dark
    primaryLight: '#60A5FA',   // Lighter blue
    primaryDark: '#2563EB',    // Darker blue

    // Accent colors
    accent: '#00D4AA',         // Electric teal - pops well on dark
    accentLight: '#33DDBB',
    accentDark: '#00A888',

    // Secondary accent
    secondary: '#FF6B35',      // Vibrant orange
    secondaryLight: '#FF8A5C',
    secondaryDark: '#E55520',

    // Status colors
    success: '#4ADE80',        // Brighter green
    warning: '#FBBF24',        // Brighter amber
    error: '#EF4444',          // Red
    info: '#60A5FA',           // Blue

    // Neutral colors (THEME CHANGE HERE)
    white: '#FFFFFF',

    // Backgrounds
    background: '#0B1121',     // Deep midnight blue/black
    surface: '#151E32',        // Slightly lighter midnight
    surfaceSecondary: '#1E2A45', // Used for inputs, cards secondary areas

    // Text colors
    textPrimary: '#F1F5F9',    // High emphasis white/gray
    textSecondary: '#94A3B8',  // Medium emphasis gray
    textMuted: '#64748B',      // Low emphasis
    textInverse: '#0B1121',    // Dark text for light buttons

    // Border colors
    border: '#2D3A56',         // Dark blue-gray border
    borderLight: '#1E2A45',
    borderDark: '#334155',

    // Overlay
    overlay: 'rgba(0, 0, 0, 0.7)', // Darker overlay
    overlayLight: 'rgba(0, 0, 0, 0.5)',

    // Gradient colors
    gradientStart: '#0B1121',
    gradientEnd: '#151E32',

    // Category colors (Brightened for dark mode)
    hatchback: '#60A5FA',
    sedan: '#A78BFA',
    suv: '#4ADE80',
    luxury: '#FBBF24',
    ultraLuxury: '#F87171',
    offroad: '#A8A29E',

    // Star rating
    star: '#FCD34D',
    starEmpty: '#334155',
};

export type ColorKey = keyof typeof colors;
