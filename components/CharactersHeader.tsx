import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const CharactersHeader = ({filterPress}) => {
  return (
    <View className='flex-row justify-between items-center p-2'>
      <Text className='text-2xl font-pbold'>All Characters</Text>
      <Ionicons onPress={filterPress} name='filter' size={25}/>
    </View>
  )
}

export default CharactersHeader