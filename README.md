# ParaPo! ("Ang Smart at Ligtas na Byahe Mo") 🚐🇵🇭

> **React Native (Expo) Mobile Application Scaffold with TypeScript**  
> Designed for Philippine Informal and Formal Public Transit (Jeepney, Tricycle/TODA, UV Express, and Bus).

---

## 📌 Executive Summary & Brand Identity

**ParaPo!** is a mobile transit companion engineered specifically for Philippine commuters navigating both formal transit and informal transport networks (traditional jeepneys, modernized jeepneys / MPUJs, tricycle TODAs, UV Express vans, and city buses).

* **App Name**: ParaPo!
* **Tagline**: *"Ang Smart at Ligtas na Byahe Mo"*
* **Brand Design Tokens**: Trust & Safety Theme
  * **Primary Blue** (`#1E40AF` / `#3B82F6`): Authority, reliability, and transport structure.
  * **Emerald Green** (`#059669` / `#10B981`): Safety, verified routes, and active live tracking status.
  * **Neutral Grays** (`#0F172A`, `#475569`, `#F8FAFC`, `#FFFFFF`): Accessible, high-contrast readability under bright Philippine sunlight.
* **Target Platforms**: iOS & Android via Expo SDK 57 (React Native 0.86, React 19, TypeScript 6 strict).

---

## 🏗️ Clean Modular & Feature-Sliced Architecture

The repository is organized under a modular, maintainable folder structure under `src/`:

```
ParaPo/
├── App.tsx                          # Root application entry with Providers & NavigationContainer
├── app.json                         # Expo configuration (iOS bundleId & Android package)
├── babel.config.js                  # Module resolver with '@/*' path aliases
├── index.ts                         # Expo root component registration
├── package.json                     # Dependencies and build scripts
├── tsconfig.json                    # Strict TypeScript configuration with '@/*' path mapping
└── src/
    ├── api/                         # Mock API services with explicit backend TODO comments
    │   ├── mockData.ts              # Realistic PH transit routes, terminals, landmarks, & facilities
    │   ├── routeService.ts          # Route matching & multi-modal itinerary service
    │   ├── fareService.ts           # LTFRB rate matrix query & computation service
    │   ├── densityService.ts        # Commuter crowdsourced density check-in ingestion
    │   ├── trackingService.ts       # Live trip session telemetry & SMS payload generator
    │   ├── emergencyService.ts      # Hotlines, nearby hospitals & police stations query
    │   ├── assistantService.ts      # ParaPo AI Assistant Tagalog/English Q&A logic
    │   └── index.ts
    ├── components/                  # Reusable UI component library
    │   ├── common/                  # Button, Card, Badge, Header, Input, Modal, AdBannerStub
    │   ├── density/                 # DensityBadge, DensityCheckInModal ("On Route")
    │   ├── fare/                    # FareBreakdownCard, DiscountSelector (20% Student/Senior/PWD)
    │   ├── routes/                  # RouteCard, TransitModeIcon, StepDirectionItem (P2P steps)
    │   ├── safety/                  # EmergencyCallCard, LiveTrackingBanner, ShareLinkModal
    │   └── index.ts
    ├── constants/                   # Design system and Philippine regulatory constants
    │   ├── theme.ts                 # Colors, typography, spacing, border radii, shadows
    │   ├── transitModes.ts          # Traditional Jeep, Modern Jeep, TODA, UV Express, Bus
    │   ├── fareMatrices.ts          # Official LTFRB rates (Base km, Base fare, Succeeding rate)
    │   ├── emergencyContacts.ts     # National 911, PNP 117, MMDA 136, Red Cross 143, DOH 1555
    │   └── index.ts
    ├── context/                     # Application state machines
    │   ├── TierContext.tsx          # Basic (Ad-supported, 1 contact) vs Plus (Offline, unlimited)
    │   ├── LiveTrackingContext.tsx  # Active trip telemetry, SMS payload dispatch, share link
    │   └── index.ts
    ├── navigation/                  # React Navigation 6 architecture
    │   ├── types.ts                 # MainTabParamList & RootStackParamList type definitions
    │   ├── BottomTabNavigator.tsx   # 5 Core Commuter Tabs (Routes, Fare, Tracker, AI, Account)
    │   ├── RootNavigator.tsx        # Stack Navigator with modals and screen transitions
    │   └── index.ts
    ├── screens/                     # Feature screen views
    │   ├── routes/
    │   │   ├── RoutePlannerScreen.tsx   # Multi-modal search, landmark presets, route cards
    │   │   └── RouteDetailScreen.tsx    # Step-by-step P2P directions with signboard hints
    │   ├── fares/
    │   │   └── FareEstimatorScreen.tsx  # LTFRB formula calculator & 6-mode comparison matrix
    │   ├── safety/
    │   │   ├── LiveTrackerScreen.tsx    # Live trip status shell, plate input, SMS broadcast
    │   │   └── EmergencyLocatorScreen.tsx# 911 quick-dial, nearby hospitals & police stations
    │   ├── assistant/
    │   │   └── AIAssistantScreen.tsx    # ParaPo AI chat UI with interactive action pills
    │   └── account/
    │       └── AccountScreen.tsx        # Tier switcher, feature matrix, trusted contacts manager
    ├── types/                       # Comprehensive TypeScript contracts
    │   ├── transit.ts               # TransitModeType, RouteStep, Stop, RouteDensityLevel
    │   ├── fare.ts                  # FareCalculationInput, FareBreakdown, LTFRBRateRule
    │   ├── safety.ts                # LiveTripSession, GeoLocation, TrustedContact, EmergencyFacility
    │   ├── assistant.ts             # ChatMessage, PromptSuggestion
    │   ├── account.ts               # UserTier, TierFeatureConfig, UserProfile
    │   ├── navigation.ts            # Navigation prop types
    │   └── index.ts
    └── utils/                       # Pure utility engines
        ├── fareCalculator.ts        # LTFRB formula calculation with mandated 20% discount
        ├── smsPayloadGenerator.ts   # SMS text builder & tracking link generator (no social login)
        ├── formatters.ts            # Philippine Peso (₱), distance (km/m), duration formatters
        ├── validators.ts            # Philippine mobile number format validator (09XX-XXX-XXXX)
        └── index.ts
```

