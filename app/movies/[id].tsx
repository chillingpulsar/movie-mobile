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
            <Text className="text-light-200 font-normal text-sm">{label}</Text>
            <Text className="text-light-200 font-normal text-sm mt-1">{value || 'N/A'}</Text>
        </View>
    );
};

const MovieDetails = () => {
    const { id } = useLocalSearchParams();
    const { data: movieDetails, isLoading } = useFetch(() =>
        fetchMovieDetails({ id: id as string })
    );

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
                            <Text className="text-white font-bold text-xl">
                                {movieDetails?.title}
                            </Text>
                            <View className="flex-row items-center gap-x-1 mt-2">
                                <Text className="text-light-200 text-sm">
                                    {movieDetails?.release_date.split('-')[0]}
                                </Text>
                                <Text className="text-light-200 text-sm">
                                    {movieDetails?.runtime}m
                                </Text>
                            </View>

                            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                                <Image source={icons.star} className="size-4" />
                                <Text className="text-light-200 text-sm">
                                    {Math.round(movieDetails?.vote_average ?? 0)}/10
                                </Text>
                                <Text className="text-light-200 text-sm">
                                    ({movieDetails?.vote_count} Votes)
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
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
                    >
                        <Image
                            source={icons.arrow}
                            className="size-5 mr-1 mt-0.5 rotate-180"
                            tintColor="#FFF"
                        />
                        <Text className="text-white font-semibold text-base">Go Back</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

export default MovieDetails;
