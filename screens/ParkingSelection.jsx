import {
  ScrollView,
  View,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Button, Badge } from "react-native-paper";
import React from "react";
import SpecifiedView from "../components/SpecifiedView";
import ParkingSpot from "../components/ParkingSpot";

export default function ParkingSelection({ navigation }) {
  return (
    <SpecifiedView style={{ flex: 1 }} className="bg-[#D9A14E]">
      <ScrollView>
        <View className="h-16 justify-center items-center">
          <Text className="mt-4 text-xl font-bold">Lippo Mall Kemang</Text>
        </View>
        <View className="mt-4 h-[150%] p-4 items-center rounded-t-3xl bg-white">
          <View className="my-4">
            <Text className="text-base">Select your parking spot</Text>
          </View>
          <View className="mt-10 p-4 w-[90%] flex flex-row flex-wrap justify-center rounded-xl bg-white shadow-2xl">
            <ParkingSpot />
            <ParkingSpot />
            <ParkingSpot />
            <ParkingSpot />
            <ParkingSpot />
            <ParkingSpot />
          </View>

          <View className="flex flex-row items-center p-4 mt-8">
            <View className="items-center gap-1 flex flex-row">
              <Badge className="bg-amber-300" />
              <Text>Tersedia</Text>
            </View>
            <View className="items-center gap-1 flex flex-row mx-4">
              <Badge className="bg-slate-400" />
              <Text>Tidak Tersedia</Text>
            </View>
            <View className="items-center gap-1 flex flex-row">
              <View className="bg-amber-300 border-2 border-[#2F3B6E] rounded-full h-6 w-6" />
              {/* <Badge className="bg-[#D9A14E] border-[#2F3B6E]" /> */}
              <Text>Dipilih</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="w-full justify-center items-center absolute bottom-0 bg-white">
        <View className="h-14 p-4 w-full flex flex-row justify-between items-center">
          <Text className="font-bold">Price (per hour)</Text>
          <Text className="font-bold">Rp 15.000</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Payment Page")}
          className="w-80 mb-10 mt-4 bg-[#2F3B6E] rounded-xl"
        >
          Booking
        </Button>
      </View>
    </SpecifiedView>
  );
}
