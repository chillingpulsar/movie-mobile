import { ExtendedUser } from '@/lib/types';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as ImagePicker from 'expo-image-picker';
import * as Linking from 'expo-linking';
import React, { useState } from 'react';
import { Alert, Image, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import CustomButton from '../custom-button';

const UploadProfile = ({ user }: { user: ExtendedUser }) => {
    const [image, setImage] = useState<string | null>(null);
    const [mediaLibraryStatus, requestMediaLibraryPermission] =
        ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

    const [modalVisible, setModalVisible] = useState(false);

    const pickImageFromLibrary = async () => {
        try {
            // Request permission if not granted
            if (mediaLibraryStatus?.status !== 'granted') {
                const result = await requestMediaLibraryPermission();
                if (!result.granted) {
                    Alert.alert(
                        'Permission Required',
                        'Please grant photo library access to upload a profile picture. You can enable it in Settings.',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            {
                                text: 'Open Settings',
                                onPress: async () => {
                                    if (Platform.OS === 'android') {
                                        // Open app settings on Android
                                        await Linking.openSettings();
                                    } else {
                                        // On iOS, try to open app settings
                                        try {
                                            await Linking.openURL('app-settings:');
                                        } catch {
                                            Alert.alert(
                                                'Open Settings',
                                                'Please go to Settings > Privacy & Security > Photos to enable access.'
                                            );
                                        }
                                    }
                                }
                            }
                        ]
                    );
                    return;
                }
            }

            // Launch image library
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                exif: false // Disable EXIF data for better performance
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error picking image from library:', error);
            Alert.alert('Error', 'Failed to pick image from library. Please try again.', [
                { text: 'OK' }
            ]);
        }
    };

    const takePhoto = async () => {
        try {
            // Request permission if not granted
            if (cameraStatus?.status !== 'granted') {
                const result = await requestCameraPermission();
                if (!result.granted) {
                    Alert.alert(
                        'Permission Required',
                        'Please grant camera access to take a profile picture. You can enable it in Settings.',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            {
                                text: 'Open Settings',
                                onPress: async () => {
                                    if (Platform.OS === 'android') {
                                        // Open app settings on Android
                                        await Linking.openSettings();
                                    } else {
                                        // On iOS, try to open app settings
                                        try {
                                            await Linking.openURL('app-settings:');
                                        } catch {
                                            Alert.alert(
                                                'Open Settings',
                                                'Please go to Settings > Privacy & Security > Camera to enable access.'
                                            );
                                        }
                                    }
                                }
                            }
                        ]
                    );
                    return;
                }
            }

            // Launch camera
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
                exif: false // Disable EXIF data for better performance
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error taking photo:', error);
            Alert.alert('Error', 'Failed to take photo. Please try again.', [{ text: 'OK' }]);
        }
    };

    const showImagePickerOptions = () => {
        Alert.alert(
            'Select Profile Picture',
            'Choose an option',
            [
                {
                    text: 'Take Photo',
                    onPress: takePhoto
                },
                {
                    text: 'Choose from Library',
                    onPress: pickImageFromLibrary
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View className="flex flex-col items-center justify-center gap-4">
            <TouchableOpacity
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
                className="relative rounded-full"
            >
                {image ? (
                    <Image
                        source={{ uri: image }}
                        className="w-32 h-32 rounded-full border-4 border-accent"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="w-32 h-32 rounded-full border-4  items-center justify-center bg-gray-800">
                        <FontAwesome name="user-circle" size={100} color="#AB8BFF" />
                    </View>
                )}

                <FontAwesome5
                    name="edit"
                    size={16}
                    color="white"
                    className="absolute bottom-0 right-0"
                />
            </TouchableOpacity>

            <View className="flex flex-col items-center gap-1">
                <Text className="text-white text-2xl font-sans-bold text-center">
                    {user.user_metadata.nickname}
                </Text>
                <Text className="text-base text-gray-500 font-sans-regular text-center">
                    {user?.email}
                </Text>
            </View>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-secondary flex flex-col gap-4 rounded-t-3xl p-6 pb-10">
                        <Text className="text-white text-2xl font-sans-bold mb-4">
                            Update Profile Picture
                        </Text>

                        <TouchableOpacity
                            onPress={showImagePickerOptions}
                            className="p-2 size-64 mx-auto flex items-center justify-center flex-col rounded-full"
                        >
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    className="size-60 rounded-full border-4 border-accent"
                                    resizeMode="cover"
                                />
                            ) : (
                                <FontAwesome name="user-circle" size={200} color="#AB8BFF" />
                            )}
                        </TouchableOpacity>

                        <View className="flex-row gap-4 mt-6">
                            <CustomButton
                                title="Cancel"
                                onPress={() => {
                                    setModalVisible(false);
                                }}
                                className="flex-1 bg-dark-100"
                                textClassName="text-white"
                            />
                            <CustomButton
                                title="Update"
                                disabled={!image}
                                onPress={() => {
                                    // TODO: Implement upload to Supabase storage
                                    console.log(image);
                                    Alert.alert(
                                        'Success',
                                        'Profile picture selected! Upload functionality can be implemented here.'
                                    );
                                }}
                                className="flex-1 bg-accent"
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default UploadProfile;
