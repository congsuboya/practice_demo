package com.practicedemo.studyMp.utils;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Paint;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.ViewConfiguration;

/**
 * Created by liuchao on 2018/3/3.
 */

public abstract class Utils {

    private static DisplayMetrics mMetrics;
    private static int mMinimumFlingVelocity = 50;
    private static int mMaximumFlingvelocity = 8000;

    public final static double DEG2RAD = (Math.PI / 180.0);
    public final static float FDEG2RAD = (float) (Math.PI / 180.f);

    public final static double DOUBLE_EPSILON = Double.longBitsToDouble(1);

    public final static float FLOAT_EPSILON = Float.intBitsToFloat(1);


    public static void init(Context context) {
        if (context == null) {
            mMinimumFlingVelocity = ViewConfiguration.getMinimumFlingVelocity();
            mMaximumFlingvelocity = ViewConfiguration.getMaximumFlingVelocity();
        } else {
            ViewConfiguration viewConfiguration = ViewConfiguration.get(context);
            mMinimumFlingVelocity = viewConfiguration.getScaledMinimumFlingVelocity();//获得允许执行一个fling手势动作的最小速度值
            mMaximumFlingvelocity = viewConfiguration.getScaledMaximumFlingVelocity();//获得允许执行一个fling手势动作的最大速度值

            Resources res = context.getResources();
            mMetrics = res.getDisplayMetrics();//获得屏幕参数
        }
    }


    /**
     * dp转像素
     *
     * @param dp
     * @return
     */
    public static float convertDpToPixel(float dp) {
        if (mMetrics == null) {
            Log.e("LiuChaoStudyDemo", "Utils 没有初始化，你需要先调用Utils.init(...) 然后再调用Utils.convertDpToPixel(....)");

            return dp;
        }

        return dp * mMetrics.density;
    }

    /**
     * 根据演示文本计算文本的大致宽度，避免重复调用（例如，内部绘图方法）
     *
     * @param paint
     * @param demoText
     * @return
     */
    public static int calcTextWidth(Paint paint, String demoText) {
        return (int) paint.measureText(demoText);
    }


}
