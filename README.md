
# Expo User Preferences

Typed expo module to set and get variable synchronously to UserDefaults for iOS, SharedPreferences for Android and localStorage for the web.

If you have to save theme, locale, etc and get it synchronously to setup your app this library is for you. If you want else to save big data like image please use available SecureStore or AsyncStore provide by expo.

## Installation

````
$ npm install expo-user-preferences
````

## Setup

Create in your project a file preferences.ts for example that will contact User Preferences instance and past this content

````
import { UserPreferences } from "expo-user-preferences";

// ...

type Locale = "en" | "fr";
type Theme = "system" | "light" | "dark";


export const userPreferences = new UserPreferences({
  locale: "en" as Locale,
  theme: "system" as Theme,
  // write all default user's preferences here 😌
});

````

## Get Share preference
In your app you can then import and call usePreference to get any variable like this. note that locale is typed Locale and you can only pass defined property as second argument.

````
  import { usePreference } from "expo-user-preferences";

  //...

  const [localePreference] = usePreference(userPreferences, "locale");

  return <Text>{localePreference}</Text>

````

## Update Share preference
You can update one preference anywhere in your're app and any usePreference values will be updated like with useState. The state is also persisted synchronously and your app will get it on next launch.

````
  const [localePreference, setLocalePreference] = usePreference(userPreferences, "locale");

  <Button
    title="Change locale to FR"
    onPress={() => setLocalePreference("fr")}
  />

````

## Use different default value
Sometime you'll want to get default value from another hook and hook can only declare inside component and new UserPreferences should not.


This is why usePreference accept third argument who can be default value.
For example to init theme of your app you can use

````
import { usePreference } from "expo-user-preferences";
import { useColorScheme } from "react-native";

// ... 

  const systemTheme = useColorScheme();

  const [themePreference] = usePreference(
    userPreferences,
    "theme",
    systemTheme,
  );

// ...
````

## Get value outside of component
If you want to access directly to any preference value outside a component you can do this

````
// where you have create preferences.ts
import { userPreferences } from "preferences"

// ... 

userPreferences.getValue("locale")

````

Note that getValue accept optional initialValue as second argument in case where any value is found in storage

## Set value outside of component
Like Get you only have to call setValue note that key and value is typed

````
userPreferences.setValue("locale", "fr")
````

## Listening value change outside of component

You can also detect value change outside of a component with addListener
````
const listener = (locale) => console.log("new locale" + locale)

const index = userPreferences.addListener(key, setValue);

userPreferences.setValue("locale", "fr")

// should log fr if i have done my work correctly 🥲

userPreferences.removeListener("locale", index)

````