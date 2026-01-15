import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../../theme';
import { Card, Rating, Button } from '../../components';

interface MyBookingsScreenProps {
    navigation: any;
}

type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

interface Booking {
    id: string;
    carBrand: string;
    carModel: string;
    carYear: number;
    pickupDate: string;
    dropoffDate: string;
    pickupTime: string;
    dropoffTime: string;
    location: string;
    totalPrice: number;
    status: BookingStatus;
    ownerName: string;
    needsReview: boolean;
}

const mockBookings: Booking[] = [
    {
        id: '1',
        carBrand: 'Honda',
        carModel: 'City',
        carYear: 2022,
        pickupDate: 'Jan 20, 2026',
        dropoffDate: 'Jan 22, 2026',
        pickupTime: '10:00 AM',
        dropoffTime: '10:00 AM',
        location: 'Koramangala, Bangalore',
        totalPrice: 3960,
        status: 'upcoming',
        ownerName: 'Rahul Sharma',
        needsReview: false,
    },
    {
        id: '2',
        carBrand: 'Hyundai',
        carModel: 'Creta',
        carYear: 2023,
        pickupDate: 'Jan 10, 2026',
        dropoffDate: 'Jan 12, 2026',
        pickupTime: '09:00 AM',
        dropoffTime: '06:00 PM',
        location: 'Indiranagar, Bangalore',
        totalPrice: 5500,
        status: 'completed',
        ownerName: 'Priya Patel',
        needsReview: true,
    },
    {
        id: '3',
        carBrand: 'Maruti',
        carModel: 'Swift',
        carYear: 2021,
        pickupDate: 'Dec 25, 2025',
        dropoffDate: 'Dec 26, 2025',
        pickupTime: '08:00 AM',
        dropoffTime: '08:00 PM',
        location: 'HSR Layout, Bangalore',
        totalPrice: 1320,
        status: 'completed',
        ownerName: 'Amit Kumar',
        needsReview: false,
    },
];

