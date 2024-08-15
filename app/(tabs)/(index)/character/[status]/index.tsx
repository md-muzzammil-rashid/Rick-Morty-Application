import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'
import CharacterCard from '@/components/core/CharacterCard'
import axios from 'axios'
import LoadingFooter from '@/components/LoadingFooter'
import CharactersHeader from '@/components/CharactersHeader'
import CustomModal from '@/components/CustomModal'
import DropDownPicker from 'react-native-dropdown-picker'
import LottieView from 'lottie-react-native'
import loadingAnimation from '@/assets/loading.json'

const speciesCategories = [
  { label: 'Human', value: 'Human' },
  { label: 'Alien', value: 'Alien' },
  { label: 'Humanoid', value: 'humanoid' },
  { label: 'Poopybutthole', value: 'poopybutthole' },
  { label: 'Mythological Creature', value: 'mythological creature' },
  { label: 'Robot', value: 'robot' },
  { label: 'Cronenberg', value: 'cronenberg' },
  { label: 'All', value: 'all' },
];

const index = () => {
  const { status } = useLocalSearchParams();
  const [loading, setLoading] = useState(false)
  const [hasMoreData, setHasMoreData] = useState(false)
  const [characters, setCharacters] = useState([])
  const [url, setUrl] = useState("https://rickandmortyapi.com/api/character/?page=0")
  const [showFilter, setShowFilter] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [openSpecies, setOpenSpecies] = useState(false)
  const [openGender, setOpenGender] = useState(false)
  const [genderValue, setGenderValue] = useState(null)
  const [speciesValue, setSpeciesValue] = useState(null)
  const [statusValue, setStatusValue] = useState(status)
  const [filterOptions, setFilterOptions] = useState({ status: status == 'all' ? "" : status })

  const setFilterOptionsUtil = ({ statusValue, genderValue, speciesValue }) => {
    const options = {};

    if (statusValue && statusValue !== 'all') {
      options.status = statusValue;
    }

    if (genderValue && genderValue !== 'all') {
      options.gender = genderValue;
    }

    if (speciesValue && speciesValue !== 'all') {
      options.species = speciesValue;
    }
    console.log(options);

    return options;
  };

  const fetchCharacters = async () => {
    console.log("making call", filterOptions);
    try {
      const res = await axios.get(url, {

        params: filterOptions
      })

      if (res?.data) {
        setCharacters(prev => ([...prev, ...res.data?.results]))

        if (res?.data?.info?.next) {
          setUrl(res?.data?.info?.next)
          setHasMoreData(true)
        } else {
          setHasMoreData(false)
        }
      }
    } catch (error) {
      console.log("Error in fetching data",error?.message);

    }

    setLoading(false)
  }

  const applyFilter = async () => {
    setUrl(url.split('?')[0])
    setCharacters([])
    setShowFilter(false)
    setTimeout(() => {
      fetchCharacters()
    }, 500)

  }
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      fetchCharacters()
    }, 500)
  }, [])

  useEffect(() => {
    setFilterOptions(setFilterOptionsUtil({
      statusValue, genderValue, speciesValue
    }))
  }, [genderValue, speciesValue, statusValue])
  return (
    <SafeAreaView className='p-2' edges={['top']}>
      {
        loading && !hasMoreData ?
          <View className='w-full h-full justify-center items-center'>
            <LottieView source={loadingAnimation} loop autoPlay style={{ width: 256, height: 82 }} />
          </View>
          :
          <>
            <CustomModal visible={showFilter}>
              <View className='bg-white w-full p-2 pt-5 rounded-lg'>
                <Text className='text-center font-psemibold text-xl'>Filter</Text>
                <View className='p-3 gap-y-4'>
                  <DropDownPicker
                    value={statusValue}
                    setValue={setStatusValue}
                    placeholder='Status'
                    setOpen={setOpenStatus}
                    open={openStatus}
                    zIndex={200000000}
                    items={[{ label: "Alive", value: "Alive" }, { label: "Dead", value: "Dead" }, { label: "Unknown", value: "unknown" }, { label: "All", value: "all" }]}
                  />

                  <DropDownPicker
                    value={genderValue}
                    setValue={setGenderValue}
                    placeholder='Gender'
                    setOpen={setOpenGender}
                    open={openGender}
                    zIndex={2000000}
                    items={[{ label: "Male", value: "Male" }, { label: "Female", value: "Female" }, { label: "Genderless", value: "Genderless" }, { label: "Unknown", value: "unknown" }, { label: "All", value: "all" }]}
                  />

                  <DropDownPicker
                    value={speciesValue}
                    setValue={setSpeciesValue}
                    placeholder='Species'
                    setOpen={setOpenSpecies}
                    open={openSpecies}
                    items={speciesCategories}
                  />

                </View>

                {/* Buttons */}
                <View className='flex-row p-2 -z-10 gap-x-2'>
                  <TouchableOpacity onPress={() => applyFilter()} className='bg-blue-500 p-2 rounded-lg flex-grow'>
                    <Text className='text-center text-white font-psemibold text-lg'>Apply</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className='bg-gray-300 flex-grow p-2 rounded-lg f' onPress={() => setShowFilter(false)}>
                    <Text className='text-center text-gray-600 font-psemibold text-lg'>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </CustomModal>

            <FlatList
              data={characters}
              numColumns={2}
              renderItem={({ item }) => <CharacterCard characterData={item} />}
              onEndReached={hasMoreData && fetchCharacters}
              ListFooterComponent={<LoadingFooter hasMore={hasMoreData} />}
              keyExtractor={item => item.url}
              ListHeaderComponent={<CharactersHeader filterPress={() => 
                setShowFilter(!showFilter)} />}
            />
          </>
      }
    </SafeAreaView>
  )
}

export default index