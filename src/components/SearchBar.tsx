import React from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { colors, spacing, textStyles } from '../theme';

interface SearchBarProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    onFilterPress?: () => void;
    onFocus?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    value,
    onChangeText,
    placeholder = 'Where do you want to pick up your car?',
    onFilterPress,
    onFocus,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchIcon}>
                <Text style={styles.iconText}>🔍</Text>
            </View>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textMuted}
                onFocus={onFocus}
            />
            {onFilterPress && (
                <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
                    <Text style={styles.filterIcon}>⚙️</Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.surface,
        borderRadius: spacing.borderRadius.xl,
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.md,
        ...spacing.shadow.lg,
    },
    searchIcon: {
        marginRight: spacing.sm,
    },
    iconText: {
        fontSize: 18,
    },
    input: {
        flex: 1,
        ...textStyles.body,
        color: colors.textPrimary,
        padding: 0,
    },
    filterButton: {
        marginLeft: spacing.sm,
        padding: spacing.xs,
        backgroundColor: colors.surfaceSecondary,
        borderRadius: spacing.borderRadius.md,
    },
    filterIcon: {
        fontSize: 18,
    },
});
