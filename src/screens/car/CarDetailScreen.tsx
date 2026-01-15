import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../../theme';
import { ImageCarousel, Rating, Button, Card } from '../../components';
import { getCarById, getReviewsByCarId, Review } from '../../data';

interface CarDetailScreenProps {
    route: { params: { carId: string } };
    navigation: any;
}

export const CarDetailScreen: React.FC<CarDetailScreenProps> = ({ route, navigation }) => {
    const { carId } = route.params;
    const car = getCarById(carId);
    const reviews = getReviewsByCarId(carId);

    const [showFullDescription, setShowFullDescription] = useState(false);

    if (!car) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Car not found</Text>
            </SafeAreaView>
        );
    }

    const handleBookNow = () => {
        navigation.navigate('Booking', { carId: car.id });
    };

    const handleSchedule = () => {
        navigation.navigate('Booking', { carId: car.id, isScheduled: true });
    };

    const renderReviewItem = (review: Review) => (
        <Card key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
                <View style={styles.reviewerInfo}>
                    <View style={styles.reviewerAvatar}>
                        <Text style={styles.avatarText}>
                            {review.renterName.charAt(0)}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.reviewerName}>{review.renterName}</Text>
                        <Text style={styles.reviewDate}>{review.date}</Text>
                    </View>
                </View>
                <Rating rating={review.rating} size="small" showValue={false} />
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>

            {review.ownerResponse && (
                <View style={styles.ownerResponse}>
                    <Text style={styles.ownerResponseLabel}>Owner Response:</Text>
                    <Text style={styles.ownerResponseText}>{review.ownerResponse.comment}</Text>
                </View>
            )}
        </Card>
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Back Button */}
                <SafeAreaView style={styles.backButtonContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                </SafeAreaView>

                {/* Image Carousel */}
                <ImageCarousel images={car.images} height={300} />

                {/* Content */}
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <View style={styles.titleRow}>
                            <Text style={styles.carName}>
                                {car.brand} {car.model}
                            </Text>
                            <Text style={styles.year}>{car.year}</Text>
                        </View>

                        <View style={styles.ratingRow}>
                            <Rating
                                rating={car.rating}
                                reviewCount={car.reviewCount}
                                size="medium"
                            />
                            {car.isInstantBook && (
                                <View style={styles.instantBadge}>
                                    <Text style={styles.instantText}>⚡ Instant Book</Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Specs */}
                    <Card style={styles.specsCard}>
                        <View style={styles.specsGrid}>
                            <View style={styles.specItem}>
                                <Text style={styles.specIcon}>👥</Text>
                                <Text style={styles.specValue}>{car.seats}</Text>
                                <Text style={styles.specLabel}>Seats</Text>
                            </View>
                            <View style={styles.specDivider} />
                            <View style={styles.specItem}>
                                <Text style={styles.specIcon}>⚙️</Text>
                                <Text style={styles.specValue}>{car.transmission}</Text>
                                <Text style={styles.specLabel}>Transmission</Text>
                            </View>
                            <View style={styles.specDivider} />
                            <View style={styles.specItem}>
                                <Text style={styles.specIcon}>⛽</Text>
                                <Text style={styles.specValue}>{car.fuelType}</Text>
                                <Text style={styles.specLabel}>Fuel</Text>
                            </View>
                        </View>
                    </Card>

                    {/* Location */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Pickup Location</Text>
                        <Card style={styles.locationCard}>
                            <View style={styles.locationContent}>
                                <Text style={styles.locationIcon}>📍</Text>
                                <View style={styles.locationInfo}>
                                    <Text style={styles.locationText}>{car.location}</Text>
                                    {car.distance && (
                                        <Text style={styles.distanceText}>{car.distance} from your location</Text>
                                    )}
                                </View>
                            </View>
                            <TouchableOpacity style={styles.directionButton}>
                                <Text style={styles.directionText}>Get Directions</Text>
                            </TouchableOpacity>
                        </Card>
                    </View>

                    {/* Owner */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Hosted by</Text>
                        <Card style={styles.ownerCard}>
                            <View style={styles.ownerInfo}>
                                <View style={styles.ownerAvatar}>
                                    <Text style={styles.ownerAvatarText}>
                                        {car.owner.name.charAt(0)}
                                    </Text>
                                </View>
                                <View style={styles.ownerDetails}>
                                    <View style={styles.ownerNameRow}>
                                        <Text style={styles.ownerName}>{car.owner.name}</Text>
                                        {car.owner.isVerified && (
                                            <View style={styles.verifiedBadge}>
                                                <Text style={styles.verifiedIcon}>✓</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Rating rating={car.owner.rating} size="small" />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.messageButton}>
                                <Text style={styles.messageButtonText}>Message</Text>
                            </TouchableOpacity>
                        </Card>
                    </View>

                    {/* Rental Rules */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Rental Rules</Text>
                        <Card>
                            <View style={styles.ruleItem}>
                                <Text style={styles.ruleIcon}>🚗</Text>
                                <Text style={styles.ruleText}>200 km per day included</Text>
                            </View>
                            <View style={styles.ruleItem}>
                                <Text style={styles.ruleIcon}>⛽</Text>
                                <Text style={styles.ruleText}>Return with same fuel level</Text>
                            </View>
                            <View style={styles.ruleItem}>
                                <Text style={styles.ruleIcon}>🚭</Text>
                                <Text style={styles.ruleText}>No smoking allowed</Text>
                            </View>
                            <View style={styles.ruleItem}>
                                <Text style={styles.ruleIcon}>🐕</Text>
                                <Text style={styles.ruleText}>Pets allowed with cover</Text>
                            </View>
                        </Card>
                    </View>

                    {/* Reviews */}
                    <View style={styles.section}>
                        <View style={styles.reviewsHeader}>
                            <Text style={styles.sectionTitle}>Reviews</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All ({car.reviewCount})</Text>
                            </TouchableOpacity>
                        </View>

                        {reviews.slice(0, 3).map(renderReviewItem)}
                    </View>

                    {/* Spacing for bottom bar */}
                    <View style={{ height: 100 }} />
                </View>
            </ScrollView>

            {/* Bottom Booking Bar */}
            <SafeAreaView style={styles.bottomBar} edges={['bottom']}>
                <View style={styles.priceContainer}>
                    <Text style={styles.price}>₹{car.pricePerDay}</Text>
                    <Text style={styles.priceUnit}>/day</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Schedule"
                        onPress={handleSchedule}
                        variant="outline"
                        style={styles.scheduleButton}
                    />
                    <Button
                        title="Book Now"
                        onPress={handleBookNow}
                        style={styles.bookButton}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    backButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
    },
    backButton: {
        margin: spacing.base,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        ...spacing.shadow.md,
    },
    backButtonText: {
        fontSize: 24,
        color: colors.textPrimary,
    },
    content: {
        padding: spacing.screenPadding,
    },
    header: {
        marginBottom: spacing.lg,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    carName: {
        ...textStyles.h2,
        color: colors.textPrimary,
        flex: 1,
    },
    year: {
        ...textStyles.h4,
        color: colors.textMuted,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    instantBadge: {
        backgroundColor: colors.accent + '20',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: spacing.borderRadius.full,
    },
    instantText: {
        ...textStyles.labelSmall,
        color: colors.accent,
        fontWeight: '600',
    },
    specsCard: {
        marginBottom: spacing.lg,
    },
    specsGrid: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    specItem: {
        alignItems: 'center',
        flex: 1,
    },
    specIcon: {
        fontSize: 24,
        marginBottom: spacing.xs,
    },
    specValue: {
        ...textStyles.label,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    specLabel: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    specDivider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...textStyles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    locationCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    locationContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    locationIcon: {
        fontSize: 24,
        marginRight: spacing.md,
    },
    locationInfo: {
        flex: 1,
    },
    locationText: {
        ...textStyles.body,
        color: colors.textPrimary,
    },
    distanceText: {
        ...textStyles.bodySmall,
        color: colors.accent,
        marginTop: 2,
    },
    directionButton: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        backgroundColor: colors.primary + '10',
        borderRadius: spacing.borderRadius.md,
    },
    directionText: {
        ...textStyles.labelSmall,
        color: colors.primary,
        fontWeight: '600',
    },
    ownerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ownerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ownerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    ownerAvatarText: {
        ...textStyles.h4,
        color: colors.textInverse,
    },
    ownerDetails: {},
    ownerNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    ownerName: {
        ...textStyles.body,
        color: colors.textPrimary,
        fontWeight: '600',
        marginRight: spacing.xs,
    },
    verifiedBadge: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.success,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifiedIcon: {
        color: colors.white,
        fontSize: 10,
        fontWeight: '700',
    },
    messageButton: {
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        backgroundColor: colors.surfaceSecondary,
        borderRadius: spacing.borderRadius.lg,
    },
    messageButtonText: {
        ...textStyles.button,
        color: colors.primary,
    },
    ruleItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    ruleIcon: {
        fontSize: 20,
        marginRight: spacing.md,
    },
    ruleText: {
        ...textStyles.body,
        color: colors.textSecondary,
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    seeAllText: {
        ...textStyles.label,
        color: colors.accent,
    },
    reviewCard: {
        marginBottom: spacing.md,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    reviewerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    reviewerAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.primary + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    avatarText: {
        ...textStyles.label,
        color: colors.primary,
        fontWeight: '600',
    },
    reviewerName: {
        ...textStyles.label,
        color: colors.textPrimary,
    },
    reviewDate: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    reviewComment: {
        ...textStyles.body,
        color: colors.textSecondary,
        lineHeight: 22,
    },
    ownerResponse: {
        marginTop: spacing.md,
        padding: spacing.md,
        backgroundColor: colors.surfaceSecondary,
        borderRadius: spacing.borderRadius.md,
    },
    ownerResponseLabel: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
        marginBottom: spacing.xs,
    },
    ownerResponseText: {
        ...textStyles.bodySmall,
        color: colors.textSecondary,
        fontStyle: 'italic',
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.base,
        paddingBottom: spacing.lg,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        ...spacing.shadow.lg,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    price: {
        ...textStyles.h2,
        color: colors.primary,
    },
    priceUnit: {
        ...textStyles.body,
        color: colors.textMuted,
        marginLeft: 2,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    scheduleButton: {
        minWidth: 100,
    },
    bookButton: {
        minWidth: 120,
    },
});
