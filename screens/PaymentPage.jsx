import React from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";

export default function PaymentPage() {
  return (
    <View className="p-4">
      <View className=" h-[20%]">
        <Text>Ringkasan Transaksi</Text>
        <View className="border my-3 h-[70%] rounded-xl">
          <Image
            source={{
              uri: "https://images.bisnis.com/posts/2019/02/28/894618/gandaria-city.jpg",
            }}
            className="w-[60px] h-[60px]"
          ></Image>
        </View>
      </View>

      <View className="h-[68%]">
        <Text>Pilih Metode Pembayaran</Text>
        <View className="border h-[90%] my-3 rounded-xl">
          <Text>testttt</Text>
        </View>
      </View>

      <View className="border h-[12%] justify-center items-center">
        <View className="border h-8 w-full flex flex-row justify-between items-center">
          <Text className="font-bold">Amount to pay (booking)</Text>
          <Text className="font-bold">Rp 15.000</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("Payment Page")}
          className="w-80 bg-[#2F3B6E] rounded-xl"
        >
          Bayar
        </Button>
      </View>
    </View>
  );
}
