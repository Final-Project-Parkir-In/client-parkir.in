import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';

export default function MapsMallCard({ navigation }) {
  return (
    <View className='px-6 h-screen bg-white'>
      {/* INI SCROLLABLE MALL CARD */}

      <TouchableOpacity
        className='h-fit border border-slate-300 rounded-2xl'
        //   onPress={() => console.log("KENA MALL NYA")}
        onPress={() => navigation.navigate('Mall Detail')}
      >
        <Image
          source={{
            uri: 'https://images.bisnis.com/posts/2019/02/28/894618/gandaria-city.jpg',
          }}
          className='w-full h-[280px] rounded-t-2xl'
        />
        <View className='gap-2 p-2'>
          <Text className='text-3xl'>Lippo Mall Kemang</Text>
          <Text className='text-xs'>
            Jalan Pangeran Antasari No.36, RW.5, Bangka, Kec. Mampang Prapatan,
            Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12150
          </Text>
          <View className='flex flex-row justify-between items-center px-1'>
            <View className='flex flex-row items-center'>
              <Avatar.Icon
                size={24}
                color='black'
                icon='clock-outline'
                className='bg-transparent'
              />
              <Text className='text-xs'>10:00 - 22:00</Text>
            </View>
            <View className='flex flex-row items-center'>
              <Avatar.Icon
                size={24}
                color='black'
                icon='map-marker-radius-outline'
                className='bg-transparent'
              />
              <Text className='text-xs'>3.5 km</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        className='h-fit border border-slate-300 rounded-2xl'
        onPress={() => console.log('KENA MALL NYA')}
      >
        <Image
          source={{
            uri: 'https://lirp.cdn-website.com/61d4ea87/dms3rep/multi/opt/rsz_inpp_plaza_indonesia-640w.jpg',
          }}
          className='w-full h-[280px] rounded-t-2xl'
        />
        <View className='gap-2 p-2'>
          <Text className='text-3xl'>Plaza Indonesia</Text>
          <Text className='text-xs'>
            Jalan Pangeran Antasari No.36, RW.5, Bangka, Kec. Mampang Prapatan,
            Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12150
          </Text>
          <View className='flex flex-row justify-between items-center px-1'>
            <View className='flex flex-row items-center'>
              <Avatar.Icon
                size={24}
                color='black'
                icon='clock-outline'
                className='bg-transparent'
              />
              <Text className='text-xs'>10:00 - 22:00</Text>
            </View>
            <View className='flex flex-row items-center'>
              <Avatar.Icon
                size={24}
                color='black'
                icon='map-marker-radius-outline'
                className='bg-transparent'
              />
              <Text className='text-xs'>3.5 km</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {/* END OF SCROLLABLE MALL CARD */}
    </View>
  );
}
