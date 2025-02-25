package myfinances.test.com;

import android.os.Bundle;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;


public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Grab WebView
    WebView webView = (WebView) findViewById(R.id.webview);
    WebSettings webSettings = webView.getSettings();

    // The Magic
    webSettings.setUseWideViewPort(true);
    webSettings.setLoadWithOverviewMode(true);
  }
}
