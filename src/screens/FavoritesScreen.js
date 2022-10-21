import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { size, map } from "lodash";
import {
  UserNotLogged,
  NotFoundRestaurants,

  RestaurantFavorites,
} from "../components/Favorites";
import { Loading } from "../components/shared";
import { db } from "../utils";

export function FavoritesScreen() {
  const [hasLogged, setHasLogged] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      setHasLogged(true);
      const q = query(      
        collection(db, "favorites"),
        where("idUser", "==", user.uid)
      );
      
      onSnapshot(q, async (snapshot) => {
        let restaurantArray = [];
        for await (const item of snapshot.docs) {
          const data = item.data();
          const docRef = doc(db, "restaurants", data.idRestaurant);
          const docSnap = await getDoc(docRef);
          const newData = docSnap.data();
          newData.idFavorite = data.id;
  
          restaurantArray.push(newData);
        }
        setRestaurants(restaurantArray);
      });
 

    } else {

      setHasLogged(false);
     
    }
  });
  
  
  }, []);

   
    

  if (!hasLogged) return <UserNotLogged />;

  if (!restaurants) return <Loading show text="Cargando" />;

  if (size(restaurants) === 0) return <NotFoundRestaurants />;

  if (hasLogged) return (
    
    <ScrollView>
      {map(restaurants, (restaurant) => (
        <RestaurantFavorites key={restaurant.id} restaurant={restaurant} />
      ))}
    </ScrollView>
  );

}