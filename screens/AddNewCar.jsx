import * as React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import SpecifiedView from "../components/SpecifiedView";
import { TextInput, Button } from "react-native-paper";

export default function AddNewCar() {
  const [brand, setBrand] = React.useState("");
  const [type, setType] = React.useState("");
  const [numberPlate, setNumberPlate] = React.useState("");
  console.log(brand, type, numberPlate);

  return (
    <SpecifiedView className="p-4 h-screen">
      <ScrollView className="h-full mt-8">
        <View className="mx-6 h-fit p-8 bg-[#D9A14E] rounded-3xl">
          <View className="bg-white mb-3 rounded-md border border-slate-400">
            <Picker
              selectedValue={brand}
              onValueChange={(itemValue, itemIndex) => setBrand(itemValue)}
            >
              <Picker.Item label="Please select" />

              <Picker.Item label="Toyota" value="Toyota" />
              <Picker.Item label="Honda" value="Honda" />
              <Picker.Item label="Mustibisa" value="Mustibisa" />
            </Picker>
          </View>

          <View className="bg-white mb-3 rounded-md border border-slate-400">
            <Picker
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}
            >
              <Picker.Item label="Please select" />
              <Picker.Item label="Fortuner" value="Fortuner" />
              <Picker.Item label="Innova" value="Innova" />
              <Picker.Item label="Esemka" value="Esemka" />
            </Picker>
          </View>

          <TextInput
            label="Registration Number Plate"
            mode="outlined"
            value={numberPlate}
            onChangeText={(numberPlate) => setNumberPlate(numberPlate)}
            className="mb-3"
          />
        </View>
        <View className="justify-center items-center mt-8 ">
          <Button
            icon="login-variant"
            mode="contained"
            textColor="black"
            className="bg-[#D9A14E] w-[15vh] my-2"
            onPress={() => navigation.navigate("Login")}
          >
            Sign In
          </Button>
        </View>
      </ScrollView>
    </SpecifiedView>
  );
}
