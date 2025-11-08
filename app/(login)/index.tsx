import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const LoginIndex = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Login Index</Text>
            <Link href="/(login)/register">Register</Link>
            <Link href="/(login)/forgot-password">Forgot Password</Link>
        </View>
    );
};

export default LoginIndex;
