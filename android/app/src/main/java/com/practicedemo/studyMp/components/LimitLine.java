package com.practicedemo.studyMp.components;

import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.graphics.Paint;

import com.practicedemo.studyMp.utils.Utils;

/**
 * 散点图 它允许在图表中显示一条额外的线，用于标记指定轴（x轴或y轴）上的某个最大值/限制值。
 * <p>
 * <p>
 * Created by liuchao on 2018/3/4.
 */

public class LimitLine extends ComponentBase {

    /**
     * 限制/最大值（y值或xIndex）
     */
    private float mLimit = 0f;

    /**
     * 限制线的宽度
     */
    private float mLineWidth = 2f;

    /**
     * 限制线的颜色
     */
    private int mLineColor = Color.rgb(237, 91, 91);

    /**
     * 标签文字的样式
     */
    private Paint.Style mTextStyle = Paint.Style.FILL_AND_STROKE;

    /**
     * 限制线旁边绘制的标签字符串
     */
    private String mLabel = "";

    /**
     * 设置限制线的虚线样式
     */
    private DashPathEffect mDashPathEffect = null;

    /**
     * 表示LimitLine标签的默认位置位置
     */
    private LimitLabelPosition mLabelPosition = LimitLabelPosition.RIGHT_TOP;

    /**
     * 枚举，表示LimitLine标签的位置
     */
    public enum LimitLabelPosition {
        LEFT_TOP, LEFT_BOTTOM, RIGHT_TOP, RIGHT_BOTTOM
    }


    /**
     * limitLine的构造函数
     *
     * @param limit 该行应出现在y轴（y值）或x轴（xIndex）上的位置（值）
     */
    public LimitLine(float limit) {
        mLimit = limit;
    }


    /**
     * limitLine的构造函数
     *
     * @param limit 该行应出现在y轴（y值）或x轴（xIndex）上的位置（值）
     * @param label 如果不设置label 则为" "
     */
    public LimitLine(float limit, String label) {
        mLimit = limit;
        mLabel = label;
    }


    /**
     * @return
     */
    public float getLimit() {
        return mLimit;
    }


    public void setLineWidth(float width) {
        if (width < 0.2f)
            width = 0.2f;
        if (width > 12.0f)
            width = 12.0f;

        mLineWidth = Utils.convertDpToPixel(width);
    }


    public float getLineWidth() {
        return mLineWidth;
    }

    public void setLineColor(int color) {
        mLineColor = color;
    }

    public int getLineColor() {
        return mLineColor;
    }


    /**
     * 使线条以虚线模式绘制，例如 ”- - - - - -”
     *
     * @param lineLength  线段的长度
     * @param spaceLength 在片段之间的空间长度
     * @param phase       相对于起点便宜量 （通常使用0）
     */
    public void enableDashedLine(float lineLength, float spaceLength, float phase) {
        mDashPathEffect = new DashPathEffect(new float[]{
                lineLength, spaceLength
        }, phase);
    }

    /**
     * 禁用线条以虚线模式绘制。
     */
    public void disableDashedLine() {
        mDashPathEffect = null;
    }

    /**
     * 如果启用了虚线效果，则返回true;否则返回false。 默认值：不启用
     *
     * @return
     */
    public boolean isDashedLineEnabled() {
        return !(mDashPathEffect == null);
    }

    public DashPathEffect getDashPathEffect() {
        return mDashPathEffect;
    }

    public void setTextStyle(Paint.Style style) {
        this.mTextStyle = style;
    }

    public Paint.Style getTextStyle() {
        return mTextStyle;
    }


    public void setLabelPosition(LimitLabelPosition pos) {
        mLabelPosition = pos;
    }

    public LimitLabelPosition getLabelPosition() {
        return mLabelPosition;
    }

    public void setLabel(String label) {
        mLabel = label;
    }

    public String getLabel() {
        return mLabel;
    }

}
