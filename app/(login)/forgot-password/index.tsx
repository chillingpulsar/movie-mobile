import CustomButton from '@/components/custom-button';
import TextField from '@/components/text-field';
import { icons } from '@/constants/icons';
import { forgotPassSchema, ForgotPassSchema } from '@/lib/schemas/login-schema';
import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Image, Text, View } from 'react-native';

const ForgotPasswordIndex = () => {
    //TODO: maybe replace this with otp code to email approach
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ForgotPassSchema>({
        resolver: zodResolver(forgotPassSchema)
    });

    let [loader, setLoader] = useState(false);

    const onSubmit = async (data: ForgotPassSchema) => {
        setLoader(true);

        const { error } = await supabase.auth.resetPasswordForEmail(data.email);

        if (error) {
            Alert.alert('Error', error.message);
            setLoader(false);
            return;
        }

        setLoader(false);
        Alert.alert('Success', 'Recovery email sent successfully', [
            { text: 'OK', onPress: () => reset() }
        ]);
    };

    return (
        <View className="flex-1 items-center justify-center p-4 bg-primary flex-col gap-4">
            <Text className="text-4xl font-sans-bold text-white">Forgot Password</Text>
            <Image resizeMode="contain" source={icons.logo} className="size-24" />

            <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View className="flex-col gap-2.5 w-full">
                        <Text
                            className={`text-xl font-sans-regular ${errors.email ? 'text-red-500' : 'text-white'}`}
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
                            <Text className="text-red-500 text-xl font-sans-regular">
                                {errors.email.message}
                            </Text>
                        )}
                    </View>
                )}
            />

            <CustomButton
                title="Send recovery email"
                onPress={handleSubmit(onSubmit)}
                className="w-full "
                loader={loader}
            />

            <View className="flex-col gap-2.5 items-center mt-5">
                <Text className="text-white text-xl font-sans-regular">
                    Already recovered your password?
                </Text>
                <Link href="/(login)" className="text-accent text-xl font-sans-regular underline">
                    Login here
                </Link>
            </View>
        </View>
    );
};

export default ForgotPasswordIndex;
