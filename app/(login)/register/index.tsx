import CustomButton from '@/components/custom-button';
import TextField from '@/components/text-field';
import { icons } from '@/constants/icons';
import { registerSchema, RegisterSchema } from '@/lib/schemas/login-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, ScrollView, Text, View } from 'react-native';

const RegisterIndex = () => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            nickname: '',
            email: '',
            password: '',
            confirmPass: ''
        }
    });

    const onSubmit = (data: RegisterSchema) => {
        console.log(data);
        //TODO: Insert supabase logic here
    };

    return (
        <View className="flex-1 bg-primary">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 80, paddingTop: 80 }}
                className="flex-1"
            >
                <View className="flex-1 flex-col gap-4 items-center justify-center p-4 ">
                    <Text className="text-4xl font-bold text-white">Create Account</Text>
                    <Image resizeMode="contain" source={icons.logo} className="size-24" />

                    <Controller
                        name="nickname"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className="flex-col gap-2.5 w-full">
                                <Text
                                    className={`text-2xl ${errors.nickname ? 'text-red-500' : 'text-white'}`}
                                >
                                    Nickname
                                </Text>
                                <TextField
                                    label="Nickname"
                                    placeholder="Enter your nickname"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoComplete="nickname"
                                    autoCorrect={false}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                                {errors.nickname && (
                                    <Text className="text-red-500 text-2xl">
                                        {errors.nickname.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

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
                                    <Text className="text-red-500 text-2xl">
                                        {errors.email.message}
                                    </Text>
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
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoComplete="password"
                                    autoCorrect={false}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                                {errors.password && (
                                    <Text className="text-red-500 text-2xl">
                                        {errors.password.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

                    <Controller
                        name="confirmPass"
                        control={control}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View className="flex-col gap-2.5 w-full">
                                <Text
                                    className={`text-2xl ${errors.confirmPass ? 'text-red-500' : 'text-white'}`}
                                >
                                    Confirm Password
                                </Text>
                                <TextField
                                    label="Confirm Password"
                                    placeholder="Confirm your password"
                                    keyboardType="default"
                                    secureTextEntry={true}
                                    autoCapitalize="none"
                                    autoComplete="password"
                                    autoCorrect={false}
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                                {errors.confirmPass && (
                                    <Text className="text-red-500 text-2xl">
                                        {errors.confirmPass.message}
                                    </Text>
                                )}
                            </View>
                        )}
                    />

                    <CustomButton
                        title="Create Account"
                        onPress={handleSubmit(onSubmit)}
                        className="w-full bg-green-500"
                        textClassName="font-semibold text-2xl"
                    />

                    <View className="flex-row gap-2.5 items-center mt-5">
                        <Text className="text-white text-2xl">Already have an account?</Text>
                        <Link href="/(login)" className="text-accent text-2xl underline">
                            Login here
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default RegisterIndex;
