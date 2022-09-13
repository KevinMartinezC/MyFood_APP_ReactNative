import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';
import {screen} from "../../utils";

export function RestauranstScreen(props) {
  const {navigation} = props;
  const goToAddRestaurant = () =>{
    navigation.navigate(screen.restaurant.addRestaurant); //para ir a una screen en el mismo stack
   // navigation.navigate(screen.account.tab,{screen: screen.account.account}) para ir a una screen en un diferente stack
  };

  return (
    <View>
      <Text>RestauranstScreen</Text>
      <Button title="Crear restaurante" onPress={goToAddRestaurant}/>
    </View>
  )
}