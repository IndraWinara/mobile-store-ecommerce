import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GetStarted from './GetStarted'
import splash1image  from '../../assets/images/splash1.png'

const Open1 = () => {
    const description =   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet ipsam facere cum tempora porro deleniti fugit voluptatem neque sed suscipit'
    const title = 'Choose Product'
      return (
        <View>
          <GetStarted description={description} title={title} imageContent={splash1image} pageNumber={1}/>
        </View>
      )
}

export default Open1

const styles = StyleSheet.create({})