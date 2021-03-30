package com.socialauth

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import com.facebook.*
import com.facebook.common.executors.SerialExecutorService
import com.facebook.login.LoginManager
import com.facebook.login.LoginResult
import com.facebook.react.bridge.*
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import org.json.JSONObject
import java.lang.Exception
import java.util.concurrent.Executors


const val RC_GOOGLE_SIGN_IN = 999

class SocialAuthModule : ReactContextBaseJavaModule, ActivityEventListener {

  private var resolver: Callback? = null

  private lateinit var googleSignInOptions: GoogleSignInOptions

  private var callbackManager: CallbackManager? = null

  private val reactContext: ReactApplicationContext
    get() = this.reactApplicationContext

  constructor(reactContext: ReactApplicationContext): super(reactContext) {
    reactContext.addActivityEventListener(this)
  }

  override fun getName(): String {
    return "SocialAuth"
  }

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
    reactContext.runOnUiQueueThread a@{
      if (callbackManager?.onActivityResult(requestCode, resultCode, data) == true) {
        return@a
      }

      if (resolveGoogleActivityResult(requestCode, resultCode, data)) {
        return@a
      }
    }
  }


  private fun resolveGoogleActivityResult(requestCode: Int, resultCode: Int, data: Intent?): Boolean {

    if (requestCode != RC_GOOGLE_SIGN_IN) {
      return false
    }

    try {
      val task = GoogleSignIn.getSignedInAccountFromIntent(data)
      val account = task.getResult(ApiException::class.java)

      account?.idToken?.let { token ->

        this.resolveWith(
          token = token,
          firstName = account.givenName,
          lastName = account.familyName,
          email = account.email,
          phone = "",
          imageUrl = account.photoUrl?.toString()
        )

        // Force the user to select an account on each log in
//        GoogleSignIn.getClient(reactContext, googleSignInOptions)
//          .signOut()

      } ?: run {

        this.resolveWith(null, "Unable to authenticate with Google")

      }


    } catch (e: ApiException) {
      this.resolveWith(e)
    }

    return true
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

  @ReactMethod
  fun facebookSignIn(appID: String, resolve: Callback) {
    this.resolver = resolve

    reactContext.runOnUiQueueThread {

      FacebookSdk.setApplicationId(appID)

      if (!FacebookSdk.isInitialized()) {
        FacebookSdk.sdkInitialize(reactApplicationContext)
        FacebookSdk.fullyInitialize()
      }

      callbackManager = CallbackManager.Factory.create()

      LoginManager.getInstance().registerCallback(callbackManager,

        object : FacebookCallback<LoginResult?> {

          override fun onSuccess(loginResult: LoginResult?) {

            val task = GraphRequest(
              AccessToken.getCurrentAccessToken(),
              "me",
              Bundle().apply {
                putString("fields", "first_name, last_name, email, picture.width(640)")
              },
              HttpMethod.GET
            )

            task.setCallback { response ->

              if (response == null) {

                this@SocialAuthModule.resolveWith(null, "Facebook Graph request failed")

              } else if (response.error != null) {

                this@SocialAuthModule.resolveWith(response.error.exception)

              } else {

                this@SocialAuthModule.resolveWith(
                  token = loginResult?.accessToken?.token ?: "",
                  email = response.jsonObject.optString("email"),
                  firstName = response.jsonObject.optString("first_name"),
                  lastName = response.jsonObject.optString("last_name"),
                  phone = "",
                  imageUrl = response.jsonObject.optJSONObject("picture")?.optJSONObject("data")?.optString("url")
                )

              }

            }

            task.executeAsync()
          }

          override fun onCancel() {
            this@SocialAuthModule.resolveWith(null, "Operation cancelled")
          }

          override fun onError(exception: FacebookException) {
            this@SocialAuthModule.resolveWith(exception)
          }
        })

    }


    LoginManager.getInstance().logIn(reactContext.currentActivity, arrayListOf("public_profile", "email"))
  }

  fun resolveWith(
    token: String?,
    firstName: String?,
    lastName: String?,
    email: String?,
    phone: String?,
    imageUrl: String?
  ) {

    val result = SocialAuthResponse(
      token ?: "",
      firstName ?: "",
      lastName ?: "",
      email ?: "",
      phone ?: "",
      imageUrl ?: ""
    )

    this.resolver?.invoke(null, result.toMap())
  }

  fun resolveWith(error: Exception?, orMessage: String = "Uknown error") {
    this.resolver?.invoke(error?.localizedMessage ?: orMessage, null)
  }
}
