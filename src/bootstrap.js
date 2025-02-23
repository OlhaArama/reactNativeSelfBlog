import * as Font from "expo-font";
import { DB, init } from "./db";

export const bootstrap = async () => {
  try {
    await Font.loadAsync({
      "open-sans-regular": require("../assets/fonts/OpenSans-Regular.ttf"),
      "open-sans-bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    })
    // await DB.init()
    await init()
    console.log("started...");
  } catch (e) {
    console.log("Error", e);
  }
};
