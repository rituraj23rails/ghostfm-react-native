import React, {useState, useEffect, useRef} from 'react';
import {ScrollView, FlatList} from 'react-native-gesture-handler';
import {View, StyleSheet} from 'react-native';
import {
  withTheme,
  Text,
  Card,
  Title,
  Paragraph,
  Button,
  Avatar,
} from 'react-native-paper';
import useApi from '../misc/hooks/useApi';
import TrackList from '../screens/components/TrackList';
import SafeAreaView from 'react-native-safe-area-view';
import {SimilarArtists} from '../screens/components/SimilarArtists';
import {Tab, TabView} from 'react-native-easy-tabs';
import {AlbumList} from '../screens/components/AlbumList';

const ArtistScreen = props => {
  const {navigation} = props;
  const {colors} = props.theme;

  const artistName = navigation.getParam('artistName', '');
  const scrollRef = useRef();

  const [artist, setArtist] = useState();
  const [topTracks, setTopTracks] = useState();
  const [currentTab, setCurrentTab] = useState(0);

  const {getArtistByName, getTopTracksByArtistName} = useApi();

  useEffect(() => {
    if (!artistName) {
      return;
    }
    scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
    getArtistByName(artistName).then(artistData => {
      setArtist(artistData);
      console.log('artist', artistData);
    });
    getTopTracksByArtistName(artistName).then(topTracks => {
      setTopTracks(topTracks);
    });
  }, [artistName]);

  return (
    <ScrollView
      style={{backgroundColor: colors.background, flex: 1}}
      ref={scrollRef}>
      <SafeAreaView style={{backgroundColor: colors.background, flex: 1}}>
        {artist && (
          <React.Fragment>
            <Card style={styles.card}>
              <Card.Cover source={{uri: artist.strArtistThumb}} />
              <Card.Title title={artist.strArtist} style={styles.title} />
            </Card>
            <View style={{alignItems: 'flex-start', flexDirection: 'row'}}>
              <Button mode="contained" onPress={() => setCurrentTab(0)}>
                Songs
              </Button>
              <Button mode="contained" onPress={() => setCurrentTab(1)}>
                Albums
              </Button>
            </View>
            <TabView selectedTabIndex={currentTab}>
              <Tab>
                {topTracks && <TrackList trackList={topTracks}></TrackList>}
              </Tab>
              <Tab lazy>
                <AlbumList artistName={artistName}></AlbumList>
              </Tab>
            </TabView>
            <SimilarArtists artistName={artistName}></SimilarArtists>
          </React.Fragment>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingBottom: 0,
    marginBottom: 0,
  },
  title: {
    transform: [{translateY: -30}],
    backgroundColor: '#0f0f0f94',
    height: 30,
  },
});

export default withTheme(ArtistScreen);
