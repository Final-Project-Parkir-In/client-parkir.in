import * as React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";

export default function GarageCarCard() {
  const [isDefault, setIsDefault] = React.useState("star-outline");

  const handleSelect = () => {
    if (isDefault == "star") {
      setIsDefault("star-outline");
      console.log("CHANGE isDefault CAR => FALSE")
    } else {
      setIsDefault("star");
      console.log("CHANGE isDefault CAR => TRUE")
    }
  };

  return (
    <TouchableOpacity
      className="border border-slate-400 h-28 px-2 flex flex-row items-center rounded-xl my-2"
      onPress={handleSelect}
    >
      <View className="bborder w-[25%] h-[75%] justify-center items-center">
        <Avatar.Icon
          size={70}
          icon="car-hatchback"
          color="#2F3B6E"
          className=" bg-white shadow-md"
        />
      </View>
      <View className="bborder justify-center">
        <View className="bborder flex flex-row p-1">
          <Text className="text-lg">Toyota</Text>
          <Text className="text-lg mx-2">|</Text>
          <Text className="text-lg font-semibold">Innova</Text>
        </View>
        <View className="bborder p-1">
          <Text className="text-lg font-bold">B 1234 RFP</Text>
        </View>
      </View>
      <View className="bborder w-[25%] h-[75%] ml-5 justify-center items-center">
        <Avatar.Icon
          size={70}
          icon={isDefault}
          color="#D9A14E"
          className=" bg-white"
        />
      </View>
    </TouchableOpacity>
  );
}
