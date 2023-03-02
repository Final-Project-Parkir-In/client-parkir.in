import { ScrollView, View, Text, Image } from "react-native";
import { Button } from "react-native-paper";

export default function MallDetail() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Image
          source={{
            uri: "https://images.bisnis.com/posts/2019/02/28/894618/gandaria-city.jpg",
          }}
          className="w-full h-[200px]"
        ></Image>
        <View className="bg-white rounded-t-3xl relative mt-[-16] p-4">
          <View className="h-screen gap-2">
            <View className="gap-2 border">
              <Text className="text-3xl">Lippo Mall Kemang</Text>
              <Text className="text-xs">
                Jalan Pangeran Antasari No.36, RW.5, Bangka, Kec. Mampang
                Prapatan, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta
                12150
              </Text>
              <Text className="text-xs">10:00 - 22:00</Text>
              <Text className="text-xs">3.5 km</Text>
            </View>
            <View className="p-2 h-fit border">
              <View className="flex flex-row justify-between border">
                <Text>Biaya Parkir</Text>
                <Text>Rp. 15.000*</Text>
              </View>
              <Text className="text-xs">*per jam</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0">
        <Button
          //   icon="camera"
          mode="contained"
          onPress={() => console.log("Pressed")}
          className="w-80 mb-4 bg-[#D9A14E] rounded-xl"
        >
          Pesan
        </Button>
      </View>
    </View>
  );
}
