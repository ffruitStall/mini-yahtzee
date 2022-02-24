import React from "react";
import {Text, View} from 'react-native'
import style from '../styles/style'

export default function Header() {
    return(
        <View style={style.header}>
         <Text style={style.title}> 
             TSame Dice Game
         </Text>
        </View>
    )
}