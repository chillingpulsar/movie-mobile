import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

const RegisterIndex = () => {
    return (
        <View className="flex-1 items-center justify-center">
            <Text>Register Index</Text>
            <Link href="/(login)">Login</Link>
        </View>
    );
};

export default RegisterIndex;
