import { updateEmailSchema, UpdateEmailSchema } from '@/lib/schemas/update-account';
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

const UpdateEmail = ({ user }: Props) => {
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [loader, setLoader] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateEmailSchema>({
        resolver: zodResolver(updateEmailSchema),
        defaultValues: {
            email: ''
        }
    });

    const handleUpdateEmail = () => {
        setEmailModalVisible(true);
    };

    const onSubmit = async (formData: UpdateEmailSchema) => {
        setLoader(true);

        const { error } = await supabase.auth.updateUser({
            email: formData.email
        });

        if (error) {
            Alert.alert('Error', error.message);
            setLoader(false);
            return;
        }

        Alert.alert(
            'Success',
            `An email has been sent to your old email ${user.email} to confirm the change.`,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setEmailModalVisible(false);
                        reset();
                        setLoader(false);
                    }
                }
            ]
        );
    };

    return (
        <>
            <View className="flex flex-col gap-2.5">
                <Text className="text-gray-500 text-base font-sans-regular">Email:</Text>

                <View className="flex flex-row items-center gap-2 justify-between w-full ">
                    <Text className="text-white text-base font-sans-regular">{user.email}</Text>
                    <TouchableOpacity onPress={handleUpdateEmail}>
                        <FontAwesome5 name="edit" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                visible={emailModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setEmailModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-secondary rounded-t-3xl p-6 pb-10">
                        <Text className="text-white text-2xl font-bold mb-4">Update Email</Text>
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
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={user?.email ?? 'Enter your new email'}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />

                                    {errors.email && (
                                        <Text className="text-red-500 text-xl font-sans-regular">
                                            {errors.email.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />
                        <View className="flex-row gap-4 mt-6">
                            <CustomButton
                                title="Cancel"
                                onPress={() => {
                                    setEmailModalVisible(false);
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

export default UpdateEmail;
