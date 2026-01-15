// Typography system for P2P Car Rental
export const typography = {
    // Font families - using system fonts, can switch to custom later
    fontFamily: {
        regular: 'System',
        medium: 'System',
        semibold: 'System',
        bold: 'System',
    },

    // Font sizes
    fontSize: {
        xs: 10,
        sm: 12,
        base: 14,
        md: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30,
        '4xl': 36,
        '5xl': 48,
    },

    // Line heights
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },

    // Font weights
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },

    // Letter spacing
    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
    },
};

// Text style presets with proper pixel line heights for React Native Web
export const textStyles = {
    // Headings
    h1: {
        fontSize: typography.fontSize['4xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: 44, // 36 * 1.2
    },
    h2: {
        fontSize: typography.fontSize['3xl'],
        fontWeight: typography.fontWeight.bold,
        lineHeight: 36, // 30 * 1.2
    },
    h3: {
        fontSize: typography.fontSize['2xl'],
        fontWeight: typography.fontWeight.semibold,
        lineHeight: 32, // 24 * 1.33
    },
    h4: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: 28, // 20 * 1.4
    },

    // Body text
    bodyLarge: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.regular,
        lineHeight: 28, // 18 * 1.55
    },
    body: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.regular,
        lineHeight: 22, // 14 * 1.57
    },
    bodySmall: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.regular,
        lineHeight: 18, // 12 * 1.5
    },

    // Labels
    label: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        lineHeight: 18,
    },
    labelSmall: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.medium,
        lineHeight: 14, // 10 * 1.4
    },

    // Buttons
    button: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: 24, // 16 * 1.5
    },
    buttonSmall: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: 18,
    },

    // Price
    price: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        lineHeight: 26, // 20 * 1.3
    },
    priceSmall: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.bold,
        lineHeight: 22, // 16 * 1.375
    },
};
