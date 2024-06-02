import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

import { icons } from "../constants";
import CustomButton from "./CustomButton";

export interface CourseCardPropType {
  title: string;
  lecturer: string;
  avatar: ImageSourcePropType;
  thumbnail: string;
  price: number;
  hours: number;
  enrolled?: boolean;
}

const CourseCard = ({
  title,
  lecturer,
  avatar,
  thumbnail,
  price,
  hours,
  enrolled,
}: CourseCardPropType) => {
  //   const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col items-center px-4 mb-10">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center flex-1">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-full h-60 rounded-xl mb-7"
          >
            <Image
              source={{ uri: thumbnail }}
              className="w-full h-full rounded-xl mt-2"
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View className="flex justify-between flex-row">
            <View className="flex-1 border">
              <Text
                className="font-psemibold text-sm text-white"
                numberOfLines={1}
              >
                {title}
              </Text>
              <View className="mt-2">
                <Text
                  className="text-xs text-gray-100 font-pregular"
                  numberOfLines={1}
                >
                  {lecturer}
                </Text>
                <View className="flex flex-row gap-x-3 mt-2">
                  <Text
                    className="text-xs text-gray-100 font-psemibold"
                    numberOfLines={1}
                  >
                    {price} $
                  </Text>
                  <Text
                    className="text-xs text-gray-100 font-psemibold"
                    numberOfLines={1}
                  >
                    {hours} hours
                  </Text>
                </View>
              </View>
            </View>
            <CustomButton
              title={enrolled ? "Enrolled" : "Enroll"}
              icon={enrolled ? icons.done : null}
              handlePress={() => {}}
              containerStyles={`ml-5 rounded-md min-h-0 h-10 px-3 ${
                !enrolled && "bg-transparent border border-secondary"
              }`}
              iconStyles={`${enrolled && 'h-4 w-4 mr-2'}`}
              textStyles="font-pregular text-sm"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CourseCard;
