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
import { Card, Button, Rating } from '../../components';
import { mockUsers } from '../../data';

interface OwnerDashboardProps {
    navigation: any;
}

// Use the first user as the owner
const ownerUser = mockUsers[0];

const ownerStats = {
    totalEarnings: 245000,
    thisMonthEarnings: 32000,
    activeListings: 2,
    totalBookings: 89,
    pendingRequests: 3,
    averageRating: 4.8,
};

const quickActions = [
    { id: 'add', icon: '➕', label: 'Add Car', screen: 'AddCar' },
    { id: 'listings', icon: '🚗', label: 'My Listings', screen: 'MyListings' },
    { id: 'bookings', icon: '📋', label: 'Bookings', screen: 'OwnerBookings' },
    { id: 'earnings', icon: '💰', label: 'Earnings', screen: 'Earnings' },
];

const recentBookings = [
    {
        id: '1',
        carName: 'Honda City 2022',
        renterName: 'Arun Menon',
        dates: 'Jan 20 - Jan 22',
        amount: 3600,
        status: 'confirmed',
    },
    {
        id: '2',
        carName: 'Hyundai Creta 2023',
        renterName: 'Deepa Krishna',
        dates: 'Jan 18 - Jan 19',
        amount: 2500,
        status: 'pending',
    },
    {
        id: '3',
        carName: 'Honda City 2022',
        renterName: 'Sanjay Gupta',
        dates: 'Jan 15 - Jan 16',
        amount: 1800,
        status: 'completed',
    },
];

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ navigation }) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return colors.success;
            case 'pending': return colors.warning;
            case 'completed': return colors.textMuted;
            default: return colors.textMuted;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greeting}>Welcome back,</Text>
                        <Text style={styles.ownerName}>{ownerUser.name.split(' ')[0]} 👋</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Text style={styles.notificationIcon}>🔔</Text>
                            <View style={styles.notificationBadge}>
                                <Text style={styles.notificationCount}>3</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Earnings Card */}
                <Card style={styles.earningsCard}>
                    <View style={styles.earningsHeader}>
                        <Text style={styles.earningsLabel}>Total Earnings</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See Details →</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.earningsAmount}>
                        ₹{ownerStats.totalEarnings.toLocaleString()}
                    </Text>
                    <View style={styles.earningsSub}>
                        <View style={styles.earningsChange}>
                            <Text style={styles.earningsChangeIcon}>📈</Text>
                            <Text style={styles.earningsChangeText}>
                                ₹{ownerStats.thisMonthEarnings.toLocaleString()} this month
                            </Text>
                        </View>
                    </View>
                </Card>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    <Card style={styles.statCard}>
                        <Text style={styles.statIcon}>🚗</Text>
                        <Text style={styles.statValue}>{ownerStats.activeListings}</Text>
                        <Text style={styles.statLabel}>Active Listings</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statIcon}>📋</Text>
                        <Text style={styles.statValue}>{ownerStats.totalBookings}</Text>
                        <Text style={styles.statLabel}>Total Trips</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statIcon}>⏳</Text>
                        <Text style={styles.statValue}>{ownerStats.pendingRequests}</Text>
                        <Text style={styles.statLabel}>Pending</Text>
                    </Card>
                    <Card style={styles.statCard}>
                        <Text style={styles.statIcon}>⭐</Text>
                        <Text style={styles.statValue}>{ownerStats.averageRating}</Text>
                        <Text style={styles.statLabel}>Avg Rating</Text>
                    </Card>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.quickActionsGrid}>
                        {quickActions.map((action) => (
                            <TouchableOpacity
                                key={action.id}
                                style={styles.quickActionCard}
                                onPress={() => navigation.navigate(action.screen)}
                            >
                                <View style={styles.quickActionIcon}>
                                    <Text style={styles.actionEmoji}>{action.icon}</Text>
                                </View>
                                <Text style={styles.quickActionLabel}>{action.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Pending Requests Banner */}
                {ownerStats.pendingRequests > 0 && (
                    <TouchableOpacity style={styles.pendingBanner}>
                        <View style={styles.pendingContent}>
                            <View style={styles.pendingIcon}>
                                <Text style={styles.pendingEmoji}>🔔</Text>
                            </View>
                            <View style={styles.pendingText}>
                                <Text style={styles.pendingTitle}>
                                    {ownerStats.pendingRequests} pending booking request{ownerStats.pendingRequests > 1 ? 's' : ''}
                                </Text>
                                <Text style={styles.pendingSubtitle}>Tap to review and respond</Text>
                            </View>
                        </View>
                        <Text style={styles.pendingArrow}>→</Text>
                    </TouchableOpacity>
                )}

                {/* Recent Bookings */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {recentBookings.map((booking) => (
                        <Card key={booking.id} style={styles.bookingCard}>
                            <View style={styles.bookingHeader}>
                                <View>
                                    <Text style={styles.bookingCarName}>{booking.carName}</Text>
                                    <Text style={styles.bookingRenter}>by {booking.renterName}</Text>
                                </View>
                                <View style={[
                                    styles.bookingStatus,
                                    { backgroundColor: getStatusColor(booking.status) + '20' }
                                ]}>
                                    <Text style={[
                                        styles.bookingStatusText,
                                        { color: getStatusColor(booking.status) }
                                    ]}>
                                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.bookingFooter}>
                                <Text style={styles.bookingDates}>📅 {booking.dates}</Text>
                                <Text style={styles.bookingAmount}>₹{booking.amount.toLocaleString()}</Text>
                            </View>
                        </Card>
                    ))}
                </View>

                {/* Add New Car CTA */}
                <View style={styles.ctaSection}>
                    <Card style={styles.ctaCard}>
                        <Text style={styles.ctaTitle}>Have another car to share?</Text>
                        <Text style={styles.ctaSubtitle}>
                            List it now and start earning more!
                        </Text>
                        <Button
                            title="Add New Car"
                            onPress={() => navigation.navigate('AddCar')}
                            variant="secondary"
                            size="medium"
                            style={styles.ctaButton}
                        />
                    </Card>
                </View>

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.screenPadding,
        paddingVertical: spacing.lg,
    },
    greeting: {
        ...textStyles.body,
        color: colors.textMuted,
    },
    ownerName: {
        ...textStyles.h2,
        color: colors.textPrimary,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    notificationButton: {
        position: 'relative',
        padding: spacing.sm,
    },
    notificationIcon: {
        fontSize: 24,
    },
    notificationBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.error,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationCount: {
        ...textStyles.labelSmall,
        color: colors.white,
        fontSize: 10,
    },
    earningsCard: {
        marginHorizontal: spacing.screenPadding,
        marginBottom: spacing.lg,
        backgroundColor: colors.primary,
    },
    earningsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    earningsLabel: {
        ...textStyles.label,
        color: colors.textInverse + '80',
    },
    seeAllText: {
        ...textStyles.labelSmall,
        color: colors.accent,
    },
    earningsAmount: {
        fontSize: 36,
        fontWeight: '700',
        color: colors.textInverse,
        marginBottom: spacing.sm,
    },
    earningsSub: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    earningsChange: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    earningsChangeIcon: {
        marginRight: spacing.xs,
    },
    earningsChangeText: {
        ...textStyles.bodySmall,
        color: colors.accent,
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: spacing.screenPadding,
        marginBottom: spacing.lg,
        gap: spacing.md,
    },
    statCard: {
        width: '47%',
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    statIcon: {
        fontSize: 24,
        marginBottom: spacing.sm,
    },
    statValue: {
        ...textStyles.h3,
        color: colors.primary,
    },
    statLabel: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
        marginTop: 4,
    },
    section: {
        marginBottom: spacing.lg,
        paddingHorizontal: spacing.screenPadding,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    sectionTitle: {
        ...textStyles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    quickActionCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
        padding: spacing.md,
        alignItems: 'center',
        ...spacing.shadow.sm,
    },
    quickActionIcon: {
        width: 48,
        height: 48,
        borderRadius: spacing.borderRadius.lg,
        backgroundColor: colors.primary + '10',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.sm,
    },
    actionEmoji: {
        fontSize: 24,
    },
    quickActionLabel: {
        ...textStyles.labelSmall,
        color: colors.textPrimary,
        textAlign: 'center',
    },
    pendingBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.screenPadding,
        marginBottom: spacing.lg,
        padding: spacing.base,
        backgroundColor: colors.warning + '15',
        borderRadius: spacing.borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.warning + '30',
    },
    pendingContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    pendingIcon: {
        width: 40,
        height: 40,
        borderRadius: spacing.borderRadius.md,
        backgroundColor: colors.warning + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    pendingEmoji: {
        fontSize: 20,
    },
    pendingText: {
        flex: 1,
    },
    pendingTitle: {
        ...textStyles.label,
        color: colors.textPrimary,
    },
    pendingSubtitle: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    pendingArrow: {
        ...textStyles.h4,
        color: colors.warning,
    },
    bookingCard: {
        marginBottom: spacing.sm,
    },
    bookingHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: spacing.md,
    },
    bookingCarName: {
        ...textStyles.body,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    bookingRenter: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    bookingStatus: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: spacing.borderRadius.full,
    },
    bookingStatusText: {
        ...textStyles.labelSmall,
        fontWeight: '600',
    },
    bookingFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bookingDates: {
        ...textStyles.bodySmall,
        color: colors.textSecondary,
    },
    bookingAmount: {
        ...textStyles.priceSmall,
        color: colors.primary,
    },
    ctaSection: {
        paddingHorizontal: spacing.screenPadding,
    },
    ctaCard: {
        backgroundColor: colors.accent + '10',
        borderWidth: 1,
        borderColor: colors.accent + '30',
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    ctaTitle: {
        ...textStyles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.xs,
    },
    ctaSubtitle: {
        ...textStyles.body,
        color: colors.textSecondary,
        marginBottom: spacing.lg,
    },
    ctaButton: {
        minWidth: 160,
    },
});
