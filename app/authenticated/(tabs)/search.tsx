import MovieCard from '@/components/movie-card';
import SearchBar from '@/components/search-bar';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import { fetchPopularMovies } from '@/services/api';
import useFetch from '@/services/use-fetch';
import React, { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const {
        data: movies,
        isLoading,
        error
    } = useFetch(() => fetchPopularMovies({ q: searchQuery }));

    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="absolute flex-1 w-full z-0" resizeMode="cover" />

            <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                className="px-5"
                numColumns={3}
                columnWrapperStyle={{
                    justifyContent: 'center',
                    gap: 16,
                    marginVertical: 16
                }}
                contentContainerStyle={{ paddingBottom: 10 }}
                ListHeaderComponent={
                    <>
                        <View className="w-full flex-row justify-center mt-20">
                            <Image source={icons.logo} className="w-12 h-10 mt-24 mb-5 mx-auto" />
                        </View>

                        <View className="my-5">
                            <SearchBar
                                placeholder="Search movies..."
                                onChangeText={(text) => setSearchQuery(text)}
                                value={searchQuery}
                            />
                        </View>

                        {isLoading && (
                            <ActivityIndicator
                                size="large"
                                color="#0000ff"
                                className="mt-24 self-center"
                            />
                        )}

                        {error && (
                            <>
                                <Text className="text-red-500 px-5 my-3">
                                    Error: {error.message}
                                </Text>
                            </>
                        )}

                        {!isLoading && !error && searchQuery.trim() && movies?.length > 0 && (
                            <Text className="text-xl text-white font-bold">
                                Search results for:{' '}
                                <Text className="text-accent">{searchQuery}</Text>
                            </Text>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !isLoading && !error ? (
                        <View className="mt-10 px-5">
                            <Text className="text-center text-gray-500">
                                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
                            </Text>
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default Search;
