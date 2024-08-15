import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { images } from '@/constants/images';

export default function HomeScreen() {

  return (

    <SafeAreaView className='p-3 gap-3'>

      {/*  All Character Cards */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/character/all')}>
        <View className='p-2 bg-black flex-row rounded-3xl'>
          <Image
            resizeMode='cover'
            className='h-56 w-56 rounded-2xl overflow-hidden'
            source={images.allchar}
          />
          <View className='items-center justify-center w-44 '>
            <Text className='text-white font-pblack text-5xl'>All</Text>
            <Text className='text-2xl font-pblack text-white'>Characters</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Alive Cards */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/character/alive')}>
        <View className='p-2 bg-green-500 flex-row rounded-3xl'>
          <View className='items-center justify-center w-44 '>
            <Text className='text-white font-pblack text-5xl'>Alive</Text>
            <Text className='text-2xl font-pblack text-white'>Characters</Text>
          </View>
          <Image
            resizeMode='contain'
            className='h-56 w-56 rounded-2xl overflow-hidden'
            source={images.alive}
          />
        </View>
      </TouchableOpacity>

      {/* Dead Cards */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/character/dead')}>
        <View className='p-2 bg-red-500 flex-row rounded-3xl'>
          <Image
            resizeMode='contain'
            className='h-56 w-56 rounded-2xl overflow-hidden'
            source={images.dead}
          />
          <View className='items-center justify-center w-36 '>
            <Text className='text-white font-pblack text-5xl'>Dead</Text>
            <Text className='text-2xl font-pblack text-white'>Characters</Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

