package com.socialauth

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.util.Log
import android.widget.Toast
import com.facebook.react.bridge.*
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException

val RC_GOOGLE_SIGN_IN = 999

class SocialAuthModule(val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener {

  var resolver: Callback? = null

  init {
    reactContext.addActivityEventListener(this)
  }

  override fun getName(): String {
    return "SocialAuth"
  }


  fun defaultGoogleSignInOptions() = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
    .requestIdToken("539083112611-var842hv7fn4sj8q92suirkrrm7nhl5f.apps.googleusercontent.com")
    .requestEmail()
    .build()

  @ReactMethod
  fun googleSignIn(username: String, resolve: Callback) {
    this.resolver = resolve
    val intent = GoogleSignIn.getClient(reactContext, defaultGoogleSignInOptions()).signInIntent
    currentActivity?.startActivityForResult(intent, RC_GOOGLE_SIGN_IN)
  }

  override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {

    if (requestCode == RC_GOOGLE_SIGN_IN) {

      try {
        val task = GoogleSignIn.getSignedInAccountFromIntent(data)
        val account = task.getResult(ApiException::class.java)

        account?.idToken?.let { token ->

          // Force the user to select an account on each log in
          GoogleSignIn.getClient(reactContext, defaultGoogleSignInOptions())
            .signOut()

          Toast.makeText(reactApplicationContext, token, Toast.LENGTH_SHORT)
          resolver?.invoke(token)

        } ?: run {

          Toast.makeText(reactApplicationContext, "Error!", Toast.LENGTH_SHORT)
          resolver?.invoke("Error!")
//            Snack(viewContainer, "Google sign in failed")?.show()
        }


      } catch (e: ApiException) {
        e.printStackTrace()
//        Log.e("Samepl", e.cause?.localizedMessage)
        Toast.makeText(reactApplicationContext, "Error! ${e.localizedMessage}", Toast.LENGTH_SHORT)
        resolver?.invoke("Error! ${e.localizedMessage}")
//          Snack(viewContainer, "Google sign in failed")?.show()
      }
    }
  }

  override fun onNewIntent(intent: Intent?) {
    // do nothing?
  }

  // Example method
  // See https://reactnative.dev/docs/native-modules-android
  @ReactMethod
  fun multiply(a: Int, b: Int, promise: Promise) {

    promise.resolve(a * b)

  }
}
