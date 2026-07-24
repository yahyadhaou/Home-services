import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useLanguage } from '../i18n';
import TechnicalTabBar from './TechnicalTabBar';

// Auth
import LanguagePickerScreen  from '../screens/auth/LanguagePickerScreen';
import SplashScreen          from '../screens/auth/SplashScreen';
import OnboardingScreen      from '../screens/auth/OnboardingScreen';
import WelcomeScreen         from '../screens/auth/WelcomeScreen';
import LoginScreen           from '../screens/auth/LoginScreen';
import RegisterScreen        from '../screens/auth/RegisterScreen';

// Main
import HomeScreen            from '../screens/main/HomeScreen';
import ServiceCategoryScreen from '../screens/main/ServiceCategoryScreen';
import ProviderListScreen    from '../screens/main/ProviderListScreen';
import ProviderDetailScreen  from '../screens/main/ProviderDetailScreen';
import SearchScreen          from '../screens/main/SearchScreen';
import NearbyScreen          from '../screens/main/NearbyScreen';
import RelocationScreen      from '../screens/main/RelocationScreen';
import EmergencyBookingScreen from '../screens/main/EmergencyBookingScreen';
import ChatScreen            from '../screens/main/ChatScreen';
import ChatListScreen        from '../screens/main/ChatListScreen';
import LiveTrackingScreen     from '../screens/main/LiveTrackingScreen';

// Booking
import BookingScreen             from '../screens/booking/BookingScreen';
import BookingConfirmationScreen from '../screens/booking/BookingConfirmationScreen';
import MyBookingsScreen          from '../screens/booking/MyBookingsScreen';
import BookingDetailScreen       from '../screens/booking/BookingDetailScreen';

// Profile
import ProfileScreen         from '../screens/profile/ProfileScreen';
import EditProfileScreen     from '../screens/profile/EditProfileScreen';
import PaymentMethodsScreen  from '../screens/profile/PaymentMethodsScreen';
import AddPaymentScreen      from '../screens/profile/AddPaymentScreen';
import NotificationsScreen   from '../screens/profile/NotificationsScreen';
import SettingsScreen        from '../screens/profile/SettingsScreen';
import FavoritesScreen       from '../screens/profile/FavoritesScreen';
import SavedAddressesScreen  from '../screens/profile/SavedAddressesScreen';
import HelpSupportScreen     from '../screens/profile/HelpSupportScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Home / Search / Bookings / Chat / Profile live in one persistent bottom-tab
// navigator instead of flat stack pushes — route names are unchanged so every
// existing navigation.navigate('MainTabs', { screen: 'X' }) call keeps working.
const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <TechnicalTabBar {...props} />}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Nearby" component={NearbyScreen} />
    <Tab.Screen name="MyBookings" component={MyBookingsScreen} />
    <Tab.Screen name="Relocation" component={RelocationScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { hasChosenLanguage } = useLanguage();

  // First launch this session -> LanguagePicker first.
  // Once chosen, the initial route becomes Splash, so re-renders of
  // AppNavigator (e.g. after returning from Settings) never bounce
  // the user back to the picker.
  const initialRouteName = hasChosenLanguage ? 'Splash' : 'LanguagePicker';

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="LanguagePicker"      component={LanguagePickerScreen} />
        <Stack.Screen name="Splash"              component={SplashScreen} />
        <Stack.Screen name="Onboarding"          component={OnboardingScreen} />
        <Stack.Screen name="Welcome"             component={WelcomeScreen} />
        <Stack.Screen name="Login"               component={LoginScreen} />
        <Stack.Screen name="Register"            component={RegisterScreen} />
        <Stack.Screen name="MainTabs"             component={MainTabs} />
        <Stack.Screen name="ServiceCategory"     component={ServiceCategoryScreen} />
        <Stack.Screen name="ProviderList"        component={ProviderListScreen} />
        <Stack.Screen name="ProviderDetail"      component={ProviderDetailScreen} />
        <Stack.Screen name="Search"              component={SearchScreen} />
        <Stack.Screen name="ChatThread"          component={ChatScreen} />
        <Stack.Screen name="ChatList"            component={ChatListScreen} />
        <Stack.Screen name="EmergencyBooking"    component={EmergencyBookingScreen} />
        <Stack.Screen name="LiveTracking"        component={LiveTrackingScreen} />
        <Stack.Screen name="Booking"             component={BookingScreen} />
        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
        <Stack.Screen name="BookingDetail"       component={BookingDetailScreen} />
        <Stack.Screen name="EditProfile"          component={EditProfileScreen} />
        <Stack.Screen name="PaymentMethods"       component={PaymentMethodsScreen} />
        <Stack.Screen name="AddPayment"           component={AddPaymentScreen} />
        <Stack.Screen name="Notifications"        component={NotificationsScreen} />
        <Stack.Screen name="Settings"             component={SettingsScreen} />
        <Stack.Screen name="Favorites"            component={FavoritesScreen} />
        <Stack.Screen name="SavedAddresses"       component={SavedAddressesScreen} />
        <Stack.Screen name="HelpSupport"          component={HelpSupportScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
