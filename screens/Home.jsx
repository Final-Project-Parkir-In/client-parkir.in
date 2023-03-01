import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

export default function Home({ navigation }) {
  return (
    <ScrollView>
      <View className="h-[35vh] bg-slate-400">
        <Text className="m-auto">Disini gambar semacem jumbotron</Text>
      </View>

      <View className="border flex flex-row h-[50vh] justify-center items-center">
        <View className="flex flex-row mx-2">
          <TouchableOpacity>
            <Card className="w-[180px] h-[180px] justify-center items-center">
              <Text className="">Ini maps nearby</Text>
            </Card>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row mx-2">
          <TouchableOpacity onPress={() => navigation.navigate("Mall List")}>
            <Card className="w-[180px] h-[180px] justify-center items-center">
              <Text className="">Ini see mall list</Text>
            </Card>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
