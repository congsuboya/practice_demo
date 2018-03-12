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
     * ################ ################ 定制自定义动画的方法 ################ ################
     */


    /**
     * 使用指定的动画时间在x轴和y轴上动画绘制/渲染图表。
     * 如果调用animate（...），则不必再调用invalidate（）来刷新图表。
     *
     * @param durationMillisX
     * @param durationMillisY
     * @param easingX
     * @param easingY
     */
    public void animateXY(int durationMillisX, int durationMillisY, EasingFunction easingX, EasingFunction easingY) {
        if (Build.VERSION.SDK_INT < 11)
            return;

        ObjectAnimator animatorY = ObjectAnimator.ofFloat(this, "phaseY", 0f, 1f);
        animatorY.setInterpolator(easingY);
        animatorY.setDuration(durationMillisY);

        ObjectAnimator animatorX = ObjectAnimator.ofFloat(this, "phaseX", 0f, 1f);
        animatorX.setInterpolator(easingX);
        animatorX.setDuration(durationMillisX);

        //确保只有一个动画师生成更新回调（然后调用invalidate（））
        if (durationMillisX > durationMillisY) {
            animatorX.addUpdateListener(mListener);
        } else {
            animatorY.addUpdateListener(mListener);
        }

        animatorX.start();
        animatorY.start();
    }

    /**
     * 使用指定的动画时间在x轴上动画显示图表。
     * 如果调用animate（...），则不必再调用invalidate（）来刷新图表。
     *
     * @param durationMillis
     * @param easing
     */
    public void animateX(int durationMillis, EasingFunction easing) {
        if (Build.VERSION.SDK_INT < 11)
            return;

        ObjectAnimator animatorX = ObjectAnimator.ofFloat(this, "phaseX", 0f, 1f);
        animatorX.setInterpolator(easing);
        animatorX.setDuration(durationMillis);
        animatorX.addUpdateListener(mListener);
        animatorX.start();
    }

    /**
     * 使用指定的动画时间在y轴上动画显示图表。
     * 如果调用animate（...），则不必再调用invalidate（）来刷新图表。
     *
     * @param durationMillis
     * @param easing
     */
    public void animateY(int durationMillis, EasingFunction easing) {
        if (Build.VERSION.SDK_INT < 11)
            return;
        ObjectAnimator animatorY = ObjectAnimator.ofFloat(this, "phaseY", 0f, 1f);
        animatorY.setInterpolator(easing);
        animatorY.setDuration(durationMillis);
        animatorY.addUpdateListener(mListener);
        animatorY.start();
    }

    /**
     * ################ ################ ################ ################
     */
    /** METHODS FOR PREDEFINED EASING */


    public void 

    /**
     * 这会得到用于动画值的y相。
     *
     * @return
     */
    public float getPhaseY() {
        return mPhaseY;
    }

    /**
     * 这会修改用于动画值的y相位。
     *
     * @param phase
     */
    public void setPhaseY(float phase) {
        mPhaseY = phase;
    }

    /**
     * 这会得到用于动画值的x阶段。
     *
     * @return
     */
    public float getPhaseX() {
        return mPhaseX;
    }

    /**
     * 这会修改用于动画值的x阶段。
     *
     * @param phase
     */
    public void setPhaseX(float phase) {
        mPhaseX = phase;
    }
}
