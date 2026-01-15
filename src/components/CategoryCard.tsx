import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ImageSourcePropType,
} from 'react-native';
import { colors, spacing, textStyles } from '../theme';
import { Rating } from './Rating';

export interface CategoryType {
    id: string;
    name: string;
    icon: string;
    avgPrice: number;
    seats: string;
    rating: number;
    color: string;
}

interface CategoryCardProps {
    category: CategoryType;
    onPress: (category: CategoryType) => void;
    isSelected?: boolean;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
    category,
    onPress,
    isSelected = false,
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                isSelected && styles.selected,
                { borderColor: isSelected ? category.color : colors.border },
            ]}
            onPress={() => onPress(category)}
            activeOpacity={0.8}
        >
            <View style={[styles.iconContainer, { backgroundColor: category.color + '20' }]}>
                <Text style={styles.icon}>{category.icon}</Text>
            </View>

            <Text style={styles.name}>{category.name}</Text>

            <View style={styles.details}>
                <Text style={styles.price}>₹{category.avgPrice}/day</Text>
                <Text style={styles.seats}>{category.seats}</Text>
            </View>

            <Rating rating={category.rating} size="small" showValue={false} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
        padding: spacing.base,
        marginRight: spacing.md,
        width: 140,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.border,
        ...spacing.shadow.md,
    },
    selected: {
        borderWidth: 2,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: spacing.borderRadius.lg,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    icon: {
        fontSize: 28,
    },
    name: {
        ...textStyles.label,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    details: {
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    price: {
        ...textStyles.priceSmall,
        color: colors.accent,
    },
    seats: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
        marginTop: 2,
    },
});
