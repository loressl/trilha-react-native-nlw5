import React, { useEffect, useState } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Image 
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from "@react-native-async-storage/async-storage";

import userImg from '../assets/tinkerbell.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header(){
   const [userName, setUserName] = useState<string>();

   useEffect(() => {
       async function loadStorageUserName() {
           const user = await AsyncStorage.getItem("@plantmanager:user");

           setUserName(user || "");
       }

       loadStorageUserName();
   }, []);


   return(
      <View style={ styles.container }>
         <View>
            <Text style={ styles.greeting }>Olá,</Text>
            <Text style={ styles.userName }>{userName}</Text>
         </View>

         <Image 
            source={ userImg } 
            style={ styles.image }
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      width: '100%',
      flexDirection: 'row',
      marginTop: getStatusBarHeight(),
      paddingVertical: 20,
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   greeting: {
      color: colors.heading,
      fontSize: 32,
      fontFamily: fonts.text,
   },

   userName: {
      color: colors.heading,
      fontSize: 32,
      lineHeight: 40,
      fontFamily: fonts.heading,
   },

   image: {
      width: 70,
      height: 70,
      borderRadius: 40,
   },
});