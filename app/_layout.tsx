import { useAuth } from '@/services/use-auth';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';

import '../global.css';

export default function RootLayout() {
    const { isAuthenticated, loading } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return; // Wait for auth to initialize

        const inAuthGroup = segments[0] === 'authenticated';

        if (!isAuthenticated && inAuthGroup) {
            // User is not authenticated but trying to access protected route
            router.replace('/(login)');
        } else if (isAuthenticated && !inAuthGroup) {
            // User is authenticated but trying to access login route
            router.replace('/authenticated/(tabs)');
        }
    }, [router, isAuthenticated, loading, segments]);

    // Show loading screen while checking auth
    if (loading) {
        return (
            <View className="flex-1 flex-col gap-4 justify-center items-center bg-primary">
                <ActivityIndicator size="large" />
                <Text className="text-gray-500 text-xl font-bold">Checking auth...</Text>
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
