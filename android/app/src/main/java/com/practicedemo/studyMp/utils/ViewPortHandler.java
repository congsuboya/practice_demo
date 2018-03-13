package com.practicedemo.studyMp.utils;

import android.graphics.Matrix;
import android.graphics.RectF;

/**
 * 包含图表当前视口设置信息的类，包括偏移量，缩放和转换级别...
 * Created by liuchao on 2018/3/5.
 */

public class ViewPortHandler {

    /**
     * 矩阵用于触摸事件
     */
    protected final Matrix mMatrixTouch = new Matrix();

    /**
     * 这个矩形定义了可以绘制图形值的区域
     */
    protected RectF mContentRect = new RectF();

    protected float mChartWidth = 0f;
    protected float mChartHeight = 0f;

    /**
     * y轴上的最小缩放值
     */
    private float mMinScaleY = 1f;

    /**
     * y轴上的最大缩放值
     */
    private float mMaxScaleY = Float.MAX_VALUE;

    /**
     * x轴上的最小缩放值
     */
    private float mMinScaleX = 1f;

    /**
     * x轴上的最大缩放值
     */
    private float mMaxScaleX = Float.MAX_VALUE;

    /**
     * 包含x轴的当前比例因子
     */
    private float mScaleX = 1f;

    /**
     * 包含y轴的当前比例因子
     */
    private float mScaleY = 1f;

    /**
     * x轴上的当前平移（拖动距离）
     */
    private float mTransX = 0f;

    /**
     * y轴上的当前平移（拖动距离）
     */
    private float mTransY = 0f;

    /**
     * 偏移量允许图表在x轴上的边界上拖动
     */
    private float mTransOffsetX = 0f;

    /**
     * 偏移量允许图表在y轴上的边界上拖动
     */
    private float mTransOffsetY = 0f;

    /**
     * 造函数 - 不要忘记调用setChartDimens（...）
     */
    public ViewPortHandler() {

    }

    /**
     * 设置图表的宽度和高度。
     *
     * @param width
     * @param height
     */
    public void setChartDimens(float width, float height) {
        float offsetLeft = this.offsetLeft();
        float offsetTop = this.offsetTop();
        float offsetRight = this.offsetRight();
        float offsetBottom = this.offsetBottom();

        mChartHeight = height;
        mChartWidth = width;

        restrainViewPort(offsetLeft, offsetTop, offsetRight, offsetBottom);
    }

    public boolean hasChartDimens() {
        if (mChartHeight > 0 && mChartWidth > 0)
            return true;
        else
            return false;
    }

    public void restrainViewPort(float offsetLeft, float offsetTop, float offsetRight, float offsetBottom) {
        mContentRect.set(offsetLeft, offsetTop, mChartWidth - offsetRight, mChartHeight - offsetBottom);
    }

    public float offsetLeft() {
        return mContentRect.left;
    }

    public float offsetRight() {
        return mChartWidth - mContentRect.right;
    }

    public float offsetTop() {
        return mContentRect.top;
    }

    public float offsetBottom() {
        return mChartHeight - mContentRect.bottom;
    }

    public float contentTop() {
        return mContentRect.top;
    }

    public float contentLeft() {
        return mContentRect.left;
    }

    public float contentRight() {
        return mContentRect.right;
    }

    public float contentBottom() {
        return mContentRect.bottom;
    }

    public float contentWidth() {
        return mContentRect.width();
    }

    public float contentHeight() {
        return mContentRect.height();
    }

    public RectF getContentRect() {
        return mContentRect;
    }

    public MPPointF getContentCenter() {
        return MPPointF.getInstance(mContentRect.centerX(), mContentRect.centerY());
    }

    public float getChartHeight() {
        return mChartHeight;
    }

    public float getChartWidth() {
        return mChartWidth;
    }

    /**
     * 返回内容矩形的最小边长（宽度或高度）。
     *
     * @return
     */
    public float getSmallestContentExtension() {
        return Math.min(mContentRect.width(), mContentRect.height());
    }

    /**
     * ################ ################ ################ ################
     */
    /****************** 下面的代码涉及到缩放和手势 ****************/

    /**
     * 以1.4f放大，x和y是缩放中心的坐标（以像素为单位）。
     *
     * @param x
     * @param y
     */
    public Matrix zoomIn(float x, float y) {
        Matrix save = new Matrix();
        zoomIn(x, y, save);
        return save;

    }

    public void zoomIn(float x, float y, Matrix outputMatrix) {
        outputMatrix.reset();
        outputMatrix.set(mMatrixTouch);
        outputMatrix.postScale(1.4f, 1.4f, x, y);
    }

    /**
     * 缩小0.7f，x和y是缩放中心的坐标（以像素为单位）。
     *
     * @param x
     * @param y
     * @return
     */
    public Matrix zoomOut(float x, float y) {
        Matrix save = new Matrix();
        zoomOut(x, y, save);
        return save;

    }

    public void zoomOut(float x, float y, Matrix outputMatrix) {
        outputMatrix.reset();
        outputMatrix.set(mMatrixTouch);
        outputMatrix.postScale(0.7f, 0.7f, x, y);
    }

    /**
     * 缩小至原始大小。
     *
     * @param outputMatrix
     */
    public void resetZoom(Matrix outputMatrix) {
        outputMatrix.reset();
        outputMatrix.set(mMatrixTouch);
        outputMatrix.postScale(1.0f, 1.0f, 0.0f, 0.0f);
    }

    /**
     * 按指定的比例因子进行比例缩放。
     *
     * @param scaleX
     * @param scaleY
     * @return
     */
    public Matrix zoom(float scaleX, float scaleY) {
        Matrix save = new Matrix();
        zoom(scaleX, scaleY, save);
        return save;
    }

    public void zoom(float scaleX, float scaleY, Matrix outputMatrix) {
        outputMatrix.reset();
        outputMatrix.set(mMatrixTouch);
        outputMatrix.postScale(scaleX, scaleY);
    }

    /**
     * 按指定的比例因子进行比例缩放。 x和y是枢轴。
     *
     * @param scaleX
     * @param scaleY
     * @param x
     * @param y
     * @return
     */
    public Matrix zoom(float scaleX, float scaleY, float x, float y) {
        Matrix save = new Matrix();
        zoom(scaleX, scaleY, save);
        return save;

    }

    public void zoom(float scaleX, float scaleY, float x, float y, Matrix outputMatrix) {
        outputMatrix.reset();
        outputMatrix.set(mMatrixTouch);
        outputMatrix.postScale(scaleX, scaleY, x, y);
    }

    /**
     * 将比例因子设置为指定的值。
     *
     * @param scaleX
     * @param scaleY
     * @return
     */
    public Matrix setZoom(float scaleX, float scaleY) {
        Matrix save = new Matrix();
        setZoom(scaleX, scaleY, save);
        return save;
    }

    public void setZoom(float scaleX, float scaleY, Matrix outputMatrix) {
        outputMatrix.reset();
        outputMatrix.set(mMatrixTouch);
        outputMatrix.postScale(scaleX, scaleY);
    }

    /**
     * 将比例因子设置为指定的值。 x和y是枢轴。
     *
     * @param scaleX
     * @param scaleY
     * @param x
     * @param y
     * @return
     */
    public Matrix setZoom(float scaleX, float scaleY, float x, float y) {

        Matrix save = new Matrix();
        save.set(mMatrixTouch);
        save.setScale(scaleX, scaleY, x, y);

        return save;
    }

    protected float[] valsBufferForFitScreen = new float[9];

    /**
     * 重置所有缩放和拖动操作，并使图表完全适合其边界。
     *
     * @return
     */
    public Matrix fitScreen() {
        Matrix save = new Matrix();
        fitScreen(save);
        return save;
    }

    /**
     * 重置所有缩放和拖动操作，并使图表完全适合其边界。
     * 输出矩阵可用于希望缓存对象的用户。
     *
     * @param outputMatrix
     */
    public void fitScreen(Matrix outputMatrix) {
        mMinScaleX = 1f;
        mMinScaleY = 1f;

        outputMatrix.set(mMatrixTouch);
        float[] vals = valsBufferForFitScreen;
        for (int i = 0; i < 9; i++) {
            vals[i] = 0;
        }

        outputMatrix.getValues(vals);
        vals[Matrix.MTRANS_X] = 0f;
        vals[Matrix.MTRANS_Y] = 0f;
        vals[Matrix.MSCALE_X] = 1f;
        vals[Matrix.MSCALE_Y] = 1f;

        outputMatrix.setValues(vals);
    }
}
