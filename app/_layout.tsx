import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import '../global.css';

export default function RootLayout() {
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
