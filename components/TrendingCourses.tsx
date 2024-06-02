import { useState } from "react";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import { icons } from "../constants";
import { CourseCardPropType } from "./CourseCard";
import { CourseType } from "@/constants/courses";

const zoomIn: any = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut: any = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

export interface TrendingItemPropType {
  activeItem: any;
  item: any;
}

const TrendingItem = ({ activeItem, item }: TrendingItemPropType) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="mr-5"
      animation={activeItem === item.id ? zoomIn : zoomOut}
      duration={500}
    >
      <TouchableOpacity
        className="relative flex justify-center items-center"
        activeOpacity={0.7}
      >
        <ImageBackground
          source={{
            uri: item.image,
          }}
          className="w-64 h-48 rounded-xl my-5 overflow-hidden shadow-lg shadow-black/40"
          resizeMode="cover"
        />
        <View className="flex flex-row gap-1 flex-wrap w-64">
          {item.tags &&
            item.tags.split(", ").map((it: any, index: number) => (
              <View key={index} className="rounded-xl h-auto bg-secondary-100">
                <Text className="text-white py-1 px-1 w-fit font-plight">
                  {it}
                </Text>
              </View>
            ))}
        </View>

        {/* <View className="flex justify-between flex-row">
          <View className="flex-1 border">
            <Text
              className="font-psemibold text-sm text-white"
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <View className="mt-2">
              <Text
                className="text-xs text-gray-100 font-pregular"
                numberOfLines={1}
              >
                {item.lecturer}
              </Text>
              <View className="flex flex-row gap-x-3 mt-2">
                <Text
                  className="text-xs text-gray-100 font-psemibold"
                  numberOfLines={1}
                >
                  {item.price} $
                </Text>
                <Text
                  className="text-xs text-gray-100 font-psemibold"
                  numberOfLines={1}
                >
                  {item.hours} hours
                </Text>
              </View>
            </View>
          </View>
        </View> */}
      </TouchableOpacity>
    </Animatable.View>
  );
};

const TrendingCourses = ({ posts }: { posts: any[] }) => {
  const [activeItem, setActiveItem] = useState(posts[0]);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: any[];
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};

export default TrendingCourses;
