import { BACKEND_BASE_URL, ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@env";

import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { icons, images, styles } from "../../constants";
import EmptyState from "../../components/EmptyState";
import { StatusBar } from "expo-status-bar";
import CourseCard from "@/components/CourseCard";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { deleteToken, getToken } from "../../utils/tokenManager";
import { useFetch } from "../../hooks/useFetch";
import { useLogout } from "../../hooks/useLogout";
import Toast from "react-native-toast-message";
import { makeRequest } from "../../utils/makeRequest";

const Profile = () => {
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = useFetch(`${BACKEND_BASE_URL}/user`);

  const onRefresh = async () => {
    setRefreshing(true);
    // await refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };

  const logoutUser = async () => {
    const token = await getToken(REFRESH_TOKEN_NAME);
    try {
      const response = await makeRequest({
        method: "post",
        maxBodyLength: Infinity,
        url: `${BACKEND_BASE_URL}/auth/logout`,
        data: JSON.stringify({
          refreshToken: token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response?.success) {
        throw new Error(`HTTP error! status: ${response?.status}`);
      }
      return true;
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Logout failed",
      });
    }
  };

  const handleLogout = async () => {
    const isLogout = await logoutUser();
    if (isLogout) {
      Toast.show({
        type: "success",
        text1: "Logout successfully",
      });
      deleteToken(ACCESS_TOKEN_NAME);
      deleteToken(REFRESH_TOKEN_NAME);
      setTimeout(() => {
        router.replace("/sign-in");
      }, 2000);
    }
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
            First Name : {(fetchData.data && fetchData.data.first_name) || ""}
          </Text>
          <Text className="text-lg font-pregular py-2 text-white">
            Last Name : {(fetchData.data && fetchData.data.last_name) || ""}
          </Text>
          <Text className="text-lg font-pregular py-2 text-white">
            Email : {(fetchData.data && fetchData.data.email) || ""}
          </Text>
          <Text className="text-lg font-pregular py-2 text-white">
            Enrolled Courses :{" "}
            {(fetchData.data &&
              fetchData.data.courses &&
              fetchData.data.courses.length) ||
              "0"}
          </Text>
        </View>
        <TouchableOpacity
          className="flex items-center mt-20 w-full"
          onPress={handleLogout}
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="h-10 w-10 ml-4"
          />
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar backgroundColor={styles.colors.primary} style="light" />
      <Toast position="bottom" visibilityTime={1500} bottomOffset={25} />
    </>
  );
};

export default Profile;
