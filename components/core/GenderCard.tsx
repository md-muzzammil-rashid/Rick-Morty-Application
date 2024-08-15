import { View, Text, Image } from 'react-native'
import React from 'react'
import { genderImage } from '@/constants/images'

const GenderCard = ({gender}) => {
  return (

    <View className='flex-row'>
        <Image className='w-5 h-5' source={genderImage[gender] || genderImage.unknown}  resizeMode='contain' />
      <Text className='font-pbold text-lg ml-2'>{gender}</Text>
    </View>
  )
}

export default GenderCard