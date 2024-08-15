import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'

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
const CharacterCard = ({characterData}) => {
  // const [characterData, setCharacterData] = useState(dummyData)
  return (
    <TouchableOpacity className='w-1/2' onPress={()=>router.push(`/character-details/${characterData.id}`)}>
    <View className=' p-2  '>
      <View className='border bg-white border-gray-400 items-center rounded-2xl overflow-hidden shadow-black shadow-lg'>
        <Image source={{uri: characterData?.image}} className='w-full h-56' resizeMode='cover' />
        <View className='flex-row w-10/12  truncate justify-center items-center gap-x-2 h-10'>
          <View className={`w-3 h-3 flex-shrink-0  ${characterData.status=="Alive"?"bg-green-500":characterData?.status=="Dead"?"bg-red-600":"bg-gray-300"} rounded-full`}></View>
          <Text className='text-xl pt-2 truncate   font-pbold'>{characterData.name}</Text>
        </View>
        <Text className='text-lg pb-2 truncate bg-white  text-gray-600 font-pbold'>{characterData.species}</Text>
        </View>
    </View>
    </TouchableOpacity>
  )
}

export default CharacterCard