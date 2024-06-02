import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { icons, images, styles } from "../../constants";
import EmptyState from "../../components/EmptyState";
import { StatusBar } from "expo-status-bar";
import CourseCard from "@/components/CourseCard";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const student: any = {};

  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <View className="flex justify-between items-center flex-row py-6 px-4 bg-primary">
          <Text className="text-2xl font-psemibold text-white">Profile!</Text>

          <Image
            source={images.ownLogoSm}
            className="w-12 h-12"
            resizeMode="contain"
          />
        </View>

        <View className="flex items-start px-4 py-5">
          <Text className="text-lg font-pregular py-2 text-white">
            First Name : {student.firstName || ""}
          </Text>
          <Text className="text-lg font-pregular py-2 text-white">
            Last Name : {student.latstName || ""}
          </Text>
          <Text className="text-lg font-pregular py-2 text-white">
            Email : {student.email || ""}
          </Text>
          <Text className="text-lg font-pregular py-2 text-white">
            Enrolled Courses : {student.courses || ""}
          </Text>
        </View>
        <TouchableOpacity
          className="flex items-center mt-20 w-full"
          onPress={() => router.replace("/sign-in")}
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="h-10 w-10 ml-4"
          />
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar backgroundColor={styles.colors.primary} style="light" />
    </>
  );
};

export default Profile;
