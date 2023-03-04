import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SpecifiedView = ({ children, style }) => {
  return Platform.OS === "ios" ? (
    <SafeAreaView style={style}>{children}</SafeAreaView>
  ) : (
    <SafeAreaView>
      <View style={style}>{children}</View>
    </SafeAreaView>
  );
};

export default SpecifiedView;
