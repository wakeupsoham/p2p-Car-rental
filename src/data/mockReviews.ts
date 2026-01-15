export interface Review {
    id: string;
    carId: string;
    renterId: string;
    renterName: string;
    renterAvatar?: string;
    rating: number;
    comment: string;
    date: string;
    categoryRatings: {
        cleanliness: number;
        vehicleCondition: number;
        pickupExperience: number;
        ownerCommunication: number;
    };
    ownerResponse?: {
        comment: string;
        date: string;
    };
}

export const mockReviews: Review[] = [
    {
        id: 'review1',
        carId: '1',
        renterId: 'renter1',
        renterName: 'Arun Menon',
        renterAvatar: 'https://randomuser.me/api/portraits/men/55.jpg',
        rating: 5,
        comment: 'Excellent car! Very well maintained and the owner was super helpful. The car was spotlessly clean and performed great during our road trip.',
        date: '2024-01-08',
        categoryRatings: {
            cleanliness: 5,
            vehicleCondition: 5,
            pickupExperience: 5,
            ownerCommunication: 5,
        },
        ownerResponse: {
            comment: 'Thank you so much for the kind words! It was a pleasure hosting you. Looking forward to your next trip!',
            date: '2024-01-09',
        },
    },
    {
        id: 'review2',
        carId: '1',
        renterId: 'renter2',
        renterName: 'Deepa Krishna',
        renterAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
        rating: 4,
        comment: 'Good experience overall. The car was comfortable and fuel efficient. Minor delay in pickup but owner was apologetic.',
        date: '2024-01-02',
        categoryRatings: {
            cleanliness: 4,
            vehicleCondition: 5,
            pickupExperience: 3,
            ownerCommunication: 4,
        },
    },
    {
        id: 'review3',
        carId: '2',
        renterId: 'renter3',
        renterName: 'Sanjay Gupta',
        renterAvatar: 'https://randomuser.me/api/portraits/men/42.jpg',
        rating: 5,
        comment: 'The Creta was perfect for our family trip to Coorg. Plenty of space, great AC, and the owner even gave us tips for the route!',
        date: '2024-01-05',
        categoryRatings: {
            cleanliness: 5,
            vehicleCondition: 5,
            pickupExperience: 5,
            ownerCommunication: 5,
        },
    },
    {
        id: 'review4',
        carId: '4',
        renterId: 'renter4',
        renterName: 'Kavitha Rao',
        renterAvatar: 'https://randomuser.me/api/portraits/women/52.jpg',
        rating: 5,
        comment: 'Absolute luxury! The E-Class made our anniversary special. Premium experience from start to finish.',
        date: '2023-12-28',
        categoryRatings: {
            cleanliness: 5,
            vehicleCondition: 5,
            pickupExperience: 5,
            ownerCommunication: 5,
        },
        ownerResponse: {
            comment: 'Happy Anniversary once again! So glad you enjoyed the experience. You\'re always welcome!',
            date: '2023-12-29',
        },
    },
    {
        id: 'review5',
        carId: '7',
        renterId: 'renter5',
        renterName: 'Nikhil Joshi',
        renterAvatar: 'https://randomuser.me/api/portraits/men/36.jpg',
        rating: 5,
        comment: 'The Thar was an absolute beast! Took it off-roading near Chikmagalur and it handled everything perfectly. True adventure machine!',
        date: '2024-01-10',
        categoryRatings: {
            cleanliness: 4,
            vehicleCondition: 5,
            pickupExperience: 5,
            ownerCommunication: 5,
        },
    },
];

export const getReviewsByCarId = (carId: string): Review[] => {
    return mockReviews.filter((review) => review.carId === carId);
};

export const getAverageRating = (carId: string): number => {
    const reviews = getReviewsByCarId(carId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
};
