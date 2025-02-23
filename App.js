import React, { useState } from "react";
import { Provider } from "react-redux";
import * as SplashScreen from "expo-splash-screen";
import { bootstrap } from "./src/bootstrap";
import { AppNavigator } from "./src/navigation/AppNavigation";
import store from "./src/store/index";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    try {
      bootstrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsReady(true);
    }
  } else {
    SplashScreen.hide();
  }

  return (
    <Provider store={ store }>
      <AppNavigator />
    </Provider>
  );
}
