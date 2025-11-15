import CustomButton from '@/components/custom-button';
import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/use-fetch';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface MovieInfoProps {
    label: string;
    value: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
    return (
        <View className="flex-col items-start justify-center m-5">
            <Text className="text-light-200 font-sans-regular text-base">{label}</Text>
            <Text className="text-light-200 font-sans-regular text-base mt-1">
                {value || 'N/A'}
            </Text>
        </View>
    );
};

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { data: movieDetails, isLoading } = useFetch(() =>
        fetchMovieDetails({ id: id as string })
    );

    const handleSaveMovie = async () => {
        console.log(id);
    };

    return (
        <View className="bg-primary flex-1">
            {isLoading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#FFF" />
                </View>
            ) : (
                <>
                    <ScrollView contentContainerStyle={{ paddingBottom: 80 }} className="flex-1">
                        <View>
                            <Image
                                source={{
                                    uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`
                                }}
                                resizeMode="stretch"
                                className="w-full h-[550px]"
                            />
                        </View>

                        <View className="flex-col items-start justify-center mt-5 px-5">
                            <View className="flex-row items-center gap-4">
                                <Text className="text-white font-sans-bold text-2xl">
                                    {movieDetails?.title}
                                </Text>

                                <TouchableOpacity
                                    onPress={handleSaveMovie}
                                    className="px-2 w-20 py-1 rounded-sm bg-accent"
                                >
                                    <Text className="text-white text-center font-sans-regular text-base">
                                        Save
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View className="flex-row items-center gap-x-1 mt-2">
                                <Text className="text-light-200 font-sans-regular text-base">
                                    {movieDetails?.release_date.split('-')[0]}
                                </Text>
                                <Text className="text-light-200 font-sans-regular text-base">
                                    {movieDetails?.runtime}m
                                </Text>
                            </View>

                            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                                <Image source={icons.star} className="size-4" />
                                <Text className="text-light-200 font-sans-regular text-base">
                                    {Math.round(movieDetails?.vote_average ?? 0)} / 10
                                </Text>
                                <Text className="text-light-200 font-sans-regular text-base">
                                    ( {movieDetails?.vote_count} Votes )
                                </Text>
                            </View>
                        </View>

                        <MovieInfo label="Overview" value={movieDetails?.overview} />
                        <MovieInfo
                            label="Genres"
                            value={movieDetails?.genres.map((genre: any) => genre.name).join(', ')}
                        />
                        <View className="flex flex-row justify-between w-1/2">
                            <MovieInfo
                                label="Budget"
                                value={`$${movieDetails?.budget / 1_000_000} million`}
                            />
                            <MovieInfo
                                label="Revenue"
                                value={`$${Math.round((movieDetails?.revenue ?? 0) / 1_000_000)} million`}
                            />
                        </View>
                        <MovieInfo
                            label="Production Companies"
                            value={movieDetails?.production_companies
                                .map((company: any) => company.name)
                                .join(', ')}
                        />
                    </ScrollView>

                    <CustomButton
                        title="Back"
                        onPress={() => router.back()}
                        className="absolute bottom-8 left-0 right-0 mx-5"
                        textClassName="text-white"
                    />
                </>
            )}
        </View>
    );
};

export default MovieDetails;
