import CustomButton from '@/components/custom-button';
import { icons } from '@/constants/icons';
import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

const SavedMovieCard = ({
    id,
    title,
    poster_path,
    vote_average,
    release_date
}: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
}) => {
    //TODO: ADD HANDLE UNSAVE MOVIE FUNCTION

    let [unsaving, setUnsaving] = useState(false);

    const handleUnsaveMovie = async () => {
        console.log('Unsave movie');
    };

    return (
        <View className="flex items-start h-40 gap-4 flex-row p-4 bg-secondary/50 rounded-lg  w-full">
            <View className="size-32 bg-green-500 rounded-lg"></View>
            <View className="flex-1  h-full">
                <View className="">
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
                </View>

                <CustomButton
                    title="Unsave"
                    onPress={handleUnsaveMovie}
                    className="h-10 bg-transparent ml-auto min-w-24 flex-row items-center gap-2 border border-gray-300"
                    loader={unsaving}
                >
                    <Text className="text-sm font-sans-regular text-gray-300">Unsave</Text>

                    <Image source={icons.save} className="size-4" />
                </CustomButton>
            </View>
        </View>
    );
};

const Saved = () => {
    return (
        <View className="bg-primary flex-1">
            <FlatList
                data={[
                    {
                        id: 1,
                        title: 'Movie 1',
                        poster_path: 'https://via.placeholder.com/150',
                        vote_average: 7.5,
                        release_date: '2021-01-01'
                    },
                    {
                        id: 2,
                        title: 'Movie 1',
                        poster_path: 'https://via.placeholder.com/150',
                        vote_average: 7.5,
                        release_date: '2021-01-01'
                    },
                    {
                        id: 3,
                        title: 'Movie 1',
                        poster_path: 'https://via.placeholder.com/150',
                        vote_average: 7.5,
                        release_date: '2021-01-01'
                    },
                    {
                        id: 4,
                        title: 'Movie 1',
                        poster_path: 'https://via.placeholder.com/150',
                        vote_average: 7.5,
                        release_date: '2021-01-01'
                    },
                    {
                        id: 5,
                        title: 'Movie 1',
                        poster_path: 'https://via.placeholder.com/150',
                        vote_average: 7.5,
                        release_date: '2021-01-01'
                    }
                ]}
                renderItem={({ item }) => <SavedMovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 100,
                    paddingTop: 100,
                    gap: 20
                }}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={5}
                initialNumToRender={6}
            />
        </View>
    );
};

export default Saved;
