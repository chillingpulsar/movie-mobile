import MovieCard from '@/components/movie-card';
import SearchBar from '@/components/search-bar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchPopularMovies } from '@/services/api';
import useFetch from '@/services/use-fetch';
import { router } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from 'react-native';

const Home = () => {
    const { data: movies, isLoading } = useFetch(() => fetchPopularMovies({ q: '' }));

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute inset-0 w-full" />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    minHeight: '100%',
                    paddingBottom: 10
                }}
                className="flex-1 px-5"
            >
                <Image source={icons.logo} className="w-12 h-10 mt-24 mb-5 mx-auto" />

                <View>
                    <SearchBar onPress={() => router.push('/search')} editable={false} />
                </View>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="mt-24 self-center" />
                ) : (
                    <View>
                        <Text className="text-lg text-white font-bold mt-5 mb-3">
                            Latest Movies
                        </Text>

                        <FlatList
                            data={movies}
                            renderItem={({ item }) => (
                                <>
                                    <MovieCard {...item} />
                                </>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: 'flex-start',
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10
                            }}
                            className="mt-5 pb-32"
                            scrollEnabled={false}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default Home;
