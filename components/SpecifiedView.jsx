import { Platform, SafeAreaView } from "react-native";
import { SafeAreaView as AndroidViews } from "react-native-safe-area-context";

const SpecifiedView = ({ children, style }) => {
  return Platform.OS === 'ios' ? (
    <SafeAreaView style={style}>{children}</SafeAreaView>
  ) : (
    <AndroidViews style={style}>{children}</AndroidViews>
  );
};

export default SpecifiedView;
