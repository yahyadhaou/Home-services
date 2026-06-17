import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth
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
import EmergencyBookingScreen from '../screens/main/EmergencyBookingScreen';
import ChatScreen            from '../screens/main/ChatScreen';

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

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="Splash"              component={SplashScreen} />
      <Stack.Screen name="Onboarding"          component={OnboardingScreen} />
      <Stack.Screen name="Welcome"             component={WelcomeScreen} />
      <Stack.Screen name="Login"               component={LoginScreen} />
      <Stack.Screen name="Register"            component={RegisterScreen} />
      <Stack.Screen name="Home"                component={HomeScreen} />
      <Stack.Screen name="ServiceCategory"     component={ServiceCategoryScreen} />
      <Stack.Screen name="ProviderList"        component={ProviderListScreen} />
      <Stack.Screen name="ProviderDetail"      component={ProviderDetailScreen} />
      <Stack.Screen name="Search"              component={SearchScreen} />
      <Stack.Screen name="EmergencyBooking"    component={EmergencyBookingScreen} />
      <Stack.Screen name="Chat"                component={ChatScreen} />
      <Stack.Screen name="Booking"             component={BookingScreen} />
      <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
      <Stack.Screen name="MyBookings"          component={MyBookingsScreen} />
      <Stack.Screen name="BookingDetail"       component={BookingDetailScreen} />
      <Stack.Screen name="Profile"             component={ProfileScreen} />
      <Stack.Screen name="EditProfile"         component={EditProfileScreen} />
      <Stack.Screen name="PaymentMethods"      component={PaymentMethodsScreen} />
      <Stack.Screen name="AddPayment"          component={AddPaymentScreen} />
      <Stack.Screen name="Notifications"       component={NotificationsScreen} />
      <Stack.Screen name="Settings"            component={SettingsScreen} />
      <Stack.Screen name="Favorites"           component={FavoritesScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
