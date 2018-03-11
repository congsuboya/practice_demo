package com.practicedemo.studyMp.highlight;

import com.practicedemo.studyMp.components.YAxis;

/**
 * Created by liuchao on 2018/3/11.
 */

public class Highlight {

    /**
     * 突出显示的值的x值
     */
    private float mX = Float.NaN;

    /**
     * 突出显示的值的y值
     */
    private float mY = Float.NaN;

    /**
     * 突出显示的x像素
     */
    private float mXPx;

    /**
     * 突出显示的y像素
     */
    private float mYPx;

    /**
     * 数据对象的索引 - 以防万一它指的是多个数据对象
     */
    private int mDataIndex = -1;

    /**
     * 突出显示值所在数据集的索引
     */
    private int mDataSetIndex;

    /**
     * 索引堆栈条条目的值突出显示，默认为-1
     */
    private int mStackIndex = -1;

    /**
     * 突出显示的值所属的轴
     */
    private YAxis.AxisDependency axis;

    /**
     * 此高亮对象最后绘制的y位置（像素）
     */
    private float mDrawY;

    /**
     * 此高亮对象最后绘制的x位置（像素）
     */
    private float mDrawX;

    public Highlight(float x, float y, int dataSetIndex) {
        this.mX = x;
        this.mY = y;
        this.mDataSetIndex = dataSetIndex;
    }

    /**
     * 构造方法
     *
     * @param x
     * @param y
     * @param xPx
     * @param yPx
     * @param dataSetIndex
     * @param axis
     */
    public Highlight(float x, float y, float xPx, float yPx, int dataSetIndex, YAxis.AxisDependency axis) {
        this.mX = x;
        this.mY = y;
        this.mXPx = xPx;
        this.mYPx = yPx;
        this.mDataSetIndex = dataSetIndex;
        this.axis = axis;
    }

    /**
     * @param x
     * @param y
     * @param xPx
     * @param yPx
     * @param dataSetIndex
     * @param stackIndex
     * @param axis
     */
    public Highlight(float x, float y, float xPx, float yPx, int dataSetIndex, int stackIndex, YAxis.AxisDependency axis) {
        this(x, y, xPx, yPx, dataSetIndex, axis);
        this.mStackIndex = stackIndex;
    }

    public float getX() {
        return mX;
    }

    public float getY() {
        return mY;
    }

    public float getXPx() {
        return mXPx;
    }

    public float getYPx() {
        return mYPx;
    }

    public int getDataIndex() {
        return mDataIndex;
    }

    public void setDataIndex(int mDataIndex) {
        this.mDataIndex = mDataIndex;
    }

    public int getDataSetIndex() {
        return mDataSetIndex;
    }

    public int getStackIndex() {
        return mStackIndex;
    }

    public boolean isStacked() {
        return mStackIndex >= 0;
    }

    public YAxis.AxisDependency getAxis() {
        return axis;
    }

    /**
     * 设置最后绘制高光的X和Y位置（像素）。
     *
     * @param x
     * @param y
     */
    public void setDraw(float x, float y) {
        this.mDrawX = x;
        this.mDrawY = y;
    }

    public float getDrawX() {
        return mDrawX;
    }

    public float getDrawY() {
        return mDrawY;
    }

    /**
     * 如果此高亮对象与另一个对象相等，则返回true（比较xIndex和dataSetIndex）
     *
     * @param h
     * @return
     */
    public boolean equalTo(Highlight h) {
        if (h == null)
            return false;
        else {
            if (this.mDataSetIndex == h.mDataSetIndex && this.mX == h.mX && this.mStackIndex == h.mStackIndex && this.mDataIndex == h.mDataIndex)
                return true;
            else
                return false;
        }
    }

    @Override
    public String toString() {
        return "Highlight,x: " + mX + ", y: " + mY + ", dataSetIndex: " + mDataSetIndex + ", stackIndex(only stacked barEntry): " + mStackIndex;
    }
}
