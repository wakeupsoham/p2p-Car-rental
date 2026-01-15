# P2P Car Rental Marketplace 🚗

A premium Peer-to-Peer car rental application built with React Native and Expo. This platform connects car owners with renters in a seamless, secure, and beautiful mobile experience.

![Home Screen - Dark Mode](C:/Users/soham/.gemini/antigravity/brain/cd3d3d58-a8c6-4b5d-8303-11ed1f56e0ce/home_screen_dark_1768462756217.png)

## 🌙 Premium Dark Theme (Night Mode)

The application features a "Midnight Blue" dark theme designed for eye comfort and a premium aesthetic.

![Car Detail - Dark Mode](C:/Users/soham/.gemini/antigravity/brain/cd3d3d58-a8c6-4b5d-8303-11ed1f56e0ce/car_detail_dark_1768462778811.png)

![Booking Screen - Dark Mode](C:/Users/soham/.gemini/antigravity/brain/cd3d3d58-a8c6-4b5d-8303-11ed1f56e0ce/booking_screen_dark_1768462805626.png)

## 🎥 Dark Mode Walkthrough

Watch the full user flow in our new Premium Dark Mode:

![Dark Mode Demo](C:/Users/soham/.gemini/antigravity/brain/cd3d3d58-a8c6-4b5d-8303-11ed1f56e0ce/dark_mode_showcase_1768462691245.webp)

---

## 🚀 Key Features

### For Renters
*   **Smart Discovery**: Interactive map and category-based browsing (Sedan, SUV, Luxury).
*   **Booking Flow**: Seamless date selection with transparent pricing breakdown.
*   **Trip Management**: Track upcoming and past trips with ease.
*   **Visual Trust**: User ratings, verified badges, and high-quality car galleries.

### For Car Owners
*   **Dashboard**: Track earnings, active listings, and booking requests.
*   **Quick Actions**: Manage your fleet and respond to renters instantly.

---

## 🛠 Tech Stack

*   **Framework**: React Native with Expo
*   **Language**: TypeScript
*   **Navigation**: React Navigation (Stack + Bottom Tabs)
*   **Styling**: Custom Theme System (No external UI libraries)
*   **Maps**: Mapbox (Integration ready)

---

## 🎨 Design System

We built a custom design system from scratch to ensure a unique, premium feel.

### Colors (Dark Mode Palette)
*   **Background**: `#0B1121` (Midnight Blue)
*   **Surface**: `#151E32` (Deep Navy)
*   **Primary**: `#3B82F6` (Bright Blue)
*   **Accent**: `#00D4AA` (Electric Teal)
*   **Text Primary**: `#F1F5F9` (Off-white)
*   **Text Secondary**: `#94A3B8` (Slate Gray)

### Typography
*   **Headings**: Bold, high-contrast system fonts (Inter/San Francisco).
*   **Body**: Readable sizes with relaxed line heights for comfort.
*   **Pixel Perfection**: All line heights are optimized for web and mobile rendering.

---

## 🖱️ Interaction & Click Feedback

The app includes sophisticated interactive elements verified in our walkthroughs:

*   **Category Chips**: Horizontal scrollable list with active states.
*   **Car Cards**: Touchable cards with hover effects and ripple feedback.
*   **Booking Calendar**: Interactive date selection with visual range indicators.
*   **Role Switcher**: Graphic cards for selecting between "Renter" and "Owner" modes.

---

## 🏁 Getting Started

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

## 📱 Folder Structure

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
