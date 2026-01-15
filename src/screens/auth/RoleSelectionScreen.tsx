import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../../theme';
import { Button, Card } from '../../components';

interface RoleSelectionScreenProps {
    navigation: any;
}

type UserRole = 'renter' | 'owner' | null;

export const RoleSelectionScreen: React.FC<RoleSelectionScreenProps> = ({ navigation }) => {
    const [selectedRole, setSelectedRole] = useState<UserRole>(null);

    const handleContinue = () => {
        if (selectedRole === 'renter') {
            navigation.replace('RenterMain');
        } else if (selectedRole === 'owner') {
            navigation.replace('OwnerMain');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>How do you want to use CarShare?</Text>
                    <Text style={styles.subtitle}>
                        You can change this later in settings
                    </Text>
                </View>

                {/* Role Options */}
                <View style={styles.optionsContainer}>
                    {/* Renter Option */}
                    <TouchableOpacity
                        style={[
                            styles.optionCard,
                            selectedRole === 'renter' && styles.optionCardSelected,
                        ]}
                        onPress={() => setSelectedRole('renter')}
                        activeOpacity={0.8}
                    >
                        <View style={styles.optionIcon}>
                            <Text style={styles.iconEmoji}>🔑</Text>
                        </View>
                        <Text style={styles.optionTitle}>I want to rent cars</Text>
                        <Text style={styles.optionDescription}>
                            Find and book cars from verified owners near you
                        </Text>
                        <View style={styles.features}>
                            <View style={styles.featureItem}>
                                <Text style={styles.featureIcon}>✓</Text>
                                <Text style={styles.featureText}>Browse thousands of cars</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Text style={styles.featureIcon}>✓</Text>
                                <Text style={styles.featureText}>Instant booking available</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Text style={styles.featureIcon}>✓</Text>
                                <Text style={styles.featureText}>24/7 roadside assistance</Text>
                            </View>
                        </View>
                        {selectedRole === 'renter' && (
                            <View style={styles.selectedIndicator}>
                                <Text style={styles.selectedCheck}>✓</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Owner Option */}
                    <TouchableOpacity
                        style={[
                            styles.optionCard,
                            selectedRole === 'owner' && styles.optionCardSelected,
                        ]}
                        onPress={() => setSelectedRole('owner')}
                        activeOpacity={0.8}
                    >
                        <View style={[styles.optionIcon, styles.ownerIcon]}>
                            <Text style={styles.iconEmoji}>💰</Text>
                        </View>
                        <Text style={styles.optionTitle}>I want to list my car</Text>
                        <Text style={styles.optionDescription}>
                            Earn money by sharing your car when you're not using it
                        </Text>
                        <View style={styles.features}>
                            <View style={styles.featureItem}>
                                <Text style={styles.featureIcon}>✓</Text>
                                <Text style={styles.featureText}>Earn up to ₹30,000/month</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Text style={styles.featureIcon}>✓</Text>
                                <Text style={styles.featureText}>Set your own prices</Text>
                            </View>
                            <View style={styles.featureItem}>
                                <Text style={styles.featureIcon}>✓</Text>
                                <Text style={styles.featureText}>Insurance protection</Text>
                            </View>
                        </View>
                        {selectedRole === 'owner' && (
                            <View style={styles.selectedIndicator}>
                                <Text style={styles.selectedCheck}>✓</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Continue Button */}
                <View style={styles.footer}>
                    <Button
                        title="Continue"
                        onPress={handleContinue}
                        disabled={!selectedRole}
                        size="large"
                        style={styles.continueButton}
                    />
                    <TouchableOpacity style={styles.skipButton}>
                        <Text style={styles.skipText}>I'll decide later</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: spacing.screenPadding,
    },
    header: {
        marginBottom: spacing['2xl'],
    },
    title: {
        ...textStyles.h2,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    subtitle: {
        ...textStyles.body,
        color: colors.textMuted,
    },
    optionsContainer: {
        flex: 1,
        gap: spacing.lg,
    },
    optionCard: {
        flex: 1,
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
        padding: spacing.lg,
        borderWidth: 2,
        borderColor: colors.border,
        position: 'relative',
        ...spacing.shadow.md,
    },
    optionCardSelected: {
        borderColor: colors.accent,
        backgroundColor: colors.accent + '05',
    },
    optionIcon: {
        width: 56,
        height: 56,
        borderRadius: spacing.borderRadius.lg,
        backgroundColor: colors.primary + '15',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.md,
    },
    ownerIcon: {
        backgroundColor: colors.accent + '15',
    },
    iconEmoji: {
        fontSize: 28,
    },
    optionTitle: {
        ...textStyles.h4,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    optionDescription: {
        ...textStyles.body,
        color: colors.textSecondary,
        marginBottom: spacing.md,
        lineHeight: 22,
    },
    features: {
        gap: spacing.sm,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    featureIcon: {
        color: colors.success,
        fontWeight: '700',
        marginRight: spacing.sm,
    },
    featureText: {
        ...textStyles.bodySmall,
        color: colors.textSecondary,
    },
    selectedIndicator: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedCheck: {
        color: colors.white,
        fontWeight: '700',
        fontSize: 16,
    },
    footer: {
        paddingTop: spacing.lg,
    },
    continueButton: {
        marginBottom: spacing.md,
    },
    skipButton: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    skipText: {
        ...textStyles.button,
        color: colors.textMuted,
    },
});
