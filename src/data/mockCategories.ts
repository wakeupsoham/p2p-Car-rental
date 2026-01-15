import { colors } from '../theme';
import { CategoryType } from '../components/CategoryCard';

export const categories: CategoryType[] = [
    {
        id: 'hatchback',
        name: 'Hatchback',
        icon: '🚗',
        avgPrice: 1200,
        seats: '4-5 seats',
        rating: 4.3,
        color: colors.hatchback,
    },
    {
        id: 'sedan',
        name: 'Sedan',
        icon: '🚘',
        avgPrice: 1800,
        seats: '4-5 seats',
        rating: 4.5,
        color: colors.sedan,
    },
    {
        id: 'suv',
        name: 'SUV',
        icon: '🚙',
        avgPrice: 2500,
        seats: '5-7 seats',
        rating: 4.6,
        color: colors.suv,
    },
    {
        id: 'luxury',
        name: 'Luxury',
        icon: '✨',
        avgPrice: 5000,
        seats: '4-5 seats',
        rating: 4.8,
        color: colors.luxury,
    },
    {
        id: 'ultra-luxury',
        name: 'Ultra-Luxury',
        icon: '👑',
        avgPrice: 15000,
        seats: '4 seats',
        rating: 4.9,
        color: colors.ultraLuxury,
    },
    {
        id: 'offroad',
        name: 'Off-road',
        icon: '🏔️',
        avgPrice: 3500,
        seats: '5-7 seats',
        rating: 4.4,
        color: colors.offroad,
    },
];
