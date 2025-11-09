import CustomButton from '@/components/custom-button';
import TextField from '@/components/text-field';
import {
    updateEmailSchema,
    UpdateEmailSchema,
    updateNicknameSchema,
    UpdateNicknameSchema
} from '@/lib/schemas/update-account';
import { ExtendedUser } from '@/lib/types';
import { useAuth } from '@/services/use-auth';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { zodResolver } from '@hookform/resolvers/zod';

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';

//TODO: implement profile upload with rls
const UserUpload = ({ user }: { user: ExtendedUser | null }) => {
    const avatarUrl = user?.user_metadata.avatar_url;

    if (!user) {
        return <></>;
    }

    return avatarUrl ? (
        <View>{/* TODO: display avatar implement async avatar display */}</View>
    ) : (
        <View className="flex flex-col items-center justify-center gap-2.5">
            <FontAwesome name="user-circle" size={120} color="white" />
            <Text className="text-white text-2xl font-bold  w-full">
                {user.user_metadata.nickname}
            </Text>
            <Text className="text-base text-gray-500 font-bold  w-full">{user?.email}</Text>
        </View>
    );
};

const UserInfo = ({ user }: { user: ExtendedUser | null }) => {
    const [emailModalVisible, setEmailModalVisible] = useState(false);
    const [nicknameModalVisible, setNicknameModalVisible] = useState(false);

    //TODO: create a clean separtion of components for email, nickname and password updates

    const {
        control,
        handleSubmit: emailHandleSubmit,
        formState: { errors: emailErrors },
        reset: emailReset
    } = useForm<UpdateEmailSchema>({
        resolver: zodResolver(updateEmailSchema)
    });

    const {
        control: nicknameControl,
        handleSubmit: nicknameHandleSubmit,
        formState: { errors: nicknameErrors },
        reset: nicknameReset
    } = useForm<UpdateNicknameSchema>({
        resolver: zodResolver(updateNicknameSchema),
        defaultValues: {
            nickname: user?.user_metadata.nickname || ''
        }
    });

    const handleUpdateEmail = () => {
        setEmailModalVisible(true);
    };

    const handleUpdateNickname = () => {
        setNicknameModalVisible(true);
    };

    const onEmailSubmit = async (data: UpdateEmailSchema) => {
        console.log(data);
        setEmailModalVisible(false);

        //TODO: update email logic
    };

    const onNicknameSubmit = async (data: UpdateNicknameSchema) => {
        console.log(data);
        setNicknameModalVisible(false);
        //TODO: update nickname logic
    };

    if (!user) {
        return <></>;
    }

    return (
        <View className="flex flex-col gap-2.5 w-full">
            <Text className="text-white text-2xl font-bold w-full">Account Information</Text>
            <View className="p-4 bg-secondary rounded-lg">
                <View className="flex flex-col gap-2.5">
                    <Text className="text-gray-500 text-sm">Email:</Text>

                    <View className="flex flex-row items-center gap-2 justify-between w-full ">
                        <Text className="text-white text-base">{user.email}</Text>
                        <TouchableOpacity onPress={handleUpdateEmail}>
                            <FontAwesome name="external-link" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="h-0.5 bg-primary w-full my-4"></View>

                <View className="flex flex-col gap-2.5">
                    <Text className="text-gray-500 text-sm">Nickname:</Text>
                    <View className="flex flex-row items-center gap-2 justify-between w-full ">
                        <Text className="text-white text-base">{user.user_metadata.nickname}</Text>
                        <TouchableOpacity onPress={handleUpdateNickname}>
                            <FontAwesome name="external-link" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Email Update Modal */}
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
                                        className={`text-2xl ${emailErrors.email ? 'text-red-500' : 'text-white'}`}
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

                                    {emailErrors.email && (
                                        <Text className="text-red-500 text-2xl">
                                            {emailErrors.email.message}
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
                                    emailReset();
                                }}
                                className="flex-1 bg-dark-100"
                            />
                            <CustomButton
                                title="Update"
                                onPress={emailHandleSubmit(onEmailSubmit)}
                                className="flex-1 bg-accent"
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Nickname Update Modal */}
            <Modal
                visible={nicknameModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setNicknameModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-secondary rounded-t-3xl p-6 pb-10">
                        <Text className="text-white text-2xl font-bold mb-4">Update Nickname</Text>
                        <Controller
                            name="nickname"
                            control={nicknameControl}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View className="flex-col gap-2.5 w-full">
                                    <Text
                                        className={`text-2xl ${nicknameErrors.nickname ? 'text-red-500' : 'text-white'}`}
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
                                            'Enter your new nickname'
                                        }
                                        autoCapitalize="words"
                                    />
                                    {nicknameErrors.nickname && (
                                        <Text className="text-red-500 text-2xl">
                                            {nicknameErrors.nickname.message}
                                        </Text>
                                    )}
                                </View>
                            )}
                        />
                        <View className="flex-row gap-4 mt-6">
                            <CustomButton
                                title="Cancel"
                                onPress={() => {
                                    setNicknameModalVisible(false);
                                    nicknameReset();
                                }}
                                className="flex-1 bg-dark-100"
                            />
                            <CustomButton
                                title="Update"
                                onPress={nicknameHandleSubmit(onNicknameSubmit)}
                                className="flex-1 bg-accent"
                            />
                        </View>
                    </View>
                </View>
            </Modal>

            {/* <Text className="text-white text-2xl font-bold w-full mt-5">Update Password</Text>
            <View className="p-4 bg-secondary rounded-lg">
                <View className="flex flex-col gap-2.5">
                    <Text className="text-gray-500 text-sm">Email:</Text>
                    <Text className="text-white text-base">{user.email}</Text>
                </View>

                <View className="h-0.5 bg-primary w-full my-4"></View>

                <View className="flex flex-col gap-2.5">
                    <Text className="text-gray-500 text-sm">Nickname:</Text>
                    <Text className="text-white text-base">{user.user_metadata.nickname}</Text>
                </View>
            </View> */}
        </View>
    );
};

const Profile = () => {
    const { user } = useAuth();
    return (
        <View className="flex-1 bg-primary">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 80, paddingTop: 80 }}
                className="flex-1"
            >
                <View className="bg-grey-500 items-center justify-center p-4 flex flex-col gap-4">
                    <UserUpload user={user} />
                    <UserInfo user={user} />
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;
