import CustomButton from '@/components/custom-button';
import TextField from '@/components/text-field';
import { icons } from '@/constants/icons';
import { forgotPassSchema, ForgotPassSchema } from '@/lib/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';

const ForgotPasswordIndex = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<ForgotPassSchema>({
        resolver: zodResolver(forgotPassSchema)
    });

    const onSubmit = (data: ForgotPassSchema) => {
        console.log(data);
    };

    return (
        <View className="flex-1 items-center justify-center p-4 bg-primary flex-col gap-4">
            <Text className="text-4xl font-bold text-white">Forgot Password</Text>
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

            <CustomButton
                title="Send recovery email"
                onPress={handleSubmit(onSubmit)}
                className="w-full bg-green-500"
                textClassName="font-semibold text-2xl"
            />

            <View className="flex-col gap-2.5 items-center mt-5">
                <Text className="text-white text-2xl">Already recovered your password?</Text>
                <Link href="/(login)" className="text-accent text-2xl underline">
                    Login here
                </Link>
            </View>
        </View>
    );
};

export default ForgotPasswordIndex;
