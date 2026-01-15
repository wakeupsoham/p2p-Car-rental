import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { colors, spacing, textStyles } from '../theme';
import { Rating } from './Rating';
import { Card } from './Card';

export interface CarType {
    id: string;
    brand: string;
    model: string;
    year: number;
    images: string[];
    pricePerDay: number;
    pricePerHour: number;
    rating: number;
    reviewCount: number;
    seats: number;
    transmission: 'Manual' | 'Automatic';
    fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
    category: string;
    location: string;
    distance?: string;
    isInstantBook: boolean;
    owner: {
        id: string;
        name: string;
        avatar?: string;
        isVerified: boolean;
        rating: number;
    };
}

interface CarCardProps {
    car: CarType;
    onPress: (car: CarType) => void;
    variant?: 'horizontal' | 'vertical';
}

export const CarCard: React.FC<CarCardProps> = ({
    car,
    onPress,
    variant = 'vertical',
}) => {
    if (variant === 'horizontal') {
        return (
            <TouchableOpacity
                style={styles.horizontalContainer}
                onPress={() => onPress(car)}
                activeOpacity={0.9}
            >
                <View style={styles.horizontalImageContainer}>
                    <Image
                        source={{ uri: car.images[0] || 'https://via.placeholder.com/120x80' }}
                        style={styles.horizontalImage}
                        resizeMode="cover"
                    />
                    {car.isInstantBook && (
                        <View style={styles.instantBadge}>
                            <Text style={styles.instantText}>⚡</Text>
                        </View>
                    )}
                </View>

                <View style={styles.horizontalContent}>
                    <Text style={styles.carName} numberOfLines={1}>
                        {car.brand} {car.model}
                    </Text>
                    <Text style={styles.year}>{car.year}</Text>

                    <View style={styles.specs}>
                        <Text style={styles.specText}>{car.seats} seats</Text>
                        <Text style={styles.specDot}>•</Text>
                        <Text style={styles.specText}>{car.transmission}</Text>
                        <Text style={styles.specDot}>•</Text>
                        <Text style={styles.specText}>{car.fuelType}</Text>
                    </View>

                    <View style={styles.bottomRow}>
                        <Rating rating={car.rating} reviewCount={car.reviewCount} size="small" />
                        <Text style={styles.price}>₹{car.pricePerDay}/day</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <TouchableOpacity
            style={styles.verticalContainer}
            onPress={() => onPress(car)}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: car.images[0] || 'https://via.placeholder.com/280x160' }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {car.isInstantBook && (
                    <View style={styles.instantBadge}>
                        <Text style={styles.instantText}>⚡ Instant</Text>
                    </View>
                )}
                <View style={styles.priceTag}>
                    <Text style={styles.priceTagText}>₹{car.pricePerDay}/day</Text>
                </View>
            </View>

            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.carName} numberOfLines={1}>
                        {car.brand} {car.model}
                    </Text>
                    <Text style={styles.year}>{car.year}</Text>
                </View>

                <View style={styles.specs}>
                    <Text style={styles.specText}>{car.seats} seats</Text>
                    <Text style={styles.specDot}>•</Text>
                    <Text style={styles.specText}>{car.transmission}</Text>
                    <Text style={styles.specDot}>•</Text>
                    <Text style={styles.specText}>{car.fuelType}</Text>
                </View>

                <View style={styles.locationRow}>
                    <Text style={styles.location}>📍 {car.location}</Text>
                    {car.distance && (
                        <Text style={styles.distance}>{car.distance}</Text>
                    )}
                </View>

                <View style={styles.ratingRow}>
                    <Rating rating={car.rating} reviewCount={car.reviewCount} size="small" />
                    {car.owner.isVerified && (
                        <View style={styles.verifiedBadge}>
                            <Text style={styles.verifiedText}>✓ Verified</Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    // Vertical card styles
    verticalContainer: {
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
        overflow: 'hidden',
        marginBottom: spacing.base,
        ...spacing.shadow.lg,
    },
    imageContainer: {
        height: 160,
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    instantBadge: {
        position: 'absolute',
        top: spacing.sm,
        left: spacing.sm,
        backgroundColor: colors.accent,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: spacing.borderRadius.md,
    },
    instantText: {
        ...textStyles.labelSmall,
        color: colors.primaryDark,
        fontWeight: '600',
    },
    priceTag: {
        position: 'absolute',
        bottom: spacing.sm,
        right: spacing.sm,
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: spacing.borderRadius.lg,
    },
    priceTagText: {
        ...textStyles.priceSmall,
        color: colors.textInverse,
    },
    content: {
        padding: spacing.base,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.xs,
    },
    carName: {
        ...textStyles.h4,
        color: colors.textPrimary,
        flex: 1,
    },
    year: {
        ...textStyles.label,
        color: colors.textMuted,
        marginLeft: spacing.sm,
    },
    specs: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    specText: {
        ...textStyles.bodySmall,
        color: colors.textSecondary,
    },
    specDot: {
        marginHorizontal: spacing.xs,
        color: colors.textMuted,
    },
    locationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    location: {
        ...textStyles.bodySmall,
        color: colors.textSecondary,
    },
    distance: {
        ...textStyles.labelSmall,
        color: colors.accent,
    },
    ratingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    verifiedBadge: {
        backgroundColor: colors.success + '20',
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: spacing.borderRadius.md,
    },
    verifiedText: {
        ...textStyles.labelSmall,
        color: colors.success,
        fontWeight: '600',
    },

    // Horizontal card styles
    horizontalContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.lg,
        overflow: 'hidden',
        marginBottom: spacing.md,
        ...spacing.shadow.md,
    },
    horizontalImageContainer: {
        width: 120,
        height: 100,
        position: 'relative',
    },
    horizontalImage: {
        width: '100%',
        height: '100%',
    },
    horizontalContent: {
        flex: 1,
        padding: spacing.md,
        justifyContent: 'space-between',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    price: {
        ...textStyles.priceSmall,
        color: colors.primary,
    },
});