---

## 🧮 Core Features & Technical Implementation

### 1. Smart Route Matching & P2P Directions
* **Modes Supported**: Traditional Jeepney, Modernized PUJ, Tricycle (TODA), UV Express van, Ordinary Bus, Aircon Bus.
* **Philippine Transit Context**: Includes signboard text codes (`signboardCode` e.g., *"PHILCOA / UP DILIMAN"*), specific boarding points (e.g., *"tapat ng Farmers Plaza"*), and informal boarding instructions (e.g., *"Barya lang po sa umaga. Pasuyo ng bayad sa katabi"*).

### 2. Fare & Travel Time Estimator (LTFRB Engine)
* **LTFRB Formula Implementation** (`src/utils/fareCalculator.ts`):
  $$\text{Subtotal} = \text{BaseFare} + \left(\max(0, \text{DistanceKm} - \text{BaseDistanceKm}) \times \text{SucceedingKmRate}\right)$$
  $$\text{Discount} = \text{Subtotal} \times 0.20 \quad \text{(For Student, Senior Citizen, PWD)}$$
  $$\text{FinalFare} = \text{Subtotal} - \text{Discount}$$
* **Live Mode Comparison Matrix**: Displays cost comparison across all 6 transport modes side-by-side for any given distance.

### 3. Live Route Density ("On Route")
* **Crowdsourced Status**: Categorized into 4 standardized density states:
  * `LOW` (Maluwag / Maraming Uupuan - Emerald Green)
  * `MODERATE` (Sakto Lang / Kaunti na Lang Uupuan - Amber)
  * `HEAVY` (Siksikan / Tayuan Na - Red)
  * `FULL_STANDBY` (Punuan / Mahabang Pila - Dark Red)
* **Anonymous Check-in Modal**: Commuters can submit a 1-tap anonymous capacity check-in without collecting PII or requiring accounts.

### 4. Safety & Live Tracking
* **Privacy-First Telemetry**: Generates live session states without requiring third-party social media logins (Facebook/Google).
* **Automated SMS Payload Generator**: Creates pre-filled SMS messages with recipient, vehicle plate number, TODA body number, and a direct web tracking link (`https://parapo.ph/live-track?trip=TRIP-XXXX`).

### 5. Emergency Locator
* **National Emergency Hotlines**: 1-tap quick dial for National 911, PNP Patrol 117, MMDA 136, and Philippine Red Cross 143.
* **Nearby Emergency Facilities**: Categorized list of nearby 24/7 hospitals (ER) and PNP police stations with address, distance in kilometers, and direct telephone dialer triggers.

### 6. ParaPo AI Assistant
* **Commuter Q&A Chat UI**: Interactive chat interface with preset suggestion chips for common Philippine transit inquiries (fares, student discounts, UV terminals).
* **Action Routing**: Responses attach interactive CTA pills that deep-link commuters directly to the Fare Calculator, Route Planner, or Emergency Locator.

### 7. Account & Tier Context
* **Basic Tier (ParaPo Libre)**:
  * Ad-supported (`hasAdBanners = true`).
  * 1 Trusted Contact limit for automated SMS alerts.
  * Standard crowd density updates.
* **ParaPo Plus Tier**:
  * 100% Ad-Free experience.
  * Unlimited Trusted Contacts (`maxTrustedContacts = -1`).
  * Offline Byahe Mode (cached local route maps and LTFRB fare tables).
  * Priority real-time crowd updates.

---

## 🛠️ Handoff Guide for Full Development Team

Every mock service in `src/api/` and state context in `src/context/` has been annotated with clear `// TODO: Implement backend integration` comments. Below is the integration roadmap for backend and full-stack engineers:

| Feature / File | Stubbed Function | Recommended Backend / Integration Service |
| :--- | :--- | :--- |
| `src/api/routeService.ts` | `searchRoutes()` | OpenTripPlanner (OTP) or custom GTFS-Flex / OpenStreetMap engine for Philippine informal routes. |
| `src/api/fareService.ts` | `getActiveFareMatrices()` | Cloud CMS / LTFRB sync service to update base fares when new Memorandum Circulars are released. |
| `src/api/densityService.ts` | `submitCheckIn()` | Redis / TimescaleDB sliding-window aggregator (30-min window) rate-limited by device fingerprint. |
| `src/api/trackingService.ts` | `startTrip()`, `updateLocation()` | WebSocket / MQTT broker or AWS IoT Core for streaming GPS telemetry to web tracking subscribers. |
| `src/api/emergencyService.ts` | `getNearbyFacilities()` | Google Places API / Overpass OpenStreetMap GIS database filtered by amenities (`hospital`, `police`). |
| `src/api/assistantService.ts` | `sendMessage()` | Google Gemini 1.5 Flash / Pro API with RAG pipeline containing LTFRB fare tables and Metro Manila TODA ordinances. |
| `src/context/TierContext.tsx` | `toggleTier()` | RevenueCat or native StoreKit 2 / Google Play Billing for in-app subscription receipts. |

---

## 🚀 Running the Project

### Prerequisites
* Node.js v18+ (tested on Node v22)
* npm or yarn
* Expo Go app on a physical iOS or Android device, or Android Studio for an emulator

### Expo Go Setup (SDK 57)

1. Install the current Expo Go app from the [App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. In a terminal, open the project directory:

  ```bash
  cd "C:\Users\<your-windows-user>\OneDrive\Desktop\ParaPo!"
  ```

3. Install the project dependencies:

  ```bash
  npm install
  ```

4. Confirm that the local project is healthy:

  ```bash
  npm run typecheck
  npx expo-doctor
  ```

5. Start the development server. Use LAN first when the computer and phone are on the same Wi-Fi network:

  ```bash
  npx expo start --lan --clear
  ```

6. Open Expo Go on the phone and scan the QR code shown in the terminal or browser. On iOS, allow Expo Go to access the local network when prompted.
7. If LAN cannot connect, use an internet tunnel instead:

  ```bash
  npm install --global @expo/ngrok@4.1.3
  npx expo start --tunnel --clear
  ```

  Wait for the new QR code, then scan it from Expo Go. The computer and phone do not need to be on the same Wi-Fi network when using the tunnel.

#### Expo Go Troubleshooting

* If Expo Go reports an SDK mismatch, update Expo Go and restart the server with `npx expo start --clear`. This project requires Expo SDK 57.
* If the QR code does not connect over LAN, disable VPNs, confirm both devices are on the same network, and check that the Windows firewall allows Node.js.
* If the tunnel says `Install @expo/ngrok@^4.1.0 and try again`, run `npm install --global @expo/ngrok@4.1.3` and retry the tunnel command.
* Close any old Expo development server before starting a new one so the QR code points to the current session.

#### Android Emulator

1. Install Android Studio and, from SDK Manager, install Android SDK Platform-Tools and Android Emulator.
2. Create and start a virtual device from Android Studio's Device Manager.
3. Confirm that Android Debug Bridge is available:

  ```powershell
  adb devices
  ```

4. Start the app:

  ```powershell
  npm run android
  ```

  If `adb` is not recognized, add the Android SDK `platform-tools` directory to `PATH` and set `ANDROID_HOME` to the SDK directory.

### Commands
```bash
# Install dependencies
npm install

# Run TypeScript verification (Strict mode check)
npm run typecheck

# Start Expo development server
npm run start
```
