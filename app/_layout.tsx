import { useAuth } from '@/services/use-auth';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';

import '../global.css';

// Prevent the splash screen from auto-hiding before fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const { isAuthenticated, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    // Load all IBM Plex Sans fonts
    const [fontsLoaded, fontError] = useFonts({
        'IBMPlexSans-Thin': require('../assets/fonts/ibm-plex-sans-latin-100-normal.ttf'),
        'IBMPlexSans-ThinItalic': require('../assets/fonts/ibm-plex-sans-latin-100-italic.ttf'),
        'IBMPlexSans-ExtraLight': require('../assets/fonts/ibm-plex-sans-latin-200-normal.ttf'),
        'IBMPlexSans-ExtraLightItalic': require('../assets/fonts/ibm-plex-sans-latin-200-italic.ttf'),
        'IBMPlexSans-Light': require('../assets/fonts/ibm-plex-sans-latin-300-normal.ttf'),
        'IBMPlexSans-LightItalic': require('../assets/fonts/ibm-plex-sans-latin-300-italic.ttf'),
        'IBMPlexSans-Regular': require('../assets/fonts/ibm-plex-sans-latin-400-normal.ttf'),
        'IBMPlexSans-Italic': require('../assets/fonts/ibm-plex-sans-latin-400-italic.ttf'),
        'IBMPlexSans-Medium': require('../assets/fonts/ibm-plex-sans-latin-500-normal.ttf'),
        'IBMPlexSans-MediumItalic': require('../assets/fonts/ibm-plex-sans-latin-500-italic.ttf'),
        'IBMPlexSans-SemiBold': require('../assets/fonts/ibm-plex-sans-latin-600-normal.ttf'),
        'IBMPlexSans-SemiBoldItalic': require('../assets/fonts/ibm-plex-sans-latin-600-italic.ttf'),
        'IBMPlexSans-Bold': require('../assets/fonts/ibm-plex-sans-latin-700-normal.ttf'),
        'IBMPlexSans-BoldItalic': require('../assets/fonts/ibm-plex-sans-latin-700-italic.ttf')
    });

    useEffect(() => {
        if (fontsLoaded && !fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    useEffect(() => {
        if (loading || !fontsLoaded) return; // Wait for auth and fonts to initialize

        const inAuthGroup = segments[0] === 'authenticated';

        if (!isAuthenticated && inAuthGroup) {
            // User is not authenticated but trying to access protected route
            router.replace('/(login)');
        } else if (isAuthenticated && !inAuthGroup) {
            // User is authenticated but trying to access login route
            router.replace('/authenticated/(tabs)');
        }
    }, [router, isAuthenticated, loading, segments, fontsLoaded]);

    // Show loading screen while checking auth or loading fonts
    if (loading || !fontsLoaded) {
        return (
            <View className="flex-1 flex-col gap-4 justify-center items-center bg-primary">
                <ActivityIndicator size="large" />
                <Text className="text-gray-500 text-xl font-bold">Loading...</Text>
            </View>
        );
    }

    return (
        <>
            <StatusBar hidden={true} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(login)/index" />
                <Stack.Screen name="(login)/register/index" />
                <Stack.Screen name="(login)/forgot-password/index" />
                <Stack.Screen name="authenticated" />
            </Stack>
        </>
    );
}
