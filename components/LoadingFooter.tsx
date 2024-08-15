import { View, Text } from 'react-native'
import React from 'react'
import loading from '@/assets/loading.json'
import LottieView from 'lottie-react-native'

const LoadingFooter = ({isLoading, hasMore}) => {
  return (
    <View className='w-full justify-center items-center'>
        {
            hasMore&&
            <LottieView source={loading} style={{width:256, height:82}}  loop autoPlay/>
        }
    </View>
  )
}

export default LoadingFooter