// import React from "react";
// import { createStaticNavigation } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
// import { Platform } from "react-native";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import { MainScreen } from "../screens/MainScreen";
// import { PostScreen } from "../screens/PostScreen";
// import { BookedScreen } from "../screens/BookedScreen";
// import { AboutScreen } from "../screens/AboutScreen";
// import { CreateScreen } from "../screens/CreateScreen";
// import { THEME } from "../theme";

// const navigatorOptions = {
//   headerStyle: {
//     backgroundColor: Platform.OS === "android"
//       ? THEME.MAIN_COLOR
//       : "#fff",
//   },
//   headerTintColor: Platform.OS === "android"
//     ? "#fff"
//     : THEME.MAIN_COLOR,
// };

// const PostNavigator = createStackNavigator(
//   {
//     screenOptions: navigatorOptions,
//     screens: {
//       Main: {
//         screen: MainScreen,
//         options: {
//           title: "Мій блог",
//         },
//       },
//       Post: PostScreen,
//     }
//   },
// );

// const BookedNavigator = createStackNavigator(
//   {
//     screenOptions: navigatorOptions,
//     screens: {
//       Booked: BookedScreen,
//       Post: PostScreen,
//     }
//   },
// );

// const AboutNavigator = createStackNavigator({
//   screenOptions: navigatorOptions,
//   screens: {
//     About: AboutScreen,
//   }
// });

// const CreateNavigator = createStackNavigator({
//   screenOptions: navigatorOptions,
//   screens: {
//     Create: CreateScreen,
//   }
// });

// const bottomTabsConfig = {
//   Post: {
//     screen: PostNavigator,
//     options: {
//       tabBarLabel: "Все",
//       tabBarIcon: info => (
//         <Ionicons name="albums" size={ 25 } color={ info.tintColor } />
//       ), 
//       headerShown: false,
//     }
//   },
//   Booked: {
//     screen: BookedNavigator,
//     options: {
//       tabBarLabel: "Вибране",
//       tabBarIcon: info => (
//         <Ionicons name="star" size={ 25 } color={ info.tintColor } />
//       ),
//       headerShown: false,
//     },
//   },
// };

// const BottomNavigator = 
// // Platform.OS === "android"
// // ? createMaterialBottomTabNavigator({
// //   screens: bottomTabsConfig,
// //   tabBarOptions: {
// //     activeTintColor: THEME.MAIN_COLOR,
// //   }
// // })
// // : 
// createBottomTabNavigator({
//   screens: bottomTabsConfig,
//   tabBarOptions: {
//     activeTintColor: THEME.MAIN_COLOR,
//   }
// });

// const MainNavigator = createDrawerNavigator({
//   screens: {
//     PostTabs: {
//       screen: BottomNavigator,
//       options: {
//         drawerLabel: "Головна",
//         drawerLabelStyle: {
//           fontFamily: "open-sans-bold",
//         },
//         drawerIcon: () => <Ionicons name="list-circle" size={ 24 } />,
//         headerShown: false,
//         drawerActiveTintColor: THEME.MAIN_COLOR,
//       },
//     },
//     About: {
//       screen: AboutNavigator,
//       options: {
//         drawerLabel: "Про блог",
//         drawerLabelStyle: {
//           fontFamily: "open-sans-bold",
//         },
//         drawerIcon: () => <Ionicons name="information-circle" size={ 24 } />,
//         headerShown: false,
//         drawerActiveTintColor: THEME.MAIN_COLOR,
//       },
//     },
//     Create: {
//       screen: CreateNavigator,
//       options: {
//         drawerLabel: "Новий пост",
//         drawerLabelStyle: {
//           fontFamily: "open-sans-bold",
//         },
//         drawerIcon: () => <Ionicons name="create" size={ 24 } />,
//         headerShown: false,
//         drawerActiveTintColor: THEME.MAIN_COLOR,
//       },
//     },
//   },
// });

// export const AppNavigator = createStaticNavigation(MainNavigator);






import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { BookedScreen } from "../screens/BookedScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { THEME } from "../theme";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTabs = createBottomTabNavigator();

const navigatorOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff",
  },
  headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR,
};

const PostNavigator = () => (
  <Stack.Navigator screenOptions={navigatorOptions}>
    <Stack.Screen name="Main" component={MainScreen} options={{ title: "Мій блог" }} />
    <Stack.Screen name="Post" component={PostScreen} />
  </Stack.Navigator>
);

const BookedNavigator = () => (
  <Stack.Navigator screenOptions={navigatorOptions}>
    <Stack.Screen name="Booked" component={BookedScreen} />
    <Stack.Screen name="Post" component={PostScreen} />
  </Stack.Navigator>
);

const AboutNavigator = () => (
  <Stack.Navigator screenOptions={navigatorOptions}>
    <Stack.Screen name="About" component={AboutScreen} />
  </Stack.Navigator>
);

const CreateNavigator = () => (
  <Stack.Navigator screenOptions={navigatorOptions}>
    <Stack.Screen name="Create" component={CreateScreen} />
  </Stack.Navigator>
);

const BottomNavigator = () => (
  <BottomTabs.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Main") {
          iconName = "albums";
        } else if (route.name === "Booked") {
          iconName = "star";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: THEME.MAIN_COLOR,
      tabBarInactiveTintColor: "gray",
      headerShown: false,
    })}
  >
    <BottomTabs.Screen name="Main" component={PostNavigator} options={{ tabBarLabel: "Все" }} />
    <BottomTabs.Screen name="Booked" component={BookedNavigator} options={{ tabBarLabel: "Вибране" }} />
  </BottomTabs.Navigator>
);

const MainNavigator = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,
      drawerActiveTintColor: THEME.MAIN_COLOR,
      drawerLabelStyle: { fontFamily: "open-sans-bold" },
    }}
  >
    <Drawer.Screen
      name="Main"
      component={BottomNavigator}
      options={{
        drawerLabel: "Головна",
        drawerIcon: () => <Ionicons name="list-circle" size={24} />,
      }}
    />
    <Drawer.Screen
      name="About"
      component={AboutNavigator}
      options={{
        drawerLabel: "Про блог",
        drawerIcon: () => <Ionicons name="information-circle" size={24} />,
      }}
    />
    <Drawer.Screen
      name="Create"
      component={CreateNavigator}
      options={{
        drawerLabel: "Новий пост",
        drawerIcon: () => <Ionicons name="create" size={24} />,
      }}
    />
  </Drawer.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <MainNavigator />
  </NavigationContainer>
);

