import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const ForgotPasswordIndex = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Text>ForgotPasswordIndex</Text>
            <Link href="/(login)">Login</Link>
        </View>
    );
};

export default ForgotPasswordIndex;
