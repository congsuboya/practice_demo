package com.practicedemo.testRecycleView;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.practicedemo.BarSrc.ReactBarManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by liuchao on 2017/12/10.
 */

public class MyViewPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new ReactBarManager()
        );
    }


}
