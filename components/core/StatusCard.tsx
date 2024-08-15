import { View, Text, Image } from 'react-native'
import React from 'react'
import { statusImage } from '@/constants/images'

const StatusCard = ({status}) => {
  return (
    <View className='flex-row'>
        <Image className='w-6 h-6' source={statusImage[status] || statusImage.unknown} />
      <Text className='font-pbold text-lg ml-2'>{status}</Text>
    </View>
  )
}

export default StatusCard