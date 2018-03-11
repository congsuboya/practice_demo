package com.practicedemo.studyMp.listener;

import android.view.GestureDetector;
import android.view.MotionEvent;
import android.view.View;

import com.practicedemo.studyMp.charts.Chart;
import com.practicedemo.studyMp.highlight.Highlight;

/**
 * Created by liuchao on 2018/3/11.
 */

public abstract class ChartTouchListener<T extends Chart<?>> extends GestureDetector.SimpleOnGestureListener implements View.OnTouchListener {

    public enum ChartGesture {
        NONE, DRAG, X_ZOOM, Y_ZOOM, PINCH_ZOOM, ROTATE, SINGLE_TAP, DOUBLE_TAP, LONG_PRESS, FLING
    }

    /**
     * 已执行的最后一个触摸手势
     **/
    protected ChartGesture mLastGesture = ChartGesture.NONE;

    //states
    protected static final int NONE = 0;
    protected static final int DRAG = 1;
    protected static final int X_ZOOM = 2;
    protected static final int Y_ZOOM = 3;
    protected static final int PINCH_ZOOM = 4;
    protected static final int POST_ZOOM = 5;
    protected static final int ROTATE = 6;

    /**
     * 保存当前触摸状态的整数字段
     */
    protected int mTouchMode = NONE;

    /**
     * 最后突出显示的对象（通过触摸）
     */
    protected Highlight mLastHighlighted;

    /**
     * 用于检测轻敲和长按的手势检测器，...
     */
    protected GestureDetector mGestureDetector;

    /**
     * 监听的图表
     */
    protected T mChart;

    public ChartTouchListener(T chart) {
        this.mChart = chart;
        mGestureDetector = new GestureDetector(chart.getContext(), this);
    }

    /**
     * 调用OnChartGestureListener执行启动回调
     *
     * @param me
     */
    public void startAction(MotionEvent me) {
        OnChartGestureListener l = mChart.getOnChartGestureListener();

        if (l != null) {
            l.onChartGestureStart(me, mLastGesture);
        }
    }

    /**
     * 调用OnChartGestureListener进行结束回调
     *
     * @param me
     */
    public void endAction(MotionEvent me) {
        OnChartGestureListener l = mChart.getOnChartGestureListener();
        if (l != null)
            l.onChartGestureEnd(me, mLastGesture);
    }

    /**
     * 设置通过触摸高亮显示的最后一个值。
     *
     * @param high
     */
    public void setLastHighlighted(Highlight high) {
        mLastHighlighted = high;
    }

    /**
     * 返回listener当前所在的触摸模式
     *
     * @return
     */
    public int getTouchMode() {
        return mTouchMode;
    }

    /**
     * 返回已在图表上执行的最后一个手势。
     *
     * @return
     */
    public ChartGesture getLastGesture() {
        return mLastGesture;
    }

    /**
     * 执行高亮操作。
     *
     * @param h
     * @param e
     */
    protected void performHighlight(Highlight h, MotionEvent e) {
        if (h == null || h.equalTo(mLastHighlighted)) {
            mChart.highlightValue(null, true);
            mLastHighlighted = null;
        } else {
            mChart.hi
        }
    }

    /**
     * 返回两点之间的距离
     *
     * @param eventX
     * @param startX
     * @param eventY
     * @param startY
     * @return
     */
    protected static float distance(float eventX, float startX, float eventY, float startY) {
        float dx = eventX - startX;
        float dy = eventY - startY;
        return (float) Math.sqrt(dx * dx + dy * dy);
    }


}
