# 🏠 HomeServices App — React Native (Expo SDK 54)

A complete, production-architecture home-services marketplace app for the German/European market — now with **English/French/German localization**, a **fully functional dark mode**, a **gradient-rich visual refresh**, and **real per-category service data**, across all 24 screens.

## 🌍 Language picker + i18n (English / French / German)

- **First launch only**: the very first screen the app shows is a language picker (🇬🇧 English / 🇫🇷 French / 🇩🇪 German). Once chosen, it's remembered for the session and never shown again automatically.
- **Changeable anytime in Settings**: a "Language" row under Settings opens a bottom-sheet modal to switch between all three languages on demand — this is the only place language can be changed post-launch, by design.
- **455 translated strings** across all three languages, organized by screen namespace (`login.*`, `booking.*`, `settings.*`, `serviceCategory.subServices.*`, etc.), with **zero missing keys** in any direction — verified programmatically by parsing all three dictionaries with Node and diffing every flattened key.
- **Safe fallback chain**: if a key is ever missing in the active language, it falls back to English, then to the literal key string, so a translation gap can never crash a screen.
- German wasn't an afterthought bolted onto an English-first app — the language-picker screen itself shows trilingual instructional text, and the continue-button / footnote text correctly switch to match whichever language the user has tapped, even before they've confirmed their choice.

### How it works under the hood
- `src/i18n/en.js` / `fr.js` / `de.js` — three structurally identical, namespaced dictionaries (24 namespaces each).
- `src/i18n/LanguageContext.js` — `LanguageProvider` wraps the whole app; `useLanguage()` hook exposes `{ language, setLanguage, hasChosenLanguage, t }`. Adding German required zero special-casing — the whole system was built n-language-generic from the start, so `setLanguage('de')` works exactly like `'en'`/`'fr'` did.
- `AppNavigator.js` picks its `initialRouteName` based on `hasChosenLanguage` — `LanguagePicker` on first launch, straight to `Splash` afterward, so returning from Settings never re-triggers the picker.
- A `ServiceCategoryScreen` design note: since service names are translated display strings (not stable keys), the screen internally maps translated names back to stable codes (`plumber`, `electrician`, etc.) via `resolveServiceCode()`. This was verified to round-trip correctly for **all three languages**, not just English — important because the matching works by comparing live `t()` output on both sides, not a hardcoded string.

## 🌓 Dark Mode — now fully functional across all 24 screens

Previously the dark-mode toggle in Settings flipped a local boolean that nothing else read — purely decorative. It's now wired to a real theme system:

- **`ThemeContext.js`** (new) — `ThemeProvider` + `useTheme()` hook exposing live `{ isDarkMode, toggleDarkMode, colors, typography, spacing, borderRadius, shadows }`. Toggling in Settings re-themes the entire app instantly.
- **`colors.js`** restructured around `getColors(mode)` — brand colors, gradients, and service colors stay **constant** across modes (a vibrant gradient shouldn't change), while surface tokens (`white`, `background`, the `gray` scale, plus new `card`/`border`) **flip** between light and dark palettes.
- **Every screen's styles** were converted from a static `StyleSheet.create()` object (built once at file-load time using whatever `colors` was imported) into a `createStyles(colors, ...)` function called inside the component with live theme values — the only way to actually make 24 screens re-theme on toggle.
- **Shadows auto-soften** in dark mode (60% opacity) since a black drop-shadow that reads as depth on a white card is nearly invisible against a dark one.
- **Key design rule applied screen-by-screen**: text/icons painted directly *on top of* a gradient (e.g. white text on a sunset-gradient header) stay hardcoded `#FFFFFF` in both modes — they're not surfaces and shouldn't invert. Only genuine page/card/input surfaces use the theme's `colors.*` tokens. Getting this backwards would make gradient headers unreadable or leave cards the wrong color in dark mode; this was checked screen-by-screen, including multi-style-block screens like `BookingConfirmationScreen` (3 separate `StyleSheet.create()` blocks for sub-components) and `NotificationsScreen` (whose `TYPE_META` color lookup had to move from module scope into the component body to stay theme-reactive).
- The system **StatusBar** now flips between light/dark style to match, via a small `ThemedStatusBar` component inside `App.js`.

## 🛠️ Real per-category service data (fixed the repeated-icon bug)

The "What do you need?" grid inside each service category previously showed **one generic icon repeated six times**, with placeholder labels like "Edit" / "Save" / "Retry" instead of real service names — a half-finished implementation left over from an earlier refactor.

This is now fully real data:
- **8 service categories × 6 distinct sub-services each**, every one with its own meaningful icon (e.g. Plumber: Drain Unblocking 🚿, Faucet Repair, Toilet Repair, Pipe Replacement, Water Heater Install, Bathroom Plumbing).
- **2 real FAQs per category** (16 total), specific to that trade, not generic filler.
- Fully translated in all three languages — `serviceCategory.subServices.*` and `serviceCategory.faqs.*`, verified to have matching array lengths and category keys across EN/FR/DE.
- **A real bug was caught and fixed in the process**: the gradient lookup for sub-service icon backgrounds used the service *code* directly (e.g. `electrician`) as a key into `colors.gradients`, but the gradient object's keys don't match service codes 1:1 (`electrician`→`electrical`, `heating`→`hvac`, `carpenter`→`carpentry`, `painter`→`painting`, `gardener`→`gardening`). This would have silently broken the gradient for 6 of 8 categories. Fixed with an explicit `SERVICE_META[code].gradientKey` mapping and verified all 8 resolve correctly.

## ✅ Booking Detail screen — added a way back to Home

`BookingDetailScreen` previously only offered Chat/Cancel/Review actions depending on booking status, with no way to navigate back to the Home screen short of repeated back-presses. A "Back to Home" button is now always visible at the bottom of the screen regardless of booking status, navigating directly via `navigation.navigate('Home')`.

## 🎨 Vibrant gradient visual refresh (from the previous round, unchanged)

```
sunset     #FF9500 → #FF5F6D → #6A11CB   (hero headers: picker, splash, home, login)
candy      #FF5F6D → #FFC371            (onboarding)
ocean      #2193B0 → #6DD5ED            (plumbing, provider avatars)
violet     #7F00FF → #E100FF            (secure payment, register, chat avatars)
flame      #F2994A → #F2C94C            (warm warning states)
emergency  #EB3349 → #F45C43            (kept distinct — urgency must read instantly)
midnight   #0A0E27 → #3A1C71            (profile hero)
aurora     #00C9FF → #92FE9D            (success / completed states)
+ 8 per-service-category gradients (electrical, cleaning, hvac, carpentry, painting, gardening, moving)
```

All gradients stay **constant** between light and dark mode — only surface tokens (backgrounds, grays, white/card) flip.

## ✅ Verified SDK 54 Stack (unchanged, re-confirmed this round)

| Package | Version | Source of truth |
|---|---|---|
| expo | ~54.0.0 (resolved 54.0.35) | npm |
| react | 19.1.0 | expo's bundledNativeModules.json |
| react-native | 0.81.5 | expo's bundledNativeModules.json |
| react-native-screens | ~4.16.0 | expo's bundledNativeModules.json |
| react-native-safe-area-context | ~5.6.0 | expo's bundledNativeModules.json |
| expo-linear-gradient | ~15.0.8 | expo's bundledNativeModules.json |
| @expo/vector-icons | ^15.0.3 | expo's bundledNativeModules.json |
| @react-navigation/native-stack | ^7.17.5 | npm peerDependencies check vs React 19 |
| babel-preset-expo | ~54.0.11 | expo's own package.json devDependency pin |

## 🚀 Quick Start

```bash
npm install
npx expo start
```

Scan with **Expo Go** (keep it updated — SDK 54/RN 0.81 requires the New Architecture, which only current Expo Go clients support) or press `a` / `i` for an emulator.

## 📁 Architecture

```
App.js                          → LanguageProvider → ThemeProvider → AppProvider → AppNavigator
app.json                        → sdkVersion 54.0.0
src/
  i18n/
    en.js  fr.js  de.js           455-key dictionaries, identical structure across all three
    LanguageContext.js              LanguageProvider + useLanguage() hook
    index.js                        barrel export
  constants/
    colors.js                      getColors(mode) — brand/gradients constant, surfaces flip
    ThemeContext.js                  ThemeProvider + useTheme() hook (NEW)
    typography.js  layout.js  theme.js
  context/AppContext.js
  services/        (api, auth, provider, booking, location)
  hooks/            (useProviders, useBookings, useSearch)
  utils/            (dateUtils, validation, formatUtils)
  components/common/ (Button, Input, Card, Header, Badge, EmptyState — all theme-aware)
  navigation/AppNavigator.js      24 screens
  screens/
    auth/      LanguagePicker, Splash, Onboarding, Welcome, Login, Register
    main/      Home, ServiceCategory (★ real per-category data), ProviderList, ProviderDetail, Search, EmergencyBooking, Chat
    booking/   Booking, BookingConfirmation, MyBookings, BookingDetail (★ Home button)
    profile/   Profile, EditProfile, PaymentMethods, AddPayment, Notifications, Settings (★ language + dark mode switchers), Favorites
```

**24 screens, 57 source files** (added `de.js` and `ThemeContext.js` this round).

## 🔬 Verification performed on this round of changes

1. **Bundle export** — Android and iOS both exported cleanly at every checkpoint (7 checkpoints across the dark-mode rollout alone, one after each batch of screens, plus a final checkpoint after German was added). Final: Android 2.87 MB, iOS 2.86 MB, zero errors both platforms.
2. **Determinism** — final Android export re-run twice, identical content hash both times.
3. **Import graph integrity** — 152 relative imports across all 57 source files, parsed programmatically, zero broken.
4. **Navigator ↔ screen cross-check** — 24/24 screens registered and present on disk, zero orphans.
5. **JSX `key` prop audit** — 33 JSX-rendering `.map()` calls, all confirmed to have `key` props.
6. **React 19 / RN 0.81 breaking-change sweep** — zero `defaultProps`, zero `PropTypes`, zero class components, zero string refs, zero legacy lifecycle methods, zero direct `NativeModules` access.
7. **Rules-of-Hooks compliance** — verified `useTheme()` and `useLanguage()` are never called inside loops or conditionals, and are called exactly once per component, across the entire codebase.
8. **Three-way i18n dictionary parity** — parsed `en.js`, `fr.js`, and `de.js` with Node (not just regex) and confirmed **455/455 keys match exactly** across all three, including nested array structures like `serviceCategory.subServices.*` and `serviceCategory.faqs.*` (matching category keys, matching array lengths).
9. **Gradient-key mapping bug** — caught during the service-data fix (see above), fixed, and verified all 8 service categories resolve to a valid gradient.
10. **`resolveServiceCode` round-trip check** — empirically verified that navigating Home → ServiceCategory correctly resolves the right service code for **all three languages**, not just English, since the matching logic compares live translated strings rather than a hardcoded language.

## 🔌 How screens talk to data

Unchanged from before — every screen goes through a **hook** → **service** → mock data today, marked with `// TODO` for a real backend:

```
Screen → useProviders() → providerService.getProviders() → [mock now, api.get('/providers') later]
```

## 🇩🇪 German/European Market Details (intentionally preserved)

Business names (e.g. "Müller GmbH") and a handful of sample customer review quotes remain in German regardless of selected app language — this is a deliberate design choice, the same way a real company's name or a genuine customer quote wouldn't auto-translate in a live product. All **UI chrome** (buttons, labels, headers, form fields, alerts) is fully localized in all three languages; only proper nouns and direct-quote flavor text are exempted.

- SEPA Lastschrift + IBAN validation (`DE` prefix check)
- 5-digit PLZ validation
- 24/7 emergency flow with live technician count
- Euro currency formatting

## 📌 Known Limitations (by design, not bugs)

- Backend is mocked — see `// TODO` markers in `src/services/*.js`
- No token persistence between app restarts (add `expo-secure-store` for production)
- No theme persistence between app restarts either — dark mode resets to light on a fresh launch (add `AsyncStorage` or `expo-secure-store` alongside the language choice if persistence across sessions is wanted)
- Native splash screen still uses the legacy `app.json` `splash` key (bundler accepts it silently); `expo-splash-screen@~31.0.13` is the documented upgrade path if a native pre-JS splash is wanted instead of the in-app animated `SplashScreen.js`
- No automated tests yet

## 📜 License

Template project — customize freely for your business.
