import { router } from "expo-router";
import { View, Text, Image } from "react-native";

import { images,styles } from "../constants";
import CustomButton from "./CustomButton";

export interface EmptyStatePropType {
  title: string;
  subtitle: string;
}

const EmptyState = ({ title, subtitle }: EmptyStatePropType) => {
  return (
    <View className="flex justify-center items-center px-4">
      <Image
        source={images.searchNotFound}
        resizeMode="contain"
        className="w-[250px] h-[200px]"
      />

      <Text className="text-sm mt-5 font-pmedium text-gray-100">{title}</Text>
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {subtitle}
      </Text>

    </View>
  );
};

export default EmptyState;
