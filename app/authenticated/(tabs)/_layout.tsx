import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { Tabs } from 'expo-router';
import React from 'react';
import { Image, ImageBackground, Text, View } from 'react-native';

const TabBarIcon = ({ focused, title, icon }: { focused: boolean; title: string; icon: any }) => {
    if (focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row min-w-[112px] mt-4 flex-1 w-full rounded-full min-h-16 items-center justify-center overflow-hidden"
            >
                <Image source={icon} className="size-5" tintColor="#151312" />
                <Text className="text-secondary text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        );
    } else {
        return (
            <View className="size-full items-center justify-center mt-4 rounded-full">
                <Image source={icon} className="size-5" tintColor="#A8B5DB" />
            </View>
        );
    }
};

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarStyle: {
                    backgroundColor: '#0f0d23',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 52,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#0f0d23'
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return TabBarIcon({ focused, title: 'Home', icon: icons.home });
                    }
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: 'Search',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return TabBarIcon({ focused, title: 'Search', icon: icons.search });
                    }
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: 'Saved',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return TabBarIcon({ focused, title: 'Saved', icon: icons.save });
                    }
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return TabBarIcon({ focused, title: 'Profile', icon: icons.person });
                    }
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
