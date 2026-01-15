import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../../theme';
import { Button, Card, Rating } from '../../components';
import { getCarById } from '../../data';

interface BookingScreenProps {
    route: { params: { carId: string; isScheduled?: boolean } };
    navigation: any;
}

const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        dates.push(date);
    }
    return dates;
};

const timeSlots = [
    '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM',
];

export const BookingScreen: React.FC<BookingScreenProps> = ({ route, navigation }) => {
    const { carId, isScheduled } = route.params;
    const car = getCarById(carId);

    const [pickupDate, setPickupDate] = useState<Date | null>(null);
    const [dropoffDate, setDropoffDate] = useState<Date | null>(null);
    const [pickupTime, setPickupTime] = useState<string | null>(null);
    const [dropoffTime, setDropoffTime] = useState<string | null>(null);
    const [step, setStep] = useState<'date' | 'time' | 'confirm'>('date');

    const dates = generateDates();

    if (!car) {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Car not found</Text>
            </SafeAreaView>
        );
    }

    const formatDate = (date: Date) => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return {
            day: days[date.getDay()],
            date: date.getDate(),
            month: months[date.getMonth()],
        };
    };

    const calculateDays = () => {
        if (!pickupDate || !dropoffDate) return 0;
        const diff = dropoffDate.getTime() - pickupDate.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24)) || 1;
    };

    const days = calculateDays();
    const basePrice = car.pricePerDay * days;
    const platformFee = Math.round(basePrice * 0.1);
    const securityDeposit = 2000;
    const totalPrice = basePrice + platformFee;

    const handleConfirmBooking = () => {
        Alert.alert(
            'Booking Confirmed! 🎉',
            `Your ${car.brand} ${car.model} has been booked successfully. You will receive a confirmation shortly.`,
            [
                {
                    text: 'View My Bookings',
                    onPress: () => navigation.navigate('MyBookings'),
                },
                {
                    text: 'Back to Home',
                    onPress: () => navigation.navigate('Home'),
                },
            ]
        );
    };

    const renderDateSelection = () => (
        <>
            <Text style={styles.stepTitle}>Select Pickup Date</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateScroll}
            >
                {dates.map((date, index) => {
                    const formatted = formatDate(date);
                    const isSelected = pickupDate?.toDateString() === date.toDateString();
                    const isToday = index === 0;

                    return (
                        <TouchableOpacity
                            key={index}
                            style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                            onPress={() => setPickupDate(date)}
                        >
                            {isToday && <Text style={styles.todayLabel}>Today</Text>}
                            <Text style={[styles.dateDay, isSelected && styles.dateTextSelected]}>
                                {formatted.day}
                            </Text>
                            <Text style={[styles.dateNumber, isSelected && styles.dateTextSelected]}>
                                {formatted.date}
                            </Text>
                            <Text style={[styles.dateMonth, isSelected && styles.dateTextSelected]}>
                                {formatted.month}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>

            {pickupDate && (
                <>
                    <Text style={[styles.stepTitle, { marginTop: spacing.xl }]}>Select Drop-off Date</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.dateScroll}
                    >
                        {dates
                            .filter((date) => date >= pickupDate)
                            .map((date, index) => {
                                const formatted = formatDate(date);
                                const isSelected = dropoffDate?.toDateString() === date.toDateString();

                                return (
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.dateCard, isSelected && styles.dateCardSelected]}
                                        onPress={() => setDropoffDate(date)}
                                    >
                                        <Text style={[styles.dateDay, isSelected && styles.dateTextSelected]}>
                                            {formatted.day}
                                        </Text>
                                        <Text style={[styles.dateNumber, isSelected && styles.dateTextSelected]}>
                                            {formatted.date}
                                        </Text>
                                        <Text style={[styles.dateMonth, isSelected && styles.dateTextSelected]}>
                                            {formatted.month}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                    </ScrollView>
                </>
            )}
        </>
    );

    const renderTimeSelection = () => (
        <>
            <Text style={styles.stepTitle}>Pickup Time</Text>
            <View style={styles.timeGrid}>
                {timeSlots.map((time) => {
                    const isSelected = pickupTime === time;
                    return (
                        <TouchableOpacity
                            key={time}
                            style={[styles.timeSlot, isSelected && styles.timeSlotSelected]}
                            onPress={() => setPickupTime(time)}
                        >
                            <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                                {time}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {pickupTime && (
                <>
                    <Text style={[styles.stepTitle, { marginTop: spacing.xl }]}>Drop-off Time</Text>
                    <View style={styles.timeGrid}>
                        {timeSlots.map((time) => {
                            const isSelected = dropoffTime === time;
                            return (
                                <TouchableOpacity
                                    key={time}
                                    style={[styles.timeSlot, isSelected && styles.timeSlotSelected]}
                                    onPress={() => setDropoffTime(time)}
                                >
                                    <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                                        {time}
                                    </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                </>
            )}
        </>
    );

    const renderConfirmation = () => (
        <>
            <Text style={styles.stepTitle}>Booking Summary</Text>

            {/* Car Info */}
            <Card style={styles.summaryCard}>
                <View style={styles.carSummary}>
                    <View style={styles.carImagePlaceholder}>
                        <Text style={styles.carEmoji}>🚗</Text>
                    </View>
                    <View style={styles.carInfo}>
                        <Text style={styles.carName}>{car.brand} {car.model}</Text>
                        <Rating rating={car.rating} size="small" />
                    </View>
                </View>
            </Card>

            {/* Trip Details */}
            <Card style={styles.summaryCard}>
                <View style={styles.tripDetail}>
                    <Text style={styles.tripLabel}>Pickup</Text>
                    <Text style={styles.tripValue}>
                        {pickupDate && formatDate(pickupDate).month} {pickupDate?.getDate()}, {pickupTime}
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.tripDetail}>
                    <Text style={styles.tripLabel}>Drop-off</Text>
                    <Text style={styles.tripValue}>
                        {dropoffDate && formatDate(dropoffDate).month} {dropoffDate?.getDate()}, {dropoffTime}
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.tripDetail}>
                    <Text style={styles.tripLabel}>Duration</Text>
                    <Text style={styles.tripValue}>{days} day{days > 1 ? 's' : ''}</Text>
                </View>
            </Card>

            {/* Pricing Breakdown */}
            <Card style={styles.summaryCard}>
                <Text style={styles.pricingTitle}>Price Breakdown</Text>

                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>₹{car.pricePerDay} × {days} days</Text>
                    <Text style={styles.priceValue}>₹{basePrice.toLocaleString()}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Platform fee</Text>
                    <Text style={styles.priceValue}>₹{platformFee.toLocaleString()}</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceLabel}>Security deposit (refundable)</Text>
                    <Text style={styles.priceValueMuted}>₹{securityDeposit.toLocaleString()}</Text>
                </View>

                <View style={styles.totalDivider} />

                <View style={styles.priceRow}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>₹{totalPrice.toLocaleString()}</Text>
                </View>
            </Card>

            {/* Cancellation Policy */}
            <Card style={styles.policyCard}>
                <Text style={styles.policyTitle}>📋 Cancellation Policy</Text>
                <Text style={styles.policyText}>
                    Free cancellation up to 24 hours before pickup. After that, 50% of the rental fee applies.
                </Text>
            </Card>
        </>
    );

    const canProceed = () => {
        if (step === 'date') return pickupDate && dropoffDate;
        if (step === 'time') return pickupTime && dropoffTime;
        return true;
    };

    const handleNext = () => {
        if (step === 'date' && pickupDate && dropoffDate) {
            setStep('time');
        } else if (step === 'time' && pickupTime && dropoffTime) {
            setStep('confirm');
        } else if (step === 'confirm') {
            handleConfirmBooking();
        }
    };

    const handleBack = () => {
        if (step === 'time') setStep('date');
        else if (step === 'confirm') setStep('time');
        else navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>
                    {step === 'date' ? 'Select Dates' : step === 'time' ? 'Select Time' : 'Confirm Booking'}
                </Text>
                <View style={styles.placeholder} />
            </View>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
                <View style={[styles.progressDot, styles.progressActive]} />
                <View style={[styles.progressLine, step !== 'date' && styles.progressLineActive]} />
                <View style={[styles.progressDot, step !== 'date' && styles.progressActive]} />
                <View style={[styles.progressLine, step === 'confirm' && styles.progressLineActive]} />
                <View style={[styles.progressDot, step === 'confirm' && styles.progressActive]} />
            </View>

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {step === 'date' && renderDateSelection()}
                {step === 'time' && renderTimeSelection()}
                {step === 'confirm' && renderConfirmation()}

                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomBar}>
                <Button
                    title={step === 'confirm' ? 'Confirm & Pay' : 'Continue'}
                    onPress={handleNext}
                    disabled={!canProceed()}
                    size="large"
                    style={styles.continueButton}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.screenPadding,
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.surfaceSecondary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backButtonText: {
        fontSize: 20,
        color: colors.textPrimary,
    },
    headerTitle: {
        ...textStyles.h4,
        color: colors.textPrimary,
    },
    placeholder: {
        width: 40,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        gap: spacing.xs,
    },
    progressDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.border,
    },
    progressActive: {
        backgroundColor: colors.accent,
    },
    progressLine: {
        width: 40,
        height: 2,
        backgroundColor: colors.border,
    },
    progressLineActive: {
        backgroundColor: colors.accent,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.screenPadding,
    },
    stepTitle: {
        ...textStyles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    dateScroll: {
        paddingVertical: spacing.sm,
    },
    dateCard: {
        width: 70,
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.md,
        borderRadius: spacing.borderRadius.lg,
        backgroundColor: colors.surface,
        alignItems: 'center',
        marginRight: spacing.sm,
        borderWidth: 2,
        borderColor: colors.border,
    },
    dateCardSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    todayLabel: {
        ...textStyles.labelSmall,
        color: colors.accent,
        marginBottom: spacing.xs,
    },
    dateDay: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    dateNumber: {
        ...textStyles.h3,
        color: colors.textPrimary,
        marginVertical: 2,
    },
    dateMonth: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    dateTextSelected: {
        color: colors.textInverse,
    },
    timeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    timeSlot: {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.base,
        borderRadius: spacing.borderRadius.lg,
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border,
    },
    timeSlotSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    timeText: {
        ...textStyles.label,
        color: colors.textSecondary,
    },
    timeTextSelected: {
        color: colors.textInverse,
    },
    summaryCard: {
        marginBottom: spacing.md,
    },
    carSummary: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    carImagePlaceholder: {
        width: 80,
        height: 60,
        borderRadius: spacing.borderRadius.md,
        backgroundColor: colors.surfaceSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    carEmoji: {
        fontSize: 32,
    },
    carInfo: {
        flex: 1,
    },
    carName: {
        ...textStyles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    tripDetail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.sm,
    },
    tripLabel: {
        ...textStyles.body,
        color: colors.textMuted,
    },
    tripValue: {
        ...textStyles.body,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: colors.borderLight,
    },
    pricingTitle: {
        ...textStyles.label,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        textTransform: 'uppercase',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.sm,
    },
    priceLabel: {
        ...textStyles.body,
        color: colors.textSecondary,
    },
    priceValue: {
        ...textStyles.body,
        color: colors.textPrimary,
    },
    priceValueMuted: {
        ...textStyles.body,
        color: colors.textMuted,
    },
    totalDivider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: spacing.md,
    },
    totalLabel: {
        ...textStyles.h4,
        color: colors.textPrimary,
    },
    totalValue: {
        ...textStyles.h3,
        color: colors.primary,
    },
    policyCard: {
        backgroundColor: colors.info + '10',
        borderWidth: 1,
        borderColor: colors.info + '30',
    },
    policyTitle: {
        ...textStyles.label,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    policyText: {
        ...textStyles.bodySmall,
        color: colors.textSecondary,
        lineHeight: 20,
    },
    bottomBar: {
        padding: spacing.screenPadding,
        paddingBottom: spacing.xl,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
    continueButton: {
        width: '100%',
    },
});
