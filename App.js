import React from "react";

import ArtistScreen from "./components/screens/ArtistScreen";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import NavigationService from "./components/misc/NavigationService";
import HomeScreen from "./components/screens/HomeScreen";
import PlayerScreen from "./components/screens/components/Player/PlayerScreen";
import LibraryScreen from "./components/screens/LibraryScreen";
import SearchScreen from "./components/screens/SearchScreen";
import SettingsScreen from "./components/screens/SettingsScreen";
import AlbumTracksScreen from "./components/screens/AlbumTracksScreen";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import BottomNav from "./components/ui/BottomNav";
import ChatScreen from "./components/screens/ChatScreen";
import PlaylistScreen from "./components/screens/PlaylistScreen";
import PlaylistTracksScreen from "./components/screens/PlaylistTracksScreen";
import LocalTrackListScreen from "./components/screens/LocalTrackListScreen";
import AboutScreen from "./components/screens/AboutScreen";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null
      }
    },
    Settings: {
      screen: SettingsScreen
    },
    About: {
      screen: AboutScreen
    },
    Chat: {
      screen: ChatScreen
    },
    Playlist: {
      screen: PlaylistScreen
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#1d1d1d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const SearchStack = createStackNavigator(
  {
    Search: {
      screen: SearchScreen,
      navigationOptions: {
        header: null //this will hide the header
      }
    },
    Artist: {
      screen: ArtistScreen
    },
    AlbumTracks: {
      screen: AlbumTracksScreen
    }
  },
  {
    initialRouteName: "Search",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#1d1d1d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const LibraryStack = createStackNavigator(
  {
    Library: {
      screen: LibraryScreen,
      navigationOptions: {
        header: null
      }
    },
    PlaylistTracks: {
      screen: PlaylistTracksScreen
    },
    LocalTrackList: {
      screen: LocalTrackListScreen
    }
  },
  {
    initialRouteName: "Library",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#1d1d1d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const BottomNavStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"home"}
            size={focused ? 30 : 24}
            color={`${focused ? "#49ff8fea" : "#d1d1d1b7"}`}
          />
        )
      }
    },
    Search: {
      screen: SearchStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"magnify"}
            size={focused ? 30 : 24}
            color={`${focused ? "#49ff8fea" : "#d1d1d1b7"}`}
          />
        )
      }
    },
    Library: {
      screen: LibraryStack,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <MaterialIcon
            name={"library-music"}
            size={focused ? 30 : 24}
            color={`${focused ? "#49ff8fea" : "#d1d1d1b7"}`}
          />
        )
      }
    }
  },
  {
    initialRouteName: "Home",
    tabBarComponent: props => <BottomNav {...props} />,
    tabBarOptions: {
      activeTintColor: "#49ff8fea",
      labelStyle: {
        fontFamily: "CircularStd-Book"
      }
    },
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#1d1d1d"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const MainStack = createStackNavigator(
  {
    Main: {
      screen: BottomNavStack,
      navigationOptions: {
        header: null //this will hide the header
      }
    },
    Player: {
      screen: PlayerScreen,
      navigationOptions: {
        header: null //this will hide the header
      }
    }
  },
  {
    initialRouteName: "Main"
  }
);
const AppContainer = createAppContainer(MainStack);

class App extends React.Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default App;
