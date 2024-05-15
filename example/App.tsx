import { UserPreferences, usePreference } from "expo-user-preferences";
import { Button, StyleSheet, Text, View, useColorScheme } from "react-native";

type Locale = "en" | "fr";
type Theme = "system" | "light" | "dark";

// First create a UserPreferences instance including all preferences(theme, locale, etc.)
const userPreferences = new UserPreferences({
  locale: "en" as Locale,
  theme: "system" as Theme,
});

export default function App() {
  // usePreference hook don't depend on any context, you can use it anywhere in your app
  const [locale] = usePreference(userPreferences, "locale");

  const systemTheme = useColorScheme();

  // You can override the initial value by passing it as the third argument if you have to get it from hooks for example
  const [themePreference] = usePreference(
    userPreferences,
    "theme",
    systemTheme,
  );

  const theme = themePreference === "system" ? systemTheme : themePreference;
  // you can now use Theme in your app
  return (
    <View style={styles.container}>
      <Text>{locale}</Text>
      <Text>{theme}</Text>
      <AnotherComponentInDeepTree />
    </View>
  );
}

const AnotherComponentInDeepTree = () => {
  // note that setLocale is type-safe and will only accept "en" or "fr"
  const [, setLocalePreference] = usePreference(userPreferences, "locale");
  const [themePreference, setThemePreference] = usePreference(
    userPreferences,
    "theme",
  );

  return (
    <View style={{ gap: 20 }}>
      <Button
        title="Change locale to FR"
        onPress={() => setLocalePreference("fr")}
      />
      <Button
        title="Switch theme"
        onPress={() =>
          setThemePreference(themePreference === "light" ? "dark" : "light")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
