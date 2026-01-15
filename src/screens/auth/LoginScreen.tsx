import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../../theme';
import { Button } from '../../components';

interface LoginScreenProps {
    navigation: any;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState<'phone' | 'otp'>('phone');
    const [loading, setLoading] = useState(false);

    const handleSendOTP = () => {
        if (phoneNumber.length >= 10) {
            setLoading(true);
            // Simulate OTP sending
            setTimeout(() => {
                setLoading(false);
                setStep('otp');
            }, 1500);
        }
    };

    const handleVerifyOTP = () => {
        if (otp.length === 6) {
            setLoading(true);
            // Simulate OTP verification
            setTimeout(() => {
                setLoading(false);
                navigation.replace('RoleSelection');
            }, 1500);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Logo/Header */}
                    <View style={styles.header}>
                        <View style={styles.logoContainer}>
                            <Text style={styles.logoEmoji}>🚗</Text>
                        </View>
                        <Text style={styles.title}>CarShare</Text>
                        <Text style={styles.subtitle}>
                            Rent cars from people around you
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {step === 'phone' ? (
                            <>
                                <Text style={styles.formTitle}>Enter your phone number</Text>
                                <Text style={styles.formSubtitle}>
                                    We'll send you a verification code
                                </Text>

                                <View style={styles.inputContainer}>
                                    <View style={styles.countryCode}>
                                        <Text style={styles.countryFlag}>🇮🇳</Text>
                                        <Text style={styles.countryCodeText}>+91</Text>
                                    </View>
                                    <TextInput
                                        style={styles.phoneInput}
                                        placeholder="Enter phone number"
                                        placeholderTextColor={colors.textMuted}
                                        keyboardType="phone-pad"
                                        value={phoneNumber}
                                        onChangeText={setPhoneNumber}
                                        maxLength={10}
                                    />
                                </View>

                                <Button
                                    title="Send OTP"
                                    onPress={handleSendOTP}
                                    loading={loading}
                                    disabled={phoneNumber.length < 10}
                                    size="large"
                                    style={styles.button}
                                />
                            </>
                        ) : (
                            <>
                                <Text style={styles.formTitle}>Verify your number</Text>
                                <Text style={styles.formSubtitle}>
                                    Enter the 6-digit code sent to +91 {phoneNumber}
                                </Text>

                                <View style={styles.otpContainer}>
                                    <TextInput
                                        style={styles.otpInput}
                                        placeholder="• • • • • •"
                                        placeholderTextColor={colors.textMuted}
                                        keyboardType="number-pad"
                                        value={otp}
                                        onChangeText={setOtp}
                                        maxLength={6}
                                        textAlign="center"
                                    />
                                </View>

                                <Button
                                    title="Verify & Continue"
                                    onPress={handleVerifyOTP}
                                    loading={loading}
                                    disabled={otp.length < 6}
                                    size="large"
                                    style={styles.button}
                                />

                                <TouchableOpacity
                                    style={styles.resendContainer}
                                    onPress={() => setStep('phone')}
                                >
                                    <Text style={styles.resendText}>
                                        Didn't receive code? <Text style={styles.resendLink}>Resend</Text>
                                    </Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>

                    {/* Social Login */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>or continue with</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialButtons}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialIcon}>G</Text>
                            <Text style={styles.socialText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Text style={styles.socialIcon}>f</Text>
                            <Text style={styles.socialText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Terms */}
                    <Text style={styles.terms}>
                        By continuing, you agree to our{' '}
                        <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                        <Text style={styles.termsLink}>Privacy Policy</Text>
                    </Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: spacing.screenPadding,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing['3xl'],
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacing.lg,
        ...spacing.shadow.lg,
    },
    logoEmoji: {
        fontSize: 40,
    },
    title: {
        ...textStyles.h1,
        color: colors.primary,
        marginBottom: spacing.md,
        lineHeight: 44,
    },
    subtitle: {
        ...textStyles.body,
        color: colors.textSecondary,
        textAlign: 'center',
        lineHeight: 24,
        marginTop: spacing.xs,
    },
    form: {
        marginBottom: spacing.xl,
    },
    formTitle: {
        ...textStyles.h3,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
    },
    formSubtitle: {
        ...textStyles.body,
        color: colors.textMuted,
        marginBottom: spacing.xl,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: spacing.lg,
        overflow: 'hidden',
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        backgroundColor: colors.surfaceSecondary,
        borderRightWidth: 1,
        borderRightColor: colors.border,
    },
    countryFlag: {
        fontSize: 20,
        marginRight: spacing.sm,
    },
    countryCodeText: {
        ...textStyles.body,
        color: colors.textPrimary,
        fontWeight: '600',
    },
    phoneInput: {
        flex: 1,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        ...textStyles.body,
        color: colors.textPrimary,
    },
    otpContainer: {
        marginBottom: spacing.lg,
    },
    otpInput: {
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        ...textStyles.h2,
        color: colors.textPrimary,
        letterSpacing: 8,
    },
    button: {
        marginBottom: spacing.md,
    },
    resendContainer: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    resendText: {
        ...textStyles.body,
        color: colors.textMuted,
    },
    resendLink: {
        color: colors.accent,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: colors.border,
    },
    dividerText: {
        ...textStyles.bodySmall,
        color: colors.textMuted,
        marginHorizontal: spacing.md,
    },
    socialButtons: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    socialButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
        borderWidth: 1,
        borderColor: colors.border,
    },
    socialIcon: {
        fontSize: 18,
        fontWeight: '700',
        marginRight: spacing.sm,
        color: colors.textPrimary,
    },
    socialText: {
        ...textStyles.button,
        color: colors.textPrimary,
    },
    terms: {
        ...textStyles.bodySmall,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: spacing.xl,
        lineHeight: 20,
    },
    termsLink: {
        color: colors.accent,
    },
});
