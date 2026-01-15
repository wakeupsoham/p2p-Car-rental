import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Dimensions,
    StatusBar,
    Animated,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, textStyles } from '../../theme';
import { SearchBar, CategoryCard, CarCard, FilterModal, FilterState } from '../../components';
import { categories, mockCars } from '../../data';
import { CategoryType } from '../../components/CategoryCard';
import { CarType } from '../../components/CarCard';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_MIN_HEIGHT = 320;
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.75;

interface HomeScreenProps {
    navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [0, 10000],
        seats: [],
        transmission: [],
        fuelType: [],
        minRating: 0,
        instantBookOnly: false,
    });

    const bottomSheetY = useRef(new Animated.Value(0)).current;

    const handleCategoryPress = (category: CategoryType) => {
        setSelectedCategory(
            selectedCategory === category.id ? null : category.id
        );
    };

    const handleCarPress = (car: CarType) => {
        navigation.navigate('CarDetail', { carId: car.id });
    };

    const handleApplyFilters = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    // Filter cars based on selected category and filters
    const filteredCars = mockCars.filter((car) => {
        if (selectedCategory && car.category !== selectedCategory) return false;
        if (filters.minRating > 0 && car.rating < filters.minRating) return false;
        if (filters.instantBookOnly && !car.isInstantBook) return false;
        if (filters.transmission.length > 0 && !filters.transmission.includes(car.transmission)) return false;
        if (filters.fuelType.length > 0 && !filters.fuelType.includes(car.fuelType)) return false;
        if (filters.seats.length > 0) {
            const seatStr = car.seats.toString();
            if (!filters.seats.some(s => s === seatStr || (s === '8+' && car.seats >= 8))) return false;
        }
        return true;
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

            {/* Map Background */}
            <View style={styles.mapContainer}>
                {/* Placeholder for Mapbox - showing styled gradient for now */}
                <View style={styles.mapPlaceholder}>
                    <View style={styles.mapGradient} />

                    {/* Sample car pins */}
                    {mockCars.slice(0, 5).map((car, index) => (
                        <TouchableOpacity
                            key={car.id}
                            style={[
                                styles.mapPin,
                                {
                                    top: 100 + (index * 60) % 200,
                                    left: 50 + (index * 80) % (SCREEN_WIDTH - 100),
                                },
                            ]}
                            onPress={() => handleCarPress(car)}
                        >
                            <View style={styles.pinContent}>
                                <Text style={styles.pinPrice}>₹{car.pricePerDay}</Text>
                            </View>
                            <View style={styles.pinArrow} />
                        </TouchableOpacity>
                    ))}

                    {/* Current location indicator */}
                    <View style={styles.currentLocation}>
                        <View style={styles.currentLocationDot} />
                        <View style={styles.currentLocationRing} />
                    </View>
                </View>
            </View>

            {/* Search Bar - Floating */}
            <SafeAreaView style={styles.searchContainer}>
                <SearchBar
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onFilterPress={() => setShowFilters(true)}
                    placeholder="Where do you want to pick up your car?"
                />
            </SafeAreaView>

            {/* Bottom Sheet */}
            <Animated.View
                style={[
                    styles.bottomSheet,
                    { transform: [{ translateY: bottomSheetY }] }
                ]}
            >
                {/* Handle */}
                <View style={styles.handleContainer}>
                    <View style={styles.handle} />
                </View>

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    <Text style={styles.sectionTitle}>Browse by Category</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesScroll}
                    >
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onPress={handleCategoryPress}
                                isSelected={selectedCategory === category.id}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Available Cars */}
                <View style={styles.carsSection}>
                    <View style={styles.carsSectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {selectedCategory
                                ? `${categories.find(c => c.id === selectedCategory)?.name || ''} Cars`
                                : 'Available Near You'}
                        </Text>
                        <Text style={styles.carCount}>{filteredCars.length} cars</Text>
                    </View>

                    <FlatList
                        data={filteredCars}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <CarCard car={item} onPress={handleCarPress} />
                        )}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.carsList}
                    />
                </View>
            </Animated.View>

            {/* Filter Modal */}
            <FilterModal
                visible={showFilters}
                onClose={() => setShowFilters(false)}
                onApply={handleApplyFilters}
                initialFilters={filters}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    mapContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: SCREEN_HEIGHT * 0.5,
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: '#E8F4EA',
    },
    mapGradient: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#D4E8D7',
        opacity: 0.5,
    },
    mapPin: {
        position: 'absolute',
        alignItems: 'center',
    },
    pinContent: {
        backgroundColor: colors.primary,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: spacing.borderRadius.lg,
        ...spacing.shadow.lg,
    },
    pinPrice: {
        ...textStyles.priceSmall,
        color: colors.textInverse,
    },
    pinArrow: {
        width: 0,
        height: 0,
        borderLeftWidth: 8,
        borderRightWidth: 8,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: colors.primary,
    },
    currentLocation: {
        position: 'absolute',
        top: '45%',
        left: '45%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    currentLocationDot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.accent,
        borderWidth: 3,
        borderColor: colors.white,
        ...spacing.shadow.md,
    },
    currentLocationRing: {
        position: 'absolute',
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.accent + '20',
    },
    searchContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.screenPadding,
        paddingTop: spacing.sm,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
        borderTopLeftRadius: spacing.borderRadius['2xl'],
        borderTopRightRadius: spacing.borderRadius['2xl'],
        minHeight: BOTTOM_SHEET_MIN_HEIGHT,
        maxHeight: BOTTOM_SHEET_MAX_HEIGHT,
        ...spacing.shadow.xl,
    },
    handleContainer: {
        alignItems: 'center',
        paddingVertical: spacing.md,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: colors.border,
        borderRadius: 2,
    },
    categoriesSection: {
        paddingBottom: spacing.base,
    },
    sectionTitle: {
        ...textStyles.h4,
        color: colors.textPrimary,
        paddingHorizontal: spacing.screenPadding,
        marginBottom: spacing.md,
    },
    categoriesScroll: {
        paddingHorizontal: spacing.screenPadding,
    },
    carsSection: {
        flex: 1,
        paddingHorizontal: spacing.screenPadding,
    },
    carsSectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    carCount: {
        ...textStyles.label,
        color: colors.textMuted,
    },
    carsList: {
        paddingBottom: spacing['2xl'],
    },
});
