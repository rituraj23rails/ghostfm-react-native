import React from "react";
import { Drawer, Text, TouchableRipple } from "react-native-paper";
import { StyleSheet, View, Alert, ToastAndroid } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useApi from "../../../misc/hooks/useApi";
import RNFetchBlob from "rn-fetch-blob";
import NavigationService from "../../../misc/NavigationService";
import { usePlaylist } from "../../../misc/hooks/usePlaylist";
import { getRandomInt } from "../../../misc/Utils";

export const LocalContextMenu = props => {
  const { item, onClose, playlistId, reload } = props;
  const { removeFromPlaylist } = usePlaylist();

  const { getLyrics } = useApi();
  const showLyrics = () => {
    getLyrics(item.artist, item.title).then(response => {
      console.log(response);
      if (response && !response.error) {
        Alert.alert(
          item.title,
          response,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
        );
      } else {
        ToastAndroid.show("Lyrics not found", ToastAndroid.SHORT);
      }
      onClose();
    });
  };

  const addToPlaylist = () => {
    NavigationService.navigate("Playlist", { mode: "ADD", track: item });
    onClose();
  };

  const removeTrack = async () => {
    await removeFromPlaylist(playlistId, item.id);
    reload(getRandomInt());
    onClose();
  };
  return (
    <>
      <View style={styles.sheetContainer}>
        <Text style={styles.title}>{`${item.artist} - ${item.title}`}</Text>
        {playlistId && (
          <TouchableRipple onPress={removeTrack}>
            <View style={styles.optionContainer}>
              <Icon name='playlist-remove' color='white' size={24} />
              <Text style={styles.option}> {"Remove from playlist"}</Text>
            </View>
          </TouchableRipple>
        )}
        <TouchableRipple onPress={addToPlaylist}>
          <View style={styles.optionContainer}>
            <Icon name='playlist-plus' color='white' size={24} />
            <Text style={styles.option}> {"Add to playlist"}</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={showLyrics}>
          <View style={styles.optionContainer}>
            <Icon name='playlist-music-outline' color='white' size={24} />
            <Text style={styles.option}> Lyrics</Text>
          </View>
        </TouchableRipple>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  sheetContainer: {
    paddingVertical: 10,
    paddingHorizontal: 14
  },
  option: {
    fontSize: 16,
    paddingLeft: 16
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    paddingTop: 18,
    paddingBottom: 12
  },
  optionContainer: {
    flexDirection: "row",
    paddingVertical: 12
  }
});
