import * as React from "react";
import { ScrollView, View, Text } from "react-native";
import { Searchbar, Button } from "react-native-paper";
import MallListCard from "../components/MallListCard";

export default function MallList({ navigation }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onChangeSearch = (query) => setSearchQuery(query);
  // console.log(searchQuery);

  return (
    <ScrollView>
      <Searchbar
        placeholder="Cari Lokasi Parkir"
        onChangeText={onChangeSearch}
        value={searchQuery}
        className="bg-slate-50 mx-3 mt-2 h-[40px] rounded-2xl"
      />

      <View className="flex flex-row justify-between p-3">
        <Text className="text-lg font-semibold p-1">
          Lokasi Parkir.In terdekat
        </Text>
        <Button
          icon="map-marker-radius-outline"
          mode="contained"
          className="bg-amber-500"
          onPress={() => console.log("Pressed")}
        >
          Petunjuk
        </Button>
      </View>

      <MallListCard navigation={navigation} />
      <MallListCard navigation={navigation} />
      <MallListCard navigation={navigation} />
    </ScrollView>
  );
}
