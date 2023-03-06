import { ScrollView, View, Text, Button } from "react-native";
import SpecifiedView from "../components/SpecifiedView";

export default function MyTicket({navigation}) {
  return (
    <ScrollView>
      <Text>MyTicket</Text>
      <Button onPress={() => navigation.navigate("Detail Ticket")} title="Detail">Detail</Button>
    </ScrollView>
  );
}