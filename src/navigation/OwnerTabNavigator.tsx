import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacing, textStyles } from '../theme';
import { OwnerDashboard } from '../screens/owner/OwnerDashboard';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

// Placeholder screens
const MyListingsScreen = () => (
    <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>🚗 My Listings</Text>
        <Text style={styles.placeholderSubtext}>Coming soon</Text>
    </View>
);

const OwnerBookingsScreen = () => (
    <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>📋 Booking Requests</Text>
        <Text style={styles.placeholderSubtext}>Coming soon</Text>
    </View>
);

interface TabIconProps {
    focused: boolean;
    icon: string;
    label: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, icon, label }) => (
    <View style={styles.tabItem}>
        <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>{icon}</Text>
        <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>{label}</Text>
    </View>
);

export const OwnerTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={OwnerDashboard}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="📊" label="Dashboard" />
                    ),
                }}
            />
            <Tab.Screen
                name="MyListings"
                component={MyListingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="🚗" label="Listings" />
                    ),
                }}
            />
            <Tab.Screen
                name="OwnerBookings"
                component={OwnerBookingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="📋" label="Bookings" />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="👤" label="Profile" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
        height: 70,
        paddingTop: spacing.sm,
        paddingBottom: spacing.sm,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIcon: {
        fontSize: 22,
        marginBottom: 4,
    },
    tabIconActive: {
        transform: [{ scale: 1.1 }],
    },
    tabLabel: {
        ...textStyles.labelSmall,
        color: colors.textMuted,
    },
    tabLabelActive: {
        color: colors.primary,
        fontWeight: '600',
    },
    placeholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background,
    },
    placeholderText: {
        fontSize: 32,
        marginBottom: spacing.md,
    },
    placeholderSubtext: {
        ...textStyles.body,
        color: colors.textMuted,
    },
});
