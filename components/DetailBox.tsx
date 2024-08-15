import { View, Text } from 'react-native'
import React from 'react'

const DetailBox = ({title, children}) => {
    return (
        <View className='flex-row items-center my-2'>
            <View className='justify-between pl-8 w-1/2 flex-grow flex-row'>
                <Text className='font-pblack text-gray-600 text-xl'>{title}</Text>
                {/* <Text className='font-pbold text-xl pr-8'>:</Text> */}
            </View>
            <View className='justify-center w-1/2 flex-shrink-0 flex-grow'>
                {children}
            </View>
        </View>
    )
}

export default DetailBox