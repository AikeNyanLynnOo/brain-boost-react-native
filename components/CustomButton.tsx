import {
  ActivityIndicator,
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from "react-native";

export interface CustomButtonPropType {
  title: string;
  icon?: ImageSourcePropType;
  handlePress: (event: GestureResponderEvent) => void;
  containerStyles?: string;
  textStyles?: string;
  iconStyles?: string;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  icon,
  handlePress,
  containerStyles,
  iconStyles,
  textStyles,
  isLoading,
}: CustomButtonPropType) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[54px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      {icon && (
        <Image source={icon} resizeMode="contain" className={`h-5 w-5 mr-3 ${iconStyles}`} />
      )}

      <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
