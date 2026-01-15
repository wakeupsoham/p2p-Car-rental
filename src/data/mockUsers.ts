export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
    role: 'owner' | 'renter' | 'both';
    isVerified: boolean;
    kycStatus: 'pending' | 'verified' | 'rejected';
    rating: number;
    reviewCount: number;
    joinedDate: string;
    totalTrips: number;
    totalEarnings?: number; // For owners
}

export const mockUsers: User[] = [
    {
        id: 'user1',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@email.com',
        phone: '+91 98765 43210',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'owner',
        isVerified: true,
        kycStatus: 'verified',
        rating: 4.8,
        reviewCount: 156,
        joinedDate: '2023-03-15',
        totalTrips: 89,
        totalEarnings: 245000,
    },
    {
        id: 'user2',
        name: 'Priya Patel',
        email: 'priya.patel@email.com',
        phone: '+91 87654 32109',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        role: 'both',
        isVerified: true,
        kycStatus: 'verified',
        rating: 4.9,
        reviewCount: 203,
        joinedDate: '2022-11-20',
        totalTrips: 145,
        totalEarnings: 380000,
    },
    {
        id: 'renter1',
        name: 'Arun Menon',
        email: 'arun.menon@email.com',
        phone: '+91 76543 21098',
        avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        role: 'renter',
        isVerified: true,
        kycStatus: 'verified',
        rating: 4.7,
        reviewCount: 45,
        joinedDate: '2024-01-10',
        totalTrips: 23,
    },
];

export const currentUser: User = mockUsers[2]; // Simulating logged in renter

export const getUserById = (id: string): User | undefined => {
    return mockUsers.find((user) => user.id === id);
};
