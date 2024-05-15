import ExpoModulesCore

public class ExpoUserPreferencesModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoUserPreferences")

    Function("setValue") { (key: String, value: String) -> Void in
      UserDefaults.standard.set(theme, forKey:"theme")
    }

    Function("getValue") { (key: String) -> String? in
      UserDefaults.standard.string(forKey: key)
    }
  }
}
