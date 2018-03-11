package com.practicedemo.studyMp.animation;

import android.annotation.SuppressLint;
import android.animation.TimeInterpolator;

/**
 * 用于创建定制缓动功能的界面。 使用Android提供的TimeInterpolator界面。
 * Created by liuchao on 2018/3/11.
 */

@SuppressLint("NewApi")
public interface EasingFunction extends TimeInterpolator {

    @Override
    float getInterpolation(float input);
}
