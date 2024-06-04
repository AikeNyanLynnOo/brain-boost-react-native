import { ACCESS_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@env";

import { Image, ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { icons, images, styles } from "../constants";
import CustomButton from "@/components/CustomButton";
import Toast from "react-native-toast-message";
import { getToken } from "../utils/tokenManager";
import { useAuth } from "../hooks/isAuth";

const Index = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [accessToken, setAccessToken] = useState<string | null>("");

  // useEffect(() => {
  //   getToken(ACCESS_TOKEN_NAME).then((token) =>
  //     // console.log("Access token>>", token);
  //     setAccessToken(token)
  //   );
  // });

  // if (accessToken) {
  //   return <Redirect href={"/home"} />;
  // }

  if (!isLoading && isAuthenticated) {
    return <Redirect href={"/home"} />;
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full h-full justify-center items-center px-4">
          <Image
            source={images.ownLogoNoBg}
            resizeMode="contain"
            className="h-[180px] w-[180px]"
          />
          <Image
            source={images.homeLanding}
            resizeMode="contain"
            className="h-[220px] w-full -mt-7"
          />

          <View className="flex flex-row w-full my-5 justify-center relative">
            <Text className="text-white text-2xl my-5 font-psemibold text-center">
              Welcome to
            </Text>
            <Text className="ml-2 text-2xl my-5 font-psemibold text-center text-secondary">
              BrainBoost
            </Text>
            <View className="bg-secondary-100 h-2 rounded-lg w-10 top-[71%] left-[53%] absolute" />
            <View className="bg-secondary-100 h-2 rounded-lg w-5 top-[71%] left-[66%] absolute" />
            <View className="bg-secondary-100 h-2 rounded-lg w-2 top-[71%] left-[73%] absolute" />
          </View>
          <Text className="text-white text-sm mt-1 font-pmedium w-full text-center">
            Your Ultimate Learning Destination
          </Text>
          <Text className="text-gray-200 text-sm my-3 font-pmedium w-full text-center">
            Join thousands of learners on LearnVerse and transform your
            educational experience.
          </Text>

          <CustomButton
            title="Sign In"
            handlePress={() => {
              router.replace("/sign-in");
            }}
            containerStyles="w-full mt-5"
          />
          <CustomButton
            title="Coninue with Google"
            handlePress={() => {
              Toast.show({
                type : "info",
                text1 : "Upcoming feature...",
                text2 : "Under development!"
              });
            }}
            containerStyles="w-full mt-5 bg-white"
            textStyles="text-secondary-200"
            icon={icons.google}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor={styles.colors.primary} style="light" />
      <Toast position="bottom" visibilityTime={1500} bottomOffset={25} />
    </SafeAreaView>
  );
};

export default Index;
