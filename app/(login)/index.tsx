import CustomButton from '@/components/custom-button';
import TextField from '@/components/text-field';
import { loginSchema, LoginSchema } from '@/lib/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Link, router } from 'expo-router';
import React, { useState } from 'react';

import { icons } from '@/constants/icons';
import { supabase } from '@/lib/supabase';
import { Alert, Image, Text, View } from 'react-native';

const LoginIndex = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    let [loader, setLoader] = useState(false);

    const onSubmit = async (formData: LoginSchema) => {
        setLoader(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoader(false);
            return;
        }

        setLoader(false);
        router.replace('/authenticated/(tabs)');
    };

    return (
        <View className="flex-1 p-4 bg-primary flex-col gap-4 items-center justify-center">
            <Text className="text-4xl font-bold text-white">Login</Text>
            <Image resizeMode="contain" source={icons.logo} className="size-24" />

            <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-col gap-2.5 w-full">
                        <Text
                            className={`text-2xl ${errors.email ? 'text-red-500' : 'text-white'}`}
                        >
                            Email
                        </Text>

                        <TextField
                            label="Email"
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect={false}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                        {errors.email && (
                            <Text className="text-red-500 text-2xl">{errors.email.message}</Text>
                        )}
                    </View>
                )}
            />

            <Controller
                name="password"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-col gap-2.5 w-full">
                        <Text
                            className={`text-2xl ${errors.password ? 'text-red-500' : 'text-white'}`}
                        >
                            Password
                        </Text>
                        <TextField
                            label="Password"
                            placeholder="Enter your password"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoComplete="password"
                            secureTextEntry={true}
                            autoCorrect={false}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />

                        {errors.password && (
                            <Text className="text-red-500 text-2xl">{errors.password.message}</Text>
                        )}
                    </View>
                )}
            />
            <CustomButton
                title="Log in"
                onPress={handleSubmit(onSubmit)}
                className="w-full bg-green-500"
                textClassName="font-semibold text-2xl"
                loader={loader}
            />

            <View className="flex-row gap-2.5 items-center mt-5">
                <Text className="text-white text-2xl">Don&apos;t have an account?</Text>
                <Link href="/(login)/register" className="text-accent text-2xl underline">
                    Register here
                </Link>
            </View>

            <Link href="/(login)/forgot-password" className="text-accent mt-4 text-2xl underline">
                Forgot password?
            </Link>
        </View>
    );
};

export default LoginIndex;
