import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
    onPress?: () => void;
    onChangeText?: (text: string) => void;
    placeholder?: string;
    value?: string;
    editable?: boolean;
}

const SearchBar = ({
    onPress,
    onChangeText,
    placeholder = 'Search anything...',
    value,
    editable = true
}: Props) => {
    return (
        <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={icons.search} className="size-5" />
            <TextInput
                editable={editable}
                onPress={onPress}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#A8B5DB"
                value={value}
                className="flex-1 ml-2 text-white"
            />
        </View>
    );
};

export default SearchBar;
