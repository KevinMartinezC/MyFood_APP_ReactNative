import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { UserNotLogged } from "../components/Favorites";



export  function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const auth = getAuth();

  useEffect(() => {
   onAuthStateChanged(auth, (user) =>{
    setHasLogged(user ? true : false);
   })
  }, [])
  
  if(!hasLogged) return <UserNotLogged/>

  return (
    <View>
      <Text>FavoritesScreen</Text>
    </View>
  )
}