package com.practicedemo.studyMp.listener;

import android.view.MotionEvent;

/**
 * 在图表上做手势时的回调监听器。
 * Created by liuchao on 2018/3/11.
 */

public interface OnChartGestureListener {
    /**
     * 触摸手势在图表上开始时的回调（ACTION_DOWN）
     *
     * @param me
     * @param lastPerformedGesture
     */
    void onChartGestureStart(MotionEvent me, ChartTouchListener.ChartGesture lastPerformedGesture);

    /**
     * 触摸手势在图表上结束时的回调（ACTION_UP，ACTION_CANCEL）
     *
     * @param me
     * @param lastPerformedGesture
     */
    void onChartGestureEnd(MotionEvent me, ChartTouchListener.ChartGesture lastPerformedGesture);

    /**
     * 图表longPressed时的回调。
     *
     * @param me
     */
    void onChartLongPressed(MotionEvent me);

    /**
     * 双击图表时的回调。
     *
     * @param me
     */
    void onChartDoubleTapped(MotionEvent me);

    /**
     * 单击图表时的回调。
     *
     * @param me
     */
    void onChartSingleTapped(MotionEvent me);

    /**
     * 回调，然后在图表上做出一个扔手势。
     *
     * @param me1
     * @param me2
     * @param velocityX
     * @param velocityY
     */
    void onChartFling(MotionEvent me1, MotionEvent me2, float velocityX, float velocityY);

    /**
     * 通过缩放手势缩放/缩放图表时的回调。
     *
     * @param me
     * @param scaleX 在x轴上的缩放比例
     * @param scaleY 在y轴上的缩放比例
     */
    void onChartScale(MotionEvent me, float scaleX, float scaleY);

    /**
     * 通过拖动手势移动/平移图表时的回调。
     *
     * @param me
     * @param dX 再x轴方向上的平移距离
     * @param dY 再y轴方向上的平移距离
     */
    void onChartTranslate(MotionEvent me, float dX, float dY);
}
