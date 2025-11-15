import { updatePassSchema, UpdatePassSchema } from '@/lib/schemas/update-account';
import { supabase } from '@/lib/supabase';
import { ExtendedUser } from '@/lib/types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Alert, Modal, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../custom-button';
import TextField from '../text-field';

interface Props {
    user: ExtendedUser;
}

const UpdatePass = ({ user }: Props) => {
    const [passModalVisible, setPassModalVisible] = useState(false);
    const [loader, setLoader] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdatePassSchema>({
        resolver: zodResolver(updatePassSchema),
        defaultValues: {
            pass: '',
            confirmPass: ''
        }
    });

    const handleUpdateEmail = () => {
        setPassModalVisible(true);
    };

    const onSubmit = async (formData: UpdatePassSchema) => {
        setLoader(true);

        const { error } = await supabase.auth.updateUser({
            password: formData.pass
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoader(false);
            return;
        }

        Alert.alert('Success', 'Password updated successfully', [
            {
                text: 'OK',
                onPress: () => {
                    setPassModalVisible(false);
                    reset();
                    setLoader(false);
                }
            }
        ]);
    };

    return (
        <>
            <View className="flex flex-col gap-2.5">
                <Text className="text-gray-500 text-sm font-sans-regular">Password:</Text>

                <View className="flex flex-row items-center gap-2 justify-between w-full ">
                    <Text className="text-white text-base font-sans-regular">********</Text>
                    <TouchableOpacity onPress={handleUpdateEmail}>
                        <FontAwesome5 name="edit" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                visible={passModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setPassModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-secondary flex flex-col gap-4 rounded-t-3xl p-6 pb-10">
                        <Text className="text-white text-2xl font-bold mb-4">Update Password</Text>
                        <Controller
                            name="pass"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="flex-col gap-2.5 w-full">
                                    <Text
                                        className={`text-xl font-sans-regular ${errors.pass ? 'text-red-500' : 'text-white'}`}
                                    >
                                        Password
                                    </Text>
                                    <TextField
                                        label="Password"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder="Enter your new password"
                                        keyboardType="default"
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />

                                    {errors.pass && (
                                        <Text className="text-red-500 text-xl font-sans-regular">
                                            {errors.pass.message}
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
                                        className={`text-xl ${errors.confirmPass ? 'text-red-500' : 'text-white'}`}
                                    >
                                        Confirm Password
                                    </Text>
                                    <TextField
                                        label="Confirm Password"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder="Confirm your new password"
                                        keyboardType="default"
                                        secureTextEntry={true}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />

                                    {errors.confirmPass && (
                                        <Text className="text-red-500 text-xl">
                                            {errors.confirmPass.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />

                        <View className="flex-row gap-4 mt-6">
                            <CustomButton
                                title="Cancel"
                                onPress={() => {
                                    setPassModalVisible(false);
                                    reset();
                                }}
                                className="flex-1 bg-dark-100"
                                textClassName="text-white"
                            />
                            <CustomButton
                                title="Update"
                                onPress={handleSubmit(onSubmit)}
                                className="flex-1 bg-accent"
                                loader={loader}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default UpdatePass;
