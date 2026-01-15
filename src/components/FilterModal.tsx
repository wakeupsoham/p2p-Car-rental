import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { colors, spacing, textStyles } from '../theme';
import { Button } from './Button';

interface FilterOption {
    label: string;
    value: string;
}

interface FilterModalProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: FilterState) => void;
    initialFilters?: FilterState;
}

export interface FilterState {
    priceRange: [number, number];
    seats: string[];
    transmission: string[];
    fuelType: string[];
    minRating: number;
    instantBookOnly: boolean;
}

const defaultFilters: FilterState = {
    priceRange: [0, 10000],
    seats: [],
    transmission: [],
    fuelType: [],
    minRating: 0,
    instantBookOnly: false,
};

const seatOptions: FilterOption[] = [
    { label: '2 seats', value: '2' },
    { label: '4 seats', value: '4' },
    { label: '5 seats', value: '5' },
    { label: '7 seats', value: '7' },
    { label: '8+ seats', value: '8+' },
];

const transmissionOptions: FilterOption[] = [
    { label: 'Manual', value: 'Manual' },
    { label: 'Automatic', value: 'Automatic' },
];

const fuelOptions: FilterOption[] = [
    { label: 'Petrol', value: 'Petrol' },
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Electric', value: 'Electric' },
    { label: 'Hybrid', value: 'Hybrid' },
];

const ratingOptions = [4.5, 4.0, 3.5, 3.0, 0];

export const FilterModal: React.FC<FilterModalProps> = ({
    visible,
    onClose,
    onApply,
    initialFilters = defaultFilters,
}) => {
    const [filters, setFilters] = useState<FilterState>(initialFilters);

    const toggleArrayFilter = (
        key: 'seats' | 'transmission' | 'fuelType',
        value: string
    ) => {
        setFilters((prev) => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter((v) => v !== value)
                : [...prev[key], value],
        }));
    };

    const renderChips = (
        options: FilterOption[],
        selectedValues: string[],
        onToggle: (value: string) => void
    ) => (
        <View style={styles.chipContainer}>
            {options.map((option) => (
                <TouchableOpacity
                    key={option.value}
                    style={[
                        styles.chip,
                        selectedValues.includes(option.value) && styles.chipSelected,
                    ]}
                    onPress={() => onToggle(option.value)}
                >
                    <Text
                        style={[
                            styles.chipText,
                            selectedValues.includes(option.value) && styles.chipTextSelected,
                        ]}
                    >
                        {option.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const handleReset = () => {
        setFilters(defaultFilters);
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeButton}>✕</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>Filters</Text>
                    <TouchableOpacity onPress={handleReset}>
                        <Text style={styles.resetButton}>Reset</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Seats */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Seating Capacity</Text>
                        {renderChips(seatOptions, filters.seats, (v) =>
                            toggleArrayFilter('seats', v)
                        )}
                    </View>

                    {/* Transmission */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Transmission</Text>
                        {renderChips(transmissionOptions, filters.transmission, (v) =>
                            toggleArrayFilter('transmission', v)
                        )}
                    </View>

                    {/* Fuel Type */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Fuel Type</Text>
                        {renderChips(fuelOptions, filters.fuelType, (v) =>
                            toggleArrayFilter('fuelType', v)
                        )}
                    </View>

                    {/* Minimum Rating */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Minimum Rating</Text>
                        <View style={styles.chipContainer}>
                            {ratingOptions.map((rating) => (
                                <TouchableOpacity
                                    key={rating}
                                    style={[
                                        styles.chip,
                                        filters.minRating === rating && styles.chipSelected,
                                    ]}
                                    onPress={() => setFilters((prev) => ({ ...prev, minRating: rating }))}
                                >
                                    <Text
                                        style={[
                                            styles.chipText,
                                            filters.minRating === rating && styles.chipTextSelected,
                                        ]}
                                    >
                                        {rating === 0 ? 'Any' : `${rating}+ ⭐`}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Instant Book */}
                    <View style={styles.section}>
                        <TouchableOpacity
                            style={styles.toggleRow}
                            onPress={() =>
                                setFilters((prev) => ({
                                    ...prev,
                                    instantBookOnly: !prev.instantBookOnly,
                                }))
                            }
                        >
                            <Text style={styles.sectionTitle}>Instant Book Only</Text>
                            <View
                                style={[
                                    styles.toggle,
                                    filters.instantBookOnly && styles.toggleActive,
                                ]}
                            >
                                <View
                                    style={[
                                        styles.toggleKnob,
                                        filters.instantBookOnly && styles.toggleKnobActive,
                                    ]}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button title="Apply Filters" onPress={handleApply} size="large" />
                </View>
            </View>
        </Modal>
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
        paddingVertical: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        backgroundColor: colors.surface,
    },
    closeButton: {
        fontSize: 24,
        color: colors.textMuted,
    },
    title: {
        ...textStyles.h4,
        color: colors.textPrimary,
    },
    resetButton: {
        ...textStyles.button,
        color: colors.accent,
    },
    content: {
        flex: 1,
        paddingHorizontal: spacing.screenPadding,
    },
    section: {
        paddingVertical: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: colors.borderLight,
    },
    sectionTitle: {
        ...textStyles.label,
        color: colors.textPrimary,
        marginBottom: spacing.md,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    chip: {
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
        borderRadius: spacing.borderRadius.full,
        backgroundColor: colors.surfaceSecondary,
        borderWidth: 1,
        borderColor: colors.border,
    },
    chipSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    chipText: {
        ...textStyles.label,
        color: colors.textSecondary,
    },
    chipTextSelected: {
        color: colors.textInverse,
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toggle: {
        width: 50,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.border,
        justifyContent: 'center',
        padding: 2,
    },
    toggleActive: {
        backgroundColor: colors.accent,
    },
    toggleKnob: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.white,
    },
    toggleKnobActive: {
        alignSelf: 'flex-end',
    },
    footer: {
        padding: spacing.screenPadding,
        paddingBottom: spacing.xl,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    },
});