export const MyBookingsScreen: React.FC<MyBookingsScreenProps> = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

    const upcomingBookings = mockBookings.filter(
        (b) => b.status === 'upcoming' || b.status === 'ongoing'
    );
    const pastBookings = mockBookings.filter(
        (b) => b.status === 'completed' || b.status === 'cancelled'
    );

    const getStatusBadge = (status: BookingStatus) => {
        const configs = {
            upcoming: { color: colors.info, text: 'Upcoming' },
            ongoing: { color: colors.success, text: 'Ongoing' },
            completed: { color: colors.textMuted, text: 'Completed' },
            cancelled: { color: colors.error, text: 'Cancelled' },
        };
        return configs[status];
    };

    const renderBookingCard = (booking: Booking) => {
        const statusConfig = getStatusBadge(booking.status);

        return (
            <Card key={booking.id} style={styles.bookingCard}>
                <View style={styles.cardHeader}>
                    <View style={styles.carInfo}>
                        <View style={styles.carImagePlaceholder}>
                            <Text style={styles.carEmoji}>🚗</Text>
                        </View>
                        <View>
                            <Text style={styles.carName}>
                                {booking.carBrand} {booking.carModel}
                            </Text>
                            <Text style={styles.carYear}>{booking.carYear}</Text>
                        </View>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
                        <Text style={[styles.statusText, { color: statusConfig.color }]}>
                            {statusConfig.text}
                        </Text>
                    </View>
                </View>

                <View style={styles.tripDetails}>
                    <View style={styles.tripRow}>
                        <View style={styles.tripPoint}>
                            <View style={styles.pickupDot} />
                            <View>
                                <Text style={styles.tripLabel}>Pickup</Text>
                                <Text style={styles.tripValue}>{booking.pickupDate}, {booking.pickupTime}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.tripLine} />
                    <View style={styles.tripRow}>
                        <View style={styles.tripPoint}>
                            <View style={styles.dropoffDot} />
                            <View>
                                <Text style={styles.tripLabel}>Drop-off</Text>
                                <Text style={styles.tripValue}>{booking.dropoffDate}, {booking.dropoffTime}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.locationRow}>
                    <Text style={styles.locationIcon}>📍</Text>
                    <Text style={styles.locationText}>{booking.location}</Text>
                </View>

                <View style={styles.cardFooter}>
                    <View>
                        <Text style={styles.priceLabel}>Total</Text>
                        <Text style={styles.priceValue}>₹{booking.totalPrice.toLocaleString()}</Text>
                    </View>

                    {booking.needsReview && (
                        <Button
                            title="Write Review"
                            onPress={() => navigation.navigate('WriteReview', { bookingId: booking.id })}
                            variant="secondary"
                            size="small"
                        />
                    )}

                    {booking.status === 'upcoming' && (
                        <View style={styles.footerButtons}>
                            <TouchableOpacity style={styles.cancelButton}>
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <Button
                                title="View Details"
                                onPress={() => { }}
                                variant="outline"
                                size="small"
                            />
                        </View>
                    )}
                </View>
            </Card>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Bookings</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]}
                    onPress={() => setActiveTab('upcoming')}
                >
                    <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
                        Upcoming ({upcomingBookings.length})
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'past' && styles.tabActive]}
                    onPress={() => setActiveTab('past')}
                >
                    <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
                        Past ({pastBookings.length})
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Booking List */}
            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {(activeTab === 'upcoming' ? upcomingBookings : pastBookings).length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>📭</Text>
                        <Text style={styles.emptyTitle}>No bookings yet</Text>
                        <Text style={styles.emptySubtitle}>
                            {activeTab === 'upcoming'
                                ? 'Your upcoming trips will appear here'
                                : 'Your past trips will appear here'}
                        </Text>
                        <Button
                            title="Browse Cars"
                            onPress={() => navigation.navigate('Home')}
                            style={styles.emptyButton}
                        />
                    </View>
                ) : (
                    (activeTab === 'upcoming' ? upcomingBookings : pastBookings).map(renderBookingCard)
                )}
                <View style={{ height: spacing['2xl'] }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: spacing.screenPadding,
        paddingVertical: spacing.lg,
    },
    headerTitle: {
        ...textStyles.h2,
        color: colors.textPrimary,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.screenPadding,
        marginBottom: spacing.md,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.md,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: colors.border,
    },
    tabActive: {
        borderBottomColor: colors.primary,
    },
    tabText: {
        ...textStyles.button,
        color: colors.textMuted,
    },
    tabTextActive: {
        color: colors.primary,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.screenPadding,
    },
    bookingCard: {
        marginBottom: spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    carInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    carImagePlaceholder: {
        width: 50,
        height: 40,
        borderRadius: spacing.borderRadius.md,
        backgroundColor: colors.surfaceSecondary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    carEmoji: {
        fontSize: 22,
    },
    carName: {
        ...textStyles.body,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    carYear: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    statusBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: spacing.borderRadius.full,
    },
    statusText: {
        ...textStyles.labelSmall,
        fontWeight: '600',
    },
    tripDetails: {
        marginBottom: spacing.md,
    },
    tripRow: {
        paddingVertical: spacing.xs,
    },
    tripPoint: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickupDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.success,
        marginRight: spacing.md,
    },
    dropoffDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: colors.error,
        marginRight: spacing.md,
    },
    tripLine: {
        width: 2,
        height: 16,
        backgroundColor: colors.border,
        marginLeft: 5,
        marginVertical: -4,
    },
    tripLabel: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    tripValue: {
        ...textStyles.body,
        color: colors.textPrimary,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.surfaceSecondary,
        borderRadius: spacing.borderRadius.md,
    },
    locationIcon: {
        fontSize: 14,
        marginRight: spacing.sm,
    },
    locationText: {
        ...textStyles.bodySmall,
        color: colors.textSecondary,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: spacing.md,
        borderTopWidth: 1,
        borderTopColor: colors.borderLight,
    },
    priceLabel: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    priceValue: {
        ...textStyles.price,
        color: colors.primary,
    },
    footerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    cancelButton: {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
    },
    cancelText: {
        ...textStyles.button,
        color: colors.error,
    },
    emptyState: {
        alignItems: 'center',
        paddingVertical: spacing['4xl'],
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: spacing.lg,
    },
    emptyTitle: {
        ...textStyles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    emptySubtitle: {
        ...textStyles.body,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: spacing.xl,
    },
    emptyButton: {
        minWidth: 160,
    },
});
