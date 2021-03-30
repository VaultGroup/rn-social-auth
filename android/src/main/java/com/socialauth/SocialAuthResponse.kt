package com.socialauth

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap

data class SocialAuthResponse(
  val token: String,
  val firstName: String,
  val lastName: String,
  val email: String,
  val phone: String,
  val imageUrl: String
) {

  fun toMap(): WritableMap {
    val map = Arguments.createMap()

    map.putString("token", this.token)
    map.putString("firstName", this.firstName)
    map.putString("lastName", this.lastName)
    map.putString("email", this.email)
    map.putString("phone", this.phone)
    map.putString("imageUrl", this.imageUrl)

    if (BuildConfig.DEBUG) {
      Log.w("REVault", map.toString())
    }

    return map
  }
}
