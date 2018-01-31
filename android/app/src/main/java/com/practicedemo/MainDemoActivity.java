package com.practicedemo;

import android.app.Activity;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.widget.LinearLayout;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactRootView;

/**
 * Created by chaoye on 2018/1/31.
 */

public class MainDemoActivity extends ReactActivity {

    private LinearLayout MainHolder;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.main_demo);

        MainHolder = (LinearLayout) findViewById(R.id.holder_main);

        ReactRootView mReactRootView = new ReactRootView(this);

        mReactRootView.startReactApplication(
                getReactNativeHost().getReactInstanceManager(),
                "PracticeDemo",
                new Bundle());

        MainHolder.addView(mReactRootView);
    }


}
