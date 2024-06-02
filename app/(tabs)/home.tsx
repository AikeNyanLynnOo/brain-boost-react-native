import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { icons, images, styles } from "../../constants";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import { StatusBar } from "expo-status-bar";
import { courses, trendingCourses } from "@/constants/courses";
import CourseCard from "@/components/CourseCard";
import TrendingCourses from "@/components/TrendingCourses";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={courses.map((course, index) => ({
            ...course,
            id: index,
          }))}
          keyExtractor={(item: { id: number }, index: number) => `${item.id}`}
          renderItem={({ item }) => (
            <CourseCard
              title={item.title}
              thumbnail={item.image}
              lecturer={item.lecturer}
              avatar={icons.profile}
              price={item.price}
              hours={item.hours}
            />
          )}
          ListHeaderComponent={() => (
            <View className="flex my-6 px-4 space-y-6">
              <View className="flex justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome Back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    Aike !
                  </Text>
                </View>

                <View className="mt-1.5">
                  <Image
                    source={images.ownLogoSm}
                    className="w-12 h-12"
                    resizeMode="contain"
                  />
                </View>
              </View>

              <SearchInput placeholder="Search a course..." />

              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-lg font-pregular text-gray-100 mb-3">
                  Trending Courses
                </Text>

                <TrendingCourses
                  posts={
                    (trendingCourses &&
                      trendingCourses.map((course, index) => ({
                        ...course,
                        id: index,
                      }))) ??
                    []
                  }
                />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Courses Found"
              subtitle="No courses created yet !"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
      <StatusBar backgroundColor={styles.colors.primary} style="light" />
    </>
  );
};

export default Home;
