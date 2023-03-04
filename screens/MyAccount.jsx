import { ScrollView, View, Text, Image } from "react-native";
import SpecifiedView from "../components/SpecifiedView";

export default function MyAccount() {
  return (
    <ScrollView className="p-6">
      <View className="border h-[90px] rounded-xl">
        <Image
          source={{
            uri: "https://images.bisnis.com/posts/2019/02/28/894618/gandaria-city.jpg",
          }}
          className="w-[60px] h-[60px] rounded"
        ></Image>
      </View>
    </ScrollView>
  );
}
