import React from "react";
import { TouchableOpacity, Text } from "react-native";

export default function ParkingSpot() {
  const [isSelected, setIsSelected] = React.useState(
    "w-20 h-20 m-2 rounded-xl bg-amber-100 shadow-lg justify-center items-center"
  );

  const handleSelect = () => {
    if (
      isSelected ==
      "w-20 h-20 m-2 rounded-xl bg-amber-100 shadow-lg justify-center items-center"
    ) {
      setIsSelected(
        "w-20 h-20 m-2 rounded-xl bg-amber-100 shadow-lg justify-center items-center border-4 border-[#2F3B6E]"
      );
    } else {
      setIsSelected(
        "w-20 h-20 m-2 rounded-xl bg-amber-100 shadow-lg justify-center items-center"
      );
    }
  };

  return (
    <TouchableOpacity className={isSelected} onPress={handleSelect}>
      <Text className="font-extrabold text-xl text-[#2F3B6E]">B3</Text>
    </TouchableOpacity>
  );
}
