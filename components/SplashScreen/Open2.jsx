import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GetStarted from './GetStarted'
import splash2image  from '../../assets/images/splash2.png'

const Open2 = () => {
    const description =   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsam facere cum tempora porro deleniti fugit voluptatem neque sed suscipit'
    const title = 'Make Payment'
      return (
        <View>
          <GetStarted description={description} title={title} imageContent={splash2image} pageNumber={2}/>
        </View>
      )
}

export default Open2

const styles = StyleSheet.create({})