import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { colors, spacing, textStyles } from '../theme';

interface ButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    style,
    textStyle,
    icon,
}) => {
    const getButtonStyle = (): ViewStyle => {
        const baseStyle: ViewStyle = {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: spacing.borderRadius.lg,
            ...spacing.shadow.md,
        };

        // Size styles
        const sizeStyles: Record<string, ViewStyle> = {
            small: { paddingVertical: spacing.sm, paddingHorizontal: spacing.md },
            medium: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg },
            large: { paddingVertical: spacing.base, paddingHorizontal: spacing.xl },
        };

        // Variant styles
        const variantStyles: Record<string, ViewStyle> = {
            primary: { backgroundColor: colors.primary },
            secondary: { backgroundColor: colors.accent },
            outline: {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: colors.primary,
                ...{ shadowOpacity: 0, elevation: 0 },
            },
            ghost: {
                backgroundColor: 'transparent',
                ...{ shadowOpacity: 0, elevation: 0 },
            },
        };

        return {
            ...baseStyle,
            ...sizeStyles[size],
            ...variantStyles[variant],
            opacity: disabled ? 0.5 : 1,
        };
    };

    const getTextStyle = (): TextStyle => {
        const sizeStyles: Record<string, TextStyle> = {
            small: textStyles.buttonSmall,
            medium: textStyles.button,
            large: { ...textStyles.button, fontSize: 18 },
        };

        const variantStyles: Record<string, TextStyle> = {
            primary: { color: colors.textInverse },
            secondary: { color: colors.primaryDark },
            outline: { color: colors.primary },
            ghost: { color: colors.primary },
        };

        return {
            ...sizeStyles[size],
            ...variantStyles[variant],
        };
    };

    return (
        <TouchableOpacity
            style={[styles.button, getButtonStyle(), style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator
                    color={variant === 'primary' ? colors.white : colors.primary}
                    size="small"
                />
            ) : (
                <>
                    {icon && <>{icon}</>}
                    <Text style={[getTextStyle(), icon && styles.textWithIcon, textStyle]}>
                        {title}
                    </Text>
                </>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        minWidth: 100,
    },
    textWithIcon: {
        marginLeft: spacing.sm,
    },
});
