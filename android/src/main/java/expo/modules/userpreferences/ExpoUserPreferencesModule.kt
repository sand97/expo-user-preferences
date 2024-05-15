package expo.modules.userpreferences

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import android.content.Context
import android.content.SharedPreferences

class ExpoUserPreferencesModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoUserPreferences")

    Function("setValue") { key: String, value: String ->
      getPreferences().edit().putString(key, value).commit()
    }

    Function("getValue") { key: String ->
      return@Function getPreferences().getString(key, null)
    }
  }

  private val context
  get() = requireNotNull(appContext.reactContext)

  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".userpreferences", Context.MODE_PRIVATE)
  }

}
