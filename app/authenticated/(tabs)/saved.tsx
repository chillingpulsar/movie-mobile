import CustomButton from '@/components/custom-button';
import { icons } from '@/constants/icons';
import type { Tables } from '@/lib/supabase.types';
import { getSavedMovies, unsaveMovie } from '@/services/api';
import { useAuth } from '@/services/use-auth';
import { Link } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Image, RefreshControl, Text, View } from 'react-native';

const SavedMovieCard = ({
    id,
    movie_id,
    title,
    poster_path,
    vote_average,
    release_date,
    userId,
    onUnsave
}: {
    id: string;
    movie_id: string;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
    userId: string;
    onUnsave: (savedMovieId: string) => void;
}) => {
    let [unsaving, setUnsaving] = useState(false);

    const handleUnsaveMovie = async () => {
        setUnsaving(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const { errorMsg } = await unsaveMovie({ id: movie_id, userId });

        if (errorMsg) {
            Alert.alert('Error', errorMsg, [{ text: 'OK', onPress: () => setUnsaving(false) }]);
            return;
        }

        Alert.alert('Success', 'Movie unsaved successfully', [
            {
                text: 'OK',
                onPress: () => {
                    setUnsaving(false);
                    onUnsave(id);
                }
            }
        ]);
    };

    return (
        <View className="flex items-start h-40 gap-4 flex-row p-4 bg-secondary/50 rounded-lg  w-full">
            <View>
                <Image
                    source={{
                        uri: `https://image.tmdb.org/t/p/w500${poster_path}`
                    }}
                    resizeMode="cover"
                    className="size-32 rounded-lg"
                />
            </View>
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
    const { user } = useAuth();

    let [savedMovies, setSavedMovies] = useState<Tables<'saved_movies'>[] | null>(null);
    let [refreshing, setRefreshing] = useState(false);

    const fetchSavedMovies = useCallback(async () => {
        if (!user) return;

        const res = await getSavedMovies({ userId: user.id });
        setSavedMovies(res.data);
    }, [user]);

    useEffect(() => {
        fetchSavedMovies();
    }, [fetchSavedMovies]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchSavedMovies();
        setRefreshing(false);
    };

    const handleUnsave = (savedMovieId: string) => {
        setSavedMovies((prev) => prev?.filter((movie) => movie.id !== savedMovieId) ?? null);
    };

    return (
        <View className="bg-primary flex-1">
            <FlatList
                data={savedMovies}
                renderItem={({ item }) => (
                    <SavedMovieCard userId={user?.id ?? ''} onUnsave={handleUnsave} {...item} />
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#FFF"
                        colors={['#FFF']}
                        progressViewOffset={100}
                        title="Refreshing... please wait"
                        titleColor="#FFF"
                    />
                }
                contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingBottom: 100,
                    paddingTop: 100,
                    gap: 20
                }}
                ListEmptyComponent={
                    <View className="flex-1 flex-col gap-4 items-center justify-center">
                        <Text className="text-white text-base font-sans-regular text-center">
                            No saved movies yet
                        </Text>

                        <Link href="/authenticated/(tabs)" className="text-accent underline">
                            <Text>Save a movie now!</Text>
                        </Link>
                    </View>
                }
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
