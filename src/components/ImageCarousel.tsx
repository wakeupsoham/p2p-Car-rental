import React, { useRef, useState } from 'react';
import {
    View,
    ScrollView,
    Image,
    Dimensions,
    StyleSheet,
    NativeSyntheticEvent,
    NativeScrollEvent,
} from 'react-native';
import { colors, spacing } from '../theme';

interface ImageCarouselProps {
    images: string[];
    height?: number;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ImageCarousel: React.FC<ImageCarouselProps> = ({
    images,
    height = 280,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / SCREEN_WIDTH);
        setActiveIndex(currentIndex);
    };

    return (
        <View style={[styles.container, { height }]}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {images.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={[styles.image, { width: SCREEN_WIDTH, height }]}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === activeIndex && styles.dotActive,
                        ]}
                    />
                ))}
            </View>

            {/* Image Counter */}
            <View style={styles.counter}>
                <View style={styles.counterBg}>
                    <View style={styles.counterText}>
                        {/* Using emoji for camera icon */}
                        <Image
                            source={{ uri: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"/><path d="M9 2 7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/></svg>' }}
                            style={styles.cameraIcon}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        backgroundColor: colors.surfaceSecondary,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: spacing.base,
        alignSelf: 'center',
        gap: spacing.sm,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.white + '50',
    },
    dotActive: {
        backgroundColor: colors.white,
        width: 24,
    },
    counter: {
        position: 'absolute',
        bottom: spacing.base,
        right: spacing.base,
    },
    counterBg: {
        backgroundColor: colors.overlay,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: spacing.borderRadius.lg,
    },
    counterText: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cameraIcon: {
        width: 16,
        height: 16,
        tintColor: colors.white,
    },
});
