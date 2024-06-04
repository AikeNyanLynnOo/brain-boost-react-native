import { BACKEND_BASE_URL, ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@env";
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

import { useFetch } from "../../hooks/useFetch";
import Toast from "react-native-toast-message";

const MyCourses = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isLoading, error } = useFetch(`${BACKEND_BASE_URL}/courses`);
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
          data={
            data &&
            data.length > 0 &&
            data.map((course: any, index: number) => ({
              ...course,
              id: index,
            }))
          }
          stickyHeaderIndices={[0]}
          keyExtractor={(item: { id: number }, index: number) => `${item.id}`}
          renderItem={({ item }: { item: any }) => (
            <CourseCard
              title={item.title}
              thumbnail={item.image}
              lecturer={item.lecturer}
              avatar={icons.profile}
              price={item.price}
              hours={item.hours}
              enrolled={true}
            />
          )}
          ListHeaderComponent={() => (
            <View className="flex justify-between items-center flex-row py-6 px-4 bg-primary">
              <Text className="text-2xl font-psemibold text-white">
                Your Courses !
              </Text>

              <Image
                source={images.ownLogoSm}
                className="w-12 h-12"
                resizeMode="contain"
              />
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
      <Toast position="bottom" visibilityTime={1500} bottomOffset={25} />
    </>
  );
};

export default MyCourses;
