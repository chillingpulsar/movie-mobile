import { updateInfoSchema, UpdateInfoSchema } from '@/lib/schemas/update-account';
import { ExtendedUser } from '@/lib/types';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../custom-button';
import TextField from '../text-field';

interface Props {
    user: ExtendedUser;
}

const UpdateInformation = ({ user }: Props) => {
    const [informationModalVisible, setInformationModalVisible] = useState(false);

    //TODO: create a clean separtion of components for email, nickname and password updates

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateInfoSchema>({
        resolver: zodResolver(updateInfoSchema),
        defaultValues: {
            nickname: ''
        }
    });

    const handleUpdateEmail = () => {
        setInformationModalVisible(true);
    };

    const onSubmit = (data: UpdateInfoSchema) => {
        console.log(data);
    };

    return (
        <>
            <View className="flex flex-col gap-2.5">
                <Text className="text-gray-500 text-sm font-sans-regular">Nickname:</Text>

                <View className="flex flex-row items-center gap-2 justify-between w-full ">
                    <Text className="text-white text-base font-sans-regular">
                        {user.user_metadata.nickname}
                    </Text>
                    <TouchableOpacity onPress={handleUpdateEmail}>
                        <FontAwesome5 name="edit" size={16} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                visible={informationModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setInformationModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-secondary rounded-t-3xl p-6 pb-10">
                        <Text className="text-white text-2xl font-bold mb-4">
                            Update Information
                        </Text>
                        <Controller
                            name="nickname"
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="flex-col gap-2.5 w-full">
                                    <Text
                                        className={`text-xl font-sans-regular ${errors.nickname ? 'text-red-500' : 'text-white'}`}
                                    >
                                        Nickname
                                    </Text>
                                    <TextField
                                        label="Nickname"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        placeholder={
                                            user?.user_metadata.nickname ??
                                            'Enter your new nickname information'
                                        }
                                        autoCapitalize="words"
                                    />
                                    {errors.nickname && (
                                        <Text className="text-red-500 text-xl font-sans-regular">
                                            {errors.nickname.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />
                        <View className="flex-row gap-4 mt-6">
                            <CustomButton
                                title="Cancel"
                                onPress={() => {
                                    setInformationModalVisible(false);
                                    reset();
                                }}
                                className="flex-1 bg-dark-100"
                                textClassName="text-white"
                            />
                            <CustomButton
                                title="Update"
                                onPress={handleSubmit(onSubmit)}
                                className="flex-1 bg-accent"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
};

export default UpdateInformation;
