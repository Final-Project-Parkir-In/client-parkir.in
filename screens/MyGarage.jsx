import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-paper";
import SpecifiedView from "../components/SpecifiedView";
import GarageCarCard from "../components/GarageCarCard";

export default function MyGarage() {
  return (
    <SpecifiedView className="bg-white">
      <ScrollView className="h-full p-6 ">
        {/* <TouchableOpacity className="border border-slate-400 h-28 px-2 flex flex-row items-center rounded-xl">
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
              icon="star"
              color="#D9A14E"
              className=" bg-white"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="border border-slate-400 h-28 px-2 flex flex-row items-center rounded-xl">
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
              <Text className="text-lg">Mazda</Text>
              <Text className="text-lg mx-2">|</Text>
              <Text className="text-lg font-semibold">CX-5</Text>
            </View>
            <View className="bborder p-1">
              <Text className="text-lg font-bold">B 5678 RFP</Text>
            </View>
          </View>
          <View className="bborder w-[25%] h-[75%] ml-5 justify-center items-center">
            <Avatar.Icon
              size={70}
              icon="star-outline"
              color="#D9A14E"
              className=" bg-white"
            />
          </View>
        </TouchableOpacity> */}
        
        <GarageCarCard />
        <GarageCarCard />
        <GarageCarCard />
        <GarageCarCard />
      </ScrollView>
    </SpecifiedView>
  );
}
