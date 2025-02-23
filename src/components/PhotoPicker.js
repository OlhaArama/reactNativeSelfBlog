import React, { useEffect, useState } from "react";
import { View, Image, Button, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';

export const PhotoPicker = ({ onPick }) => {
  const [image, setImage] = useState(null);
  const takePhoto = async () => {
    let img = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!img.canceled) {
      setImage(img.assets[0].uri);
      onPick(img.assets[0].uri);
    }
  };

  return (
    <View style={ styles.wrapper}>
      <Button title="Вибрати фото" onPress={ takePhoto } />

      { image && (
        <Image style={ styles.image } source={{ uri: image }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
});
