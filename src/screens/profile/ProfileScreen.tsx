import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../../theme';
import { Card, Rating } from '../../components';
import { currentUser } from '../../data';

interface ProfileScreenProps {
    navigation: any;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const menuItems = [
        { id: 'trips', icon: '📋', label: 'My Trips', screen: 'MyBookings' },
        { id: 'favorites', icon: '❤️', label: 'Favorites', screen: 'Favorites' },
        { id: 'payments', icon: '💳', label: 'Payment Methods', screen: 'Payments' },
        { id: 'documents', icon: '📄', label: 'Documents', screen: 'Documents' },
        { id: 'notifications', icon: '🔔', label: 'Notifications', screen: 'Notifications' },
        { id: 'help', icon: '❓', label: 'Help & Support', screen: 'Help' },
        { id: 'settings', icon: '⚙️', label: 'Settings', screen: 'Settings' },
    ];

    const handleLogout = () => {
        navigation.replace('Login');
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Profile</Text>
                </View>

                {/* User Info Card */}
                <Card style={styles.userCard}>
                    <View style={styles.userInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {currentUser.name.charAt(0)}
                            </Text>
                        </View>
                        <View style={styles.userDetails}>
                            <View style={styles.nameRow}>
                                <Text style={styles.userName}>{currentUser.name}</Text>
                                {currentUser.isVerified && (
                                    <View style={styles.verifiedBadge}>
                                        <Text style={styles.verifiedIcon}>✓</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.userEmail}>{currentUser.email}</Text>
                            <Rating rating={currentUser.rating} reviewCount={currentUser.reviewCount} size="small" />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </Card>

                {/* Stats */}
                <Card style={styles.statsCard}>
                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{currentUser.totalTrips}</Text>
                            <Text style={styles.statLabel}>Trips</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{currentUser.rating}</Text>
                            <Text style={styles.statLabel}>Rating</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>
                                {new Date().getFullYear() - new Date(currentUser.joinedDate).getFullYear() || 1}yr
                            </Text>
                            <Text style={styles.statLabel}>Member</Text>
                        </View>
                    </View>
                </Card>

                {/* Become a Host Banner */}
                {currentUser.role === 'renter' && (
                    <TouchableOpacity style={styles.hostBanner}>
                        <View style={styles.hostBannerContent}>
                            <View style={styles.hostBannerIcon}>
                                <Text style={styles.hostEmoji}>💰</Text>
                            </View>
                            <View style={styles.hostBannerText}>
                                <Text style={styles.hostTitle}>Become a Host</Text>
                                <Text style={styles.hostSubtitle}>
                                    Share your car and earn up to ₹30,000/month
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.hostArrow}>→</Text>
                    </TouchableOpacity>
                )}

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={item.id}
                            style={[
                                styles.menuItem,
                                index === menuItems.length - 1 && styles.menuItemLast,
                            ]}
                            onPress={() => { }}
                        >
                            <View style={styles.menuItemLeft}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                            </View>
                            <Text style={styles.menuArrow}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                {/* Version */}
                <Text style={styles.version}>Version 1.0.0</Text>
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
    userCard: {
        marginHorizontal: spacing.screenPadding,
        marginBottom: spacing.md,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    avatarText: {
        ...textStyles.h2,
        color: colors.textInverse,
    },
    userDetails: {
        flex: 1,
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    userName: {
        ...textStyles.h4,
        color: colors.textPrimary,
        marginRight: spacing.sm,
    },
    verifiedBadge: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.success,
        alignItems: 'center',
        justifyContent: 'center',
    },
    verifiedIcon: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '700',
    },
    userEmail: {
        ...textStyles.bodySmall,
        color: colors.textMuted,
        marginBottom: spacing.xs,
    },
    editButton: {
        alignSelf: 'flex-start',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.surfaceSecondary,
        borderRadius: spacing.borderRadius.lg,
    },
    editButtonText: {
        ...textStyles.button,
        color: colors.primary,
    },
    statsCard: {
        marginHorizontal: spacing.screenPadding,
        marginBottom: spacing.lg,
    },
    statsGrid: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        ...textStyles.h3,
        color: colors.primary,
        marginBottom: 4,
    },
    statLabel: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border,
    },
    hostBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: spacing.screenPadding,
        marginBottom: spacing.lg,
        padding: spacing.base,
        backgroundColor: colors.accent + '15',
        borderRadius: spacing.borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.accent + '30',
    },
    hostBannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    hostBannerIcon: {
        width: 48,
        height: 48,
        borderRadius: spacing.borderRadius.lg,
        backgroundColor: colors.accent + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacing.md,
    },
    hostEmoji: {
        fontSize: 24,
    },
    hostBannerText: {
        flex: 1,
    },
    hostTitle: {
        ...textStyles.label,
        color: colors.textPrimary,
        marginBottom: 2,
    },
    hostSubtitle: {
        ...textStyles.bodySmall,
        color: colors.textSecondary,
    },
    hostArrow: {
        ...textStyles.h4,
        color: colors.accent,
    },
    menuContainer: {
        backgroundColor: colors.surface,
        marginHorizontal: spacing.screenPadding,
        borderRadius: spacing.borderRadius.xl,
        marginBottom: spacing.lg,
        ...spacing.shadow.sm,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: spacing.base,
        paddingHorizontal: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    menuItemLast: {
        borderBottomWidth: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 20,
        marginRight: spacing.md,
    },
    menuLabel: {
        ...textStyles.body,
        color: colors.textPrimary,
    },
    menuArrow: {
        fontSize: 24,
        color: colors.textMuted,
    },
    logoutButton: {
        alignItems: 'center',
        marginHorizontal: spacing.screenPadding,
        paddingVertical: spacing.base,
        marginBottom: spacing.md,
    },
    logoutText: {
        ...textStyles.button,
        color: colors.error,
    },
    version: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
        textAlign: 'center',
        marginBottom: spacing['2xl'],
    },
});
