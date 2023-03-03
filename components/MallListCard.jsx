import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

export default function MallListCard({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Mall Detail")}
      className="border-b-[0.5px] h-[120px] mx-3 my-1 p-2 flex flex-row"
    >
      <Image
        source={{
          uri: "https://images.bisnis.com/posts/2019/02/28/894618/gandaria-city.jpg",
        }}
        className="w-[140px] h-[100px] rounded-2xl "
      ></Image>
      <View className="w-[220px] mx-2 gap-y-2">
        <Text className="font-bold">Gandaria City</Text>
        <Text className="">
          <View></View>10:00 - 22.00 WIB
        </Text>
        <Text className="font-semibold">Rp. 15.000</Text>
        <Text className="font-light text-right">3.456 km</Text>
      </View>
    </TouchableOpacity>
  );
}
