package com.sevenbud

import android.os.Bundle
import android.os.Handler
import android.os.Looper
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.swmansion.rnscreens.fragment.restoration.RNScreensFragmentFactory
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import android.view.ViewGroup
import android.view.ViewTreeObserver

class MainActivity : ReactActivity() {
  private var splashKeep = true
  private val handler = Handler(Looper.getMainLooper())
  private var fallbackRunnable: Runnable? = null

  override fun onCreate(savedInstanceState: Bundle?) {
    supportFragmentManager.fragmentFactory = RNScreensFragmentFactory()
    val splashScreen = installSplashScreen()
    splashScreen.setKeepOnScreenCondition { splashKeep }

    super.onCreate(savedInstanceState)

    // Safety net: don't hang forever if content-ready signal never fires
    fallbackRunnable = Runnable { splashKeep = false }
    handler.postDelayed(fallbackRunnable!!, 5000L)

    val rootView = findViewById<ViewGroup>(android.R.id.content)
    rootView.viewTreeObserver.addOnGlobalLayoutListener(object :
      ViewTreeObserver.OnGlobalLayoutListener {
      override fun onGlobalLayout() {
        val reactRoot = rootView.getChildAt(0) as? ViewGroup
        if (reactRoot != null && reactRoot.childCount > 0) {
          splashKeep = false
          fallbackRunnable?.let { handler.removeCallbacks(it) }
          rootView.viewTreeObserver.removeOnGlobalLayoutListener(this)
        }
      }
    })
  }

  override fun onDestroy() {
    fallbackRunnable?.let { handler.removeCallbacks(it) }
    super.onDestroy()
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "sevenbud"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
