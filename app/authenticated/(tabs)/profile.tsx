import CustomButton from '@/components/custom-button';
import UpdateEmail from '@/components/update-account/update-email';
import UpdateInformation from '@/components/update-account/update-information';
import UpdatePass from '@/components/update-account/update-pass';
import { supabase } from '@/lib/supabase';
import { ExtendedUser } from '@/lib/types';
import { useAuth } from '@/services/use-auth';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useState } from 'react';

import { router } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

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
            <Text className="text-white text-2xl font-sans-bold  w-full">
                {user.user_metadata.nickname}
            </Text>
            <Text className="text-base text-gray-500 font-sans-regular  w-full">{user?.email}</Text>
        </View>
    );
};

const UserInfo = ({ user }: { user: ExtendedUser | null }) => {
    if (!user) {
        return <></>;
    }

    return (
        <View className="flex flex-col gap-2.5 w-full">
            <Text className="text-white text-2xl font-sans-bold w-full">Account Information</Text>
            <View className="p-4 bg-secondary rounded-lg">
                <UpdateEmail user={user} />

                <View className="h-0.5 bg-primary w-full my-4"></View>

                <UpdateInformation user={user} />

                <View className="h-0.5 bg-primary w-full my-4"></View>

                <UpdatePass user={user} />
            </View>
        </View>
    );
};

const LogoutButton = () => {
    let [loader, setLoader] = useState(false);

    return (
        <CustomButton
            title="Logout"
            onPress={async () => {
                setLoader(true);
                await supabase.auth.signOut();
                setLoader(false);
                router.replace('/(login)');
                router.dismissAll();
            }}
            className="bg-accent w-full"
        />
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
                    <LogoutButton />
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;
