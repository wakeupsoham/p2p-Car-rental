import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RoleSelectionScreen } from '../screens/auth/RoleSelectionScreen';
import { RenterTabNavigator } from './RenterTabNavigator';
import { OwnerTabNavigator } from './OwnerTabNavigator';
import { CarDetailScreen } from '../screens/car/CarDetailScreen';
import { BookingScreen } from '../screens/booking/BookingScreen';

export type RootStackParamList = {
    Login: undefined;
    RoleSelection: undefined;
    RenterMain: undefined;
    OwnerMain: undefined;
    CarDetail: { carId: string };
    Booking: { carId: string; isScheduled?: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                }}
            >
                {/* Auth Screens */}
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />

                {/* Main App - Renter Flow */}
                <Stack.Screen name="RenterMain" component={RenterTabNavigator} />

                {/* Main App - Owner Flow */}
                <Stack.Screen name="OwnerMain" component={OwnerTabNavigator} />

                {/* Shared Screens */}
                <Stack.Screen
                    name="CarDetail"
                    component={CarDetailScreen}
                    options={{
                        animation: 'slide_from_bottom',
                    }}
                />
                <Stack.Screen
                    name="Booking"
                    component={BookingScreen}
                    options={{
                        animation: 'slide_from_right',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
