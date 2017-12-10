package com.practicedemo.BarSrc;

import android.support.annotation.Nullable;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;

/**
 * Created by liuchao on 2017/12/10.
 */

public class ReactBarManager extends SimpleViewManager<BarView> {
    @Override
    public String getName() {
        return "BarNativeView";
    }

    @Override
    protected BarView createViewInstance(ThemedReactContext reactContext) {
        return new BarView(reactContext);
    }


    @ReactProp(name = "option")
    public void setOption(BarView view, @Nullable ReadableMap option){
        Log.e("yojwojrwlerjwoerjwir",option.toString());
        view.initBarData(option);
    }
}
