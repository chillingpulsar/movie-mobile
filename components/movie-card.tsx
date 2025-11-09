import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
    return (
        <Link href={`/authenticated/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    resizeMode="contain"
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : 'https://placeholder.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className="w-full h-48 rounded-xl"
                />

                <Text className="text-xl font-sans-bold text-white mt-2" numberOfLines={1}>
                    {title}
                </Text>

                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4" />
                    <Text className="text-sm text-white font-sans-bold uppercase">
                        {Math.round(vote_average / 2)} / 10
                    </Text>
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300">{release_date.split('-')[0]}</Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
};

export default MovieCard;
