# P2P Car Rental Marketplace 

* A premium Peer-to-Peer car rental application built with React Native and Expo. This platform connects car owners with renters in a seamless, secure, and beautiful mobile experience.
* This is in it's very early development stages with otp, and other login services disabled. Also live location and manually navigating feature is yet to be figured out.
* You can enter the site by putting number as 9876543210 and otp as 543210

---

## Key Features

### For Renters
*   **Smart Discovery**: Interactive map and category-based browsing (Sedan, SUV, Luxury).
*   **Booking Flow**: Seamless date selection with transparent pricing breakdown.
*   **Trip Management**: Track upcoming and past trips with ease.
*   **Visual Trust**: User ratings, verified badges, and high-quality car galleries.

### For Car Owners
*   **Dashboard**: Track earnings, active listings, and booking requests.
*   **Quick Actions**: Manage your fleet and respond to renters instantly.

---

## Tech Stack

*   **Framework**: React Native with Expo
*   **Language**: TypeScript
*   **Navigation**: React Navigation (Stack + Bottom Tabs)
*   **Styling**: Custom Theme System (No external UI libraries)
*   **Maps**: Mapbox (Integration ready)

---

## Interaction & Click Feedback

The app includes sophisticated interactive elements verified in our walkthroughs:

*   **Category Chips**: Horizontal scrollable list with active states.
*   **Car Cards**: Touchable cards with hover effects and ripple feedback.
*   **Booking Calendar**: Interactive date selection with visual range indicators.
*   **Role Switcher**: Graphic cards for selecting between "Renter" and "Owner" modes.

---

## Steps to start

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/wakeupsoham/p2p-Car-rental.git
    cd p2p-car-rental
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Run the app**:
    ```bash
    # For Web
    npm run web
    
    # For Android
    npm run android
    
    # For iOS
    npm run ios
    ```

---

##  Folder Structure for better understanding

```
p2p-car-rental/
├── src/
│   ├── components/    # Reusable UI (Button, Card, Rating...)
│   ├── screens/       # Auth, Home, Car, Booking, Profile
│   ├── navigation/    # Tab and Stack Navigators
│   ├── theme/         # Colors, Spacing, Typography
│   └── data/          # Mock Services
└── App.tsx            # Entry Point
```
