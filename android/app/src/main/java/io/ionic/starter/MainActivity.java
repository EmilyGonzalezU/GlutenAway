package io.ionic.starter;

import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import android.os.Bundle;
public class MainActivity extends BridgeActivity {
    public void onCreate(Bundle savedInstanceState){
        super.onCreate(savedInstanceState);
        registerPlugin(GoogleAuth.class);
    }
}
