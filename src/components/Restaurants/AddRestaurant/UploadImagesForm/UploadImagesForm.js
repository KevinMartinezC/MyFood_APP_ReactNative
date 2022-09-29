import React from 'react';
import { View, Text, Alert } from 'react-native';
import {Icon, Avatar} from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4 as uuid} from "uuid";
import {styles} from "./UploadImagesForm.styles"


export function UploadImagesForm( props ) {
  const {formik} = props;

const openGallery = async () => {//funcion para abrir galaria de imagenes
   const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4,3],
    quality: 1,
   });

   if(!result.cancelled) {
    uploadImage(result.uri);
   }
  };

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage();
    const storageRef = ref(storage,`restaurants/${uuid()}`);

    uploadBytes(storageRef, blob).then((snapshot) =>{
      console.log(snapshot);
    })
  }


  return (
    <>
      <View style={styles.viewImage}>
        <Icon
          type="material-community"
          name="camera"
          color="#a7a7a7"
          containerStyle={styles.containerIcon}
          onPress={openGallery}
        />
      </View>
    </>
  )
}