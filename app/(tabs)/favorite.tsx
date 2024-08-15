import { Text, SafeAreaView, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CharacterCard from '@/components/core/CharacterCard'

const favourite = () => {
    const [charactersKeys, setCharactersKeys] = useState([])
    const [favCharacter, setFavCharacter] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const getSavedCharacter = async () => {

        setRefreshing(true)
        setFavCharacter([])
        setCharactersKeys([])
        setRefreshing(false)
        setCharactersKeys( await AsyncStorage.getAllKeys())
        console.log(favCharacter)
        
}

const getCharacters = async () => {
    charactersKeys.forEach(async key => {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            favCharacter.push(JSON.parse(value));
        }
    });
}

useEffect(()=>{
    getSavedCharacter()

},[])


useEffect(()=>{
    getCharacters()
},[charactersKeys])
  return (
    <SafeAreaView>
      <FlatList
      ListHeaderComponent={ <Text className='font-pblack p-3 text-2xl'>Favorite Characters</Text>
      }
        refreshControl={<RefreshControl  onRefresh={()=>getSavedCharacter()} refreshing={refreshing}/>}
        numColumns={2}
        data={favCharacter}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <CharacterCard characterData={item} />}
      />
    </SafeAreaView>
  )
}

export default favourite