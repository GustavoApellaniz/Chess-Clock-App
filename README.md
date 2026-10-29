# Noble Chess Clock

A two-player chess clock app featuring a refined visual identity inspired by traditional chess rooms in royal palaces, combining dark wood textures with aged gold accents.

Built with React Native and Expo, the project aims to provide a simple, elegant, and practical chess timing experience on Android.

## Overview

The Noble Chess Clock is designed to manage the time of two players during a chess game. Players can configure their clocks, start the match, and switch turns by tapping their respective sides of the screen.

The visual design takes inspiration from classic chess aesthetics, emphasizing a sophisticated interface, contrasting colors, and a timeless atmosphere.

## Features

- **Two-player clock:** Separate timers for both players.
- **Turn switching:** Tap the active player's clock to stop their timer and start the opponent's.
- **Time configuration:** Configure the game through a dedicated setup screen.
- **Time expiration alarm:** Prepared audio feedback when a player's time runs out.
- **Turn-switch sound:** Prepared click sound when passing the turn.
- **Elegant visual design:** Dark wood-inspired surfaces and aged gold details.
- **Android testing:** Run the application on a physical device using Expo Go.
- **Production build path:** Prepare an Android release through EAS Build.

*Audio playback depends on the required sound files being added to the project.*

## Visual Identity

The design is inspired by traditional chess rooms and the atmosphere of royal palaces.

Key visual elements include:

- Dark wood tones.
- Aged gold accents.
- Elegant, high-contrast timer displays.
- A classic and understated chess aesthetic.

The goal is to combine a distinctive appearance with a clear interface that keeps the players' remaining time easy to read.

## Tech Stack

| Technology | Purpose |
|---|---|
| React Native | Cross-platform mobile application framework |
| Expo | Development environment and app tooling |
| Node.js | JavaScript runtime for development tools |
| npm | Dependency management |
| Expo Go | Testing on a physical mobile device |
| EAS Build | Cloud-based production builds |

## Getting Started

### Prerequisites

Before running the project, install:

- [Node.js LTS](https://nodejs.org/)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Expo Go for Android](https://expo.dev/go)

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd <project-directory>
```

Install the dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Open Expo Go on your Android phone and scan the QR code displayed in the terminal or browser.

The application should open on your device.

## Project Assets

### Sound Effects

The application is prepared to use two audio files:

| File | Purpose |
|---|---|
| `assets/sounds/click.mp3` | Short sound when a player switches turns |
| `assets/sounds/alarm.mp3` | Alarm when a player's time expires |

To enable these sounds:

1. Obtain audio files that you are legally allowed to use.
2. Convert them to MP3 if necessary.
3. Rename them exactly as shown above.
4. Place them in `assets/sounds/`.

The app can run without these files, but the corresponding sound effects will not be available.

Suggested sources for audio assets include [Freesound](https://freesound.org/), [Pixabay Sound Effects](https://pixabay.com/sound-effects/), and [Mixkit](https://mixkit.co/free-sound-effects/). Always verify the applicable license and attribution requirements for each file.

### App Icon and Splash Screen

The project configuration references the following image assets:

```text
assets/
├── icon.png
├── adaptive-icon.png
└── splash.png
```

These assets should be added before preparing a production release.

The icon should follow the dimensions and requirements of the Expo configuration. A 1024 × 1024 PNG is a suitable starting point for the main app icon, but platform-specific requirements should also be checked.

## Project Status

**Current stage: Core application under development.**

The project includes a configuration screen and the main chess clock interface. The sound integration points are prepared, but the audio files and visual assets still need to be supplied.

Before release, the application should be tested to verify timer accuracy, turn switching, time expiration, configuration handling, and behavior when the app is interrupted or moved to the background.

## Roadmap

- [ ] Add the click and alarm sound files.
- [ ] Create the app icon and splash screen.
- [ ] Test the application on Android using Expo Go.
- [ ] Validate timer behavior and edge cases.
- [ ] Test on multiple screen sizes and physical devices.
- [ ] Generate a production Android App Bundle (`.aab`) using EAS Build.
- [ ] Prepare the Google Play Store listing and screenshots.
- [ ] Review privacy requirements and store policies.
- [ ] Submit the application for Google Play review.

## Building for Production

Once the application and its assets are ready, configure [Expo Application Services (EAS)](https://docs.expo.dev/build/introduction/) to generate a production Android App Bundle.

The release process includes configuring the application identifier, validating the production configuration, creating a signed build, and testing the resulting application before submission.

Publishing also requires a Google Play developer account and compliance with the store's current requirements.

## Author

**Gustavo Fraga Apellaniz**

GitHub: [@GustavoApellaniz](https://github.com/GustavoApellaniz)

---

*A chess clock inspired by the timeless elegance of traditional chess rooms.*
