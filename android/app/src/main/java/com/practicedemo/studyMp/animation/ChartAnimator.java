package com.practicedemo.studyMp.animation;

import android.animation.ObjectAnimator;
import android.animation.ValueAnimator.AnimatorUpdateListener;
import android.os.Build;

/**
 * 负责Chart中所有动画的对象。
 * 动画仅适用于API级别11（Android 3.0.x）及更高版本。
 * Created by liuchao on 2018/3/11.
 */

public class ChartAnimator {

    /**
     * 在动画更新时更新的对象
     */
    private AnimatorUpdateListener mListener;

    public ChartAnimator() {

    }

    public ChartAnimator(AnimatorUpdateListener listener) {
        mListener = listener;
    }

    /**
     * ################ ################ ################ ################
     */
    /**
     * 以下与动画相关的代码
     */

    /**
     * 动画的相位并影响y轴上的绘制值
     */
    protected float mPhaseY = 1f;

    /**
     * 动画的相位并影响x轴上的绘制值
     */
    protected float mPhaseX = 1f;

    /**
     * ################ ################ ################ ################
     */
    /**定制轻松的方法*/
    public void animateXY(int durationMillisX,int durationMillisY,EasingFunction easingX,EasingFunction easingY){
        if (Build.VERSION.SDK_INT <11)
            return;

        ObjectAnimator animatorY = ObjectAnimator.ofFloat(this,"phaseY",0f,1f);
    }
}
