import { View, Text, Modal, KeyboardAvoidingView } from 'react-native'
import React from 'react'

const CustomModal = ({children, visible, withInput=false}) => {
    const content = withInput? 
                        <KeyboardAvoidingView>{children}</KeyboardAvoidingView>
                        :
                        children;
  return (
    <Modal 
    transparent
    visible={visible}
    animationType='fade'
    >
        <View className='justify-center h-full items-center p-4 bg-black/20'>
            {content}
        </View>
    </Modal>
  )
}

export default CustomModal