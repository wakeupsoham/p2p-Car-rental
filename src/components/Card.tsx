import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../theme';

interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'elevated' | 'outlined';
    padding?: keyof typeof spacing | number;
    style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'cardPadding',
    style,
}) => {
    const getVariantStyle = (): ViewStyle => {
        switch (variant) {
            case 'elevated':
                return {
                    ...spacing.shadow.lg,
                };
            case 'outlined':
                return {
                    borderWidth: 1,
                    borderColor: colors.border,
                    shadowOpacity: 0,
                    elevation: 0,
                };
            default:
                return spacing.shadow.md;
        }
    };

    const paddingValue = typeof padding === 'number'
        ? padding
        : spacing[padding] || spacing.cardPadding;

    return (
        <View style={[styles.card, getVariantStyle(), { padding: paddingValue }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
    },
});
