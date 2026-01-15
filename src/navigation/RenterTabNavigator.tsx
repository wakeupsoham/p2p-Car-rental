import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors, spacing, textStyles } from '../theme';
import { HomeScreen } from '../screens/home/HomeScreen';
import { MyBookingsScreen } from '../screens/booking/MyBookingsScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

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

export const RenterTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarShowLabel: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="🏠" label="Home" />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="🔍" label="Search" />
                    ),
                }}
            />
            <Tab.Screen
                name="MyBookings"
                component={MyBookingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabIcon focused={focused} icon="📋" label="Trips" />
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
});
