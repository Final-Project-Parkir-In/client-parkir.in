import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { Button, Avatar } from "react-native-paper";
import SpecifiedView from "../components/SpecifiedView";
import GarageCarCard from "../components/GarageCarCard";

export default function MyGarage({ navigation }) {
  return (
    <SpecifiedView className="bg-white">
      <View className="p-3 items-end">
        <Button
          icon="car"
          mode="contained"
          className="w-[140px] bg-[#D9A14E]"
          onPress={() => navigation.navigate("Add New Car")}
        >
          Add New Car
        </Button>
      </View>
      <ScrollView className="h-full p-6 ">
        <GarageCarCard />
        <GarageCarCard />
        <GarageCarCard />
        <GarageCarCard />
      </ScrollView>
    </SpecifiedView>
  );
}
