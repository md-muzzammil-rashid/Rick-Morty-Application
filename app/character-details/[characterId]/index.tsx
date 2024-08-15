import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants/images'
import GenderCard from '@/components/core/GenderCard'
import StatusCard from '@/components/core/StatusCard'
import DetailBox from '@/components/DetailBox'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import loadingAnimation from '@/assets/loading.json'
import LottieView from 'lottie-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'


const index = () => {

  const dummyData = {
    "id": 361,
    "name": "Toxic Rick",
    "status": "Dead",
    "species": "Humanoid",
    "type": "Rick's Toxic Side",
    "gender": "Male",
    "origin": {
      "name": "Alien Spa",
      "url": "https://rickandmortyapi.com/api/location/64"
    },
    "location": {
      "name": "Earth",
      "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
    "episode": [
      "https://rickandmortyapi.com/api/episode/27"
    ],
    "url": "https://rickandmortyapi.com/api/character/361",
    "created": "2018-01-10T18:20:41.703Z"
  }
  const { characterId } = useLocalSearchParams();
  const [characterData, setCharacterData] = useState(dummyData)
  const [favourite, setFavourite] = useState(false)
  const [loading, setLoading] = useState(true);

  //TODO: Fetch character
  const fetchCharacter = async () => {
    console.log("making call");
    await AsyncStorage.getItem(`character-` + characterId)

      .then(data => {
        if (data) {
          setFavourite(true)
        }
      })
      .catch(err => console.log(err)
      )

    const res = await axios.get(`https://rickandmortyapi.com/api/character/` + characterId);
    if (res?.data) {
      setCharacterData(res?.data)
      // console.log(characters);
      if (res?.data) {
        setLoading(false)
      }


    }
  }

  const handleFavourite = async () => {
    if (favourite) {
      setFavourite(false)
      await AsyncStorage.removeItem(`character-` + characterId)
    } else {
      setFavourite(true)
      await AsyncStorage.setItem(`character-` + characterId, JSON.stringify(characterData))
    }
  }

  useEffect(() => {
    fetchCharacter()
  }, [])
  return (
    <SafeAreaView edges={['top', 'bottom']} className='bg-gray-50 h-full flex relative'>
      {
        loading ?
          <View className='w-full h-full justify-center items-center'>
            <LottieView source={loadingAnimation} loop autoPlay style={{ width: 256, height: 82 }} />
          </View>
          :
          <ScrollView>
            <View className=' w-full items-center'>

              <Image
                source={{ uri: characterData?.image }} style={{ width: "95%", height: 410 }} resizeMode='cover'
                className=' overflow-hidden rounded-2xl '
              />

            </View>
            <View className='p-5 relative'>
              <Text className='font-pblack text-center text-3xl'>{characterData?.name}</Text>
              <View className='absolute bottom-5 right-4 flex-row gap-2  justify-center items-center  rounded-2xl'>
                <TouchableOpacity onPress={handleFavourite} className='flex-row px-3 py-2  bg-white shadow shadow-gray-500/ border-2  border-gray-200 justify-center items-center rounded-2xl '>

                  <Ionicons name={favourite ? "heart" : 'heart-outline'} color={favourite ? 'red' : "black"} size={30} />

                </TouchableOpacity>
              </View>
            </View>

            <DetailBox title={"Gender"} >
              <GenderCard gender={characterData?.gender} />
            </DetailBox>
            <DetailBox title={"Status"} >
              <StatusCard status={characterData?.status} />
            </DetailBox>

            <DetailBox title={"Species"} >
              <Text className='font-pbold text-lg ml-2'>{characterData?.species}</Text>
            </DetailBox>

            <DetailBox title={"Origin"} >
              <Text className='font-pbold text-lg ml-2'>{characterData?.origin?.name}</Text>
            </DetailBox>
            <DetailBox title={"Last Location"} >
              <Text className='font-pbold text-lg ml-2'>{characterData?.location?.name}</Text>
            </DetailBox>

            <View className='p-6'>
              <Text className='text-2xl font-pbold'>
                Appear in Episodes
              </Text>
              <View>

                {
                  characterData.episode.map(item => (
                    <View key={item} className='border-b border-gray-300 shadow-md '>
                      <Text className='text-lg font-pbold py-3 '>Episode: {item.split("/")[5]}</Text>
                    </View>
                  ))
                }
              </View>
            </View>

          </ScrollView>


      }

    </SafeAreaView>
  )
}

export default index