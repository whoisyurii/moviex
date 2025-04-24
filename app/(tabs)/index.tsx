import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Link } from "expo-router";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() =>
    fetchMovies({
      query: "",
      // if query: '' (doesn't exist) then it returns most popular movies, as we set it in fetchMovies endpoint query.
    })
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView
        className="flex-1 px-5"
        /* `showsVerticalScrollIndicator={false}` is a prop used in the ScrollView component to hide the vertical scroll indicator that appears on the right side of the scroll view when content overflows. */
        showsVerticalScrollIndicator={false}
        /* The `contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}` in the ScrollView component is setting the styling for the content container within the ScrollView. */
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError || trendingError ? (
          <Text> Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              // by this routing function it pushes user to Search screen after clicking on Search for a movie input
              placeholder="Search movies"
            />
            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
              </View>
            )}
            <FlatList
              horizontal // If true, renders items next to each other horizontally instead of stacked vertically. Allows to scroll them horizontally.
              showsHorizontalScrollIndicator={false} // When true, shows a horizontal scroll indicator.
              ItemSeparatorComponent={() => <View className="w-4" />}
              // It lets you insert a custom component (like a line or space) between each item. It won’t show at the very top or very bottom, nor end or beginning — only between items.
              data={trendingMovies}
              renderItem={({ item, index }) => (
                <TrendingCard movie={item} index={index} />
                // passing a prop of movie={item} is an alternative way of spreading everything out. Sometimes it's better because we can console.log entire movie itself and see it's properties
              )}
              keyExtractor={(item) => item.movie_id.toString()}
              className="mb-4 mt-3"
            />

            <Text className="text-lg text-white font-bold mt-3 mb-5">
              Latest movies
            </Text>

            <>
              <FlatList
                // <FlatList /> is a performant way to render large scrollable lists. Unlike <ScrollView/>, it only renders the visible items, which boosts performance and reduces memory usage
                data={movies} // An array (or array-like list) of items to render.
                renderItem={({ item }) => (
                  <MovieCard {...item} />
                  // <Text className="text-white text-sm">{item.title}</Text>
                )} // fn block opens in (parenthesis)
                keyExtractor={(item) => item.id}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: "flex-start",
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10,
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}
                // data – the array of items to display.
                // renderItem – a function to render each list item. renderItem is like .map() in logic, but it’s optimized for mobile by rendering lazily.
                // keyExtractor – returns a unique key for each item (usually the item's id).
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// Always keep an eye on usage of two vertical FlatLists on the same page/route!
// That's why FlatList horizontal prop is important.
