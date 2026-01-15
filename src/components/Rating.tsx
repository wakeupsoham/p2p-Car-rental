import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, textStyles } from '../theme';

interface RatingProps {
    rating: number;
    maxRating?: number;
    size?: 'small' | 'medium' | 'large';
    showValue?: boolean;
    reviewCount?: number;
    style?: ViewStyle;
}

export const Rating: React.FC<RatingProps> = ({
    rating,
    maxRating = 5,
    size = 'medium',
    showValue = true,
    reviewCount,
    style,
}) => {
    const starSizes = {
        small: 12,
        medium: 16,
        large: 20,
    };

    const starSize = starSizes[size];

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < maxRating; i++) {
            let starColor = colors.starEmpty;

            if (i < fullStars) {
                starColor = colors.star;
            } else if (i === fullStars && hasHalfStar) {
                starColor = colors.star; // For simplicity, showing full star for half
            }

            stars.push(
                <Text
                    key={i}
                    style={[
                        styles.star,
                        { fontSize: starSize, color: starColor },
                    ]}
                >
                    ★
                </Text>
            );
        }

        return stars;
    };

    return (
        <View style={[styles.container, style]}>
            <View style={styles.starsContainer}>
                {renderStars()}
            </View>
            {showValue && (
                <Text style={[
                    size === 'small' ? textStyles.labelSmall : textStyles.label,
                    styles.ratingValue,
                ]}>
                    {rating.toFixed(1)}
                </Text>
            )}
            {reviewCount !== undefined && (
                <Text style={[
                    size === 'small' ? textStyles.labelSmall : textStyles.label,
                    styles.reviewCount,
                ]}>
                    ({reviewCount})
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    starsContainer: {
        flexDirection: 'row',
    },
    star: {
        marginRight: 2,
    },
    ratingValue: {
        marginLeft: spacing.xs,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    reviewCount: {
        marginLeft: spacing.xs,
        color: colors.textMuted,
    },
});
