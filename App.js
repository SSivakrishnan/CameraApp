//import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import * as MediaLibrary from "expo-media-library";
export default function App() {
  const [startCamera, setStartCamera] = useState(false);
  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    if (status === "granted") {
      setStartCamera(true);
    } else {
      Alert.alert("Access denied");
    }
  };
  const Save_the_photo = async (photo) => {
    const { status } = Permissions.askAsync(Permissions.CAMERA_ROLL);
    const assert = await MediaLibrary.createAssetAsync(photo);
    MediaLibrary.createAlbumAsync("CAMERA_APP", assert);
    console.log(status);
    console.log("Photo Stored");
  };

  const __takePicture = async () => {
    if (!camera) return;
    const photoobj = await camera.takePictureAsync();
    const photosrc = photoobj.uri;
    Save_the_photo(photosrc);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {startCamera ? (
        <Camera
          style={{ flex: 1, width: "100%" }}
          ref={(r) => {
            camera = r;
          }}
        ></Camera>
      ) : (
        <TouchableOpacity
          onPress={__startCamera}
          style={{
            width: 130,
            borderRadius: 4,
            backgroundColor: "#14274e",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: 40,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Take picture
          </Text>
        </TouchableOpacity>
      )}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          //   flexDirection: "row",
          //  flex: 1,
          width: "100%",
          padding: 20,
          //backgroundColor: "red",
          //justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            //flex: 1,
            // backgroundColor: "blue",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={__takePicture}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 35,
              backgroundColor: "#fff",
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // view: {},
  //capture: {},
});
