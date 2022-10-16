import React,{useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import {Icon} from "react-native-elements";
import {getAuth} from "firebase/auth";
import {doc, setDoc,getDocs, collection, query, where, deleteDoc} from "firebase/firestore";
import {v4 as uuid} from "uuid";
import {size} from "lodash";
import {db} from "../../../utils";
import {styles} from "./BtnFavorite.styles";
import { async } from '@firebase/util';


export  function BtnFavorite(props) {
    const {idRestaurant} = props;
    const [isFavorite, setIsFavorite] = useState(undefined);
    const auth = getAuth()


    useEffect(() => {
      (async () => {
        const response = await getFavorites()

       if(size(response) > 0){
        setIsFavorite(true);
       }else{
        setIsFavorite(false);
       }

      })();
    }, [idRestaurant])
    
    const getFavorites = async () => {
        const q = query(
            collection(db, "favorites"),
            where("idRestaurant","==", idRestaurant),
            where("idUser", "==", auth.currentUser.uid)
        );

        const result =  await getDocs(q);
        return result.docs;

    };

    const addFavorite = async () => {
        try {
            const idFavorite = uuid();
           const data = {
            id: idFavorite,
            idRestaurant,
            idUser: auth.currentUser.uid
           };

           await setDoc(doc(db, "favorites", idFavorite), data);
           
        } catch (error) {
            console.log(error);
        }
    }

    const removeFavorite = () => {
        console.log("Eliminar favorito")
    };

  return (
    <View style={styles.content} >
        {isFavorite !== undefined && (
            <Icon
                type='material-community'
                name={isFavorite ? "heart" : "heart-outline"}
                color={isFavorite ? "#f00" : "#000"}
                size={35}
                onPress={isFavorite ? removeFavorite : addFavorite}
             />
        )}
      
      
    </View>
  )
}