package com.socialauth

import android.app.Activity
import android.content.Intent
import android.widget.Toast
import com.facebook.CallbackManager
import com.facebook.FacebookCallback
import com.facebook.FacebookException
import com.facebook.FacebookSdk
import com.facebook.login.LoginManager
import com.facebook.login.LoginResult
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

  lateinit var googleSignInOptions: GoogleSignInOptions

  @ReactMethod
  fun googleSignIn(clientID: String, resolve: Callback) {
    this.resolver = resolve

    googleSignInOptions = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
      .requestIdToken(clientID)
      .requestEmail()
      .build()

    val intent = GoogleSignIn.getClient(reactContext, googleSignInOptions).signInIntent
    currentActivity?.startActivityForResult(intent, RC_GOOGLE_SIGN_IN)
  }

  override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, data: Intent?) {
    if (callbackManager?.onActivityResult(requestCode, resultCode, data) == true) {
      return
    }

    if (requestCode == RC_GOOGLE_SIGN_IN) {

      try {
        val task = GoogleSignIn.getSignedInAccountFromIntent(data)
        val account = task.getResult(ApiException::class.java)

        account?.idToken?.let { token ->

          // Force the user to select an account on each log in
          GoogleSignIn.getClient(reactContext, googleSignInOptions)
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


  var callbackManager: CallbackManager? = null

  @ReactMethod
  fun facebookSignIn(appID: String, resolve: Callback) {
    this.resolver = resolve

    FacebookSdk.setApplicationId(appID)

    if (!FacebookSdk.isInitialized()) {
      FacebookSdk.sdkInitialize(reactApplicationContext);
    }

    callbackManager = CallbackManager.Factory.create();

    LoginManager.getInstance().registerCallback(callbackManager,
      object : FacebookCallback<LoginResult?> {
        override fun onSuccess(loginResult: LoginResult?) {

          resolver?.invoke(loginResult?.accessToken?.token)

        }

        override fun onCancel() {
          resolver?.invoke("cancelled")
        }

        override fun onError(exception: FacebookException) {
          resolver?.invoke(exception.localizedMessage)
        }
      })

    LoginManager.getInstance().logIn(reactContext.currentActivity, arrayListOf("public_profile"))
  }
}
