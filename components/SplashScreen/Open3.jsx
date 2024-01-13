import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GetStarted from './GetStarted'
import splash3image  from '../../assets/images/splash3.png'

const Open3 = () => {
    const description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsam facere cum tempora porro deleniti fugit voluptatem neque sed suscipit'
    const title = 'Get Your Order'
      return (
        <View>
          <GetStarted description={description} title={title} imageContent={splash3image} pageNumber={3}/>
        </View>
      )
}

export default Open3

const styles = StyleSheet.create({})