import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { GlobalContext } from '../../context/GlobalContext'


const MainSection = () => {
  const {sendToken} = useContext(GlobalContext)
  const {setToken} = sendToken
  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=> {
    setToken()
    }}>
      <Text>MainSection</Text>
    </TouchableOpacity>
  )
}

export default MainSection

const styles = StyleSheet.create({})