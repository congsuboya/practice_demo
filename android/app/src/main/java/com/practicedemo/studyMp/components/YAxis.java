package com.practicedemo.studyMp.components;

import android.graphics.Color;
import android.graphics.Paint;

import com.practicedemo.studyMp.utils.Utils;

/**
 * 表示y轴标签设置及其条目的类。
 * 只能使用setter方法来修改它。
 * 不要直接访问公共变量。
 * 请注意，并非YLabels类提供的所有功能都适用于RadarChart。
 * 在为图表设置数据之前，需要应用影响轴的值范围的自定义设置。
 * <p>
 * Created by chaoye on 2018/3/5.
 */

public class YAxis extends AxisBase {

    /**
     * 指示是否绘制了底部的y标签条目
     */
    private boolean mDrawBottomYLabelEntry = true;

    /**
     * 指示是否绘制顶部y标签条目
     */
    private boolean mDrawTopYLabelEntry = true;

    /**
     * 表示轴是否反转的标志
     */
    protected boolean mInverted = false;

    /**
     * 标志，指示是否应绘制零线，而不管其他网格线如何
     */
    protected boolean mDrawZeroLine = false;

    /**
     * 零线的颜色
     */
    protected int mZeroLineColor = Color.GRAY;

    /**
     * 零线的宽度
     */
    protected float mZeroLineWidth = 1f;

    /**
     * 轴的空间从最大值到最高值，以总轴范围的百分比表示
     */
    protected float mSpacePercentTop = 10f;

    /**
     * 轴的空间从最小值到最低值以百分比表示的总轴范围
     */
    protected float mSpacePercentBottom = 10f;

    /**
     * y标签相对于图表的位置
     */
    private YAxisLabelPosition mPosition = YAxisLabelPosition.OUTSIDE_CHART;

    /**
     * 枚举y标签相对于图表的位置   
     */
    public enum YAxisLabelPosition {
        OUTSIDE_CHART, INSIDE_CHART
    }

    /**
     * 该轴线应该在图表的那一侧 
     */
    private AxisDependency mAxisDependency;

    /**
     * 轴应采用的最小宽度（以dp为单位）。
     * <p/>
     * default: 0.0
     */
    protected float mMinWidth = 0.f;

    /**
     * 轴可以采用的最大宽度（以dp为单位）。
     * 使用Infinity禁用最大值
     * default: Float.POSITIVE_INFINITY（正无穷大）
     */
    protected float mMaxWidth = Float.POSITIVE_INFINITY;

    public enum AxisDependency {
        LEFT, RIGHT
    }

    public YAxis() {
        super();

        this.mAxisDependency = AxisDependency.LEFT;
        this.mYOffset = 0f;
    }

    public YAxis(AxisDependency position) {
        super();
        this.mAxisDependency = position;
        this.mYOffset = 0f;
    }

    public AxisDependency getAxisDependency() {
        return mAxisDependency;
    }

    public float getMinWidth() {
        return mMinWidth;
    }

    public void setMinWidth(float minWidth) {
        mMinWidth = minWidth;
    }

    public float getMaxWidth() {
        return mMaxWidth;
    }

    /**
     * @param maxWidth
     */
    public void setMaxWidth(float maxWidth) {
        mMaxWidth = maxWidth;
    }

    public YAxisLabelPosition getLabelPosition() {
        return mPosition;
    }

    public void setPosition(YAxisLabelPosition pos) {
        mPosition = pos;
    }

    /**
     * 如果绘制顶部y轴标签条目已启用，则返回true
     *
     * @return
     */
    public boolean isDrawTopYLableEntryEnabled() {
        return mDrawTopYLabelEntry;
    }

    /**
     * 如果绘制底部y轴标签条目已启用，则返回true
     *
     * @return
     */
    public boolean isDrawBottomYLabelEntryEnabled() {
        return mDrawBottomYLabelEntry;
    }

    /**
     * 将其设置为true以启用绘制顶部y标签条目。
     * 当顶部y标签和左侧x标签相互干扰时禁用此功能会很有帮助。
     * 默认值：true
     *
     * @param enabled
     */
    public void setDrawTopYLabelEntry(boolean enabled) {
        mDrawTopYLabelEntry = enabled;
    }

    /**
     * 如果设置为true，则y轴将反转，这意味着低值位于图表顶部，高位在底部。
     *
     * @param enabled
     */
    public void setInverted(boolean enabled) {
        mInverted = enabled;
    }

    /**
     * y轴反转则放回true
     *
     * @return
     */
    public boolean isInverted() {
        return mInverted;
    }

    /**
     * 方法过期
     * 用setAxisMinimum(...) / setAxisMaximum(...) 代替.
     *
     * @param startAtZero
     */
    @Deprecated
    public void setStartAtZero(boolean startAtZero) {
        if (startAtZero)
            setAxisMinimum(0f);
        else
            resetAxisMaximum();
    }

    /**
     * 以整个范围的百分比设置顶轴空间。 默认10f
     *
     * @param percent
     */
    public void setSpaceTop(float percent) {
        mSpacePercentTop = percent;
    }

    /**
     * 以全部范围的百分比返回顶轴空间。 默认10f
     *
     * @return
     */
    public float getSpaceTop() {
        return mSpacePercentTop;
    }

    /**
     * 以整个范围的百分比设置底部轴空间。 默认10f
     *
     * @param percent
     */
    public void setSpaceBottom(float percent) {
        mSpacePercentBottom = percent;
    }

    public float getSpaceBottom() {
        return mSpacePercentBottom;
    }

    public boolean isDrawZeroLineEnabled() {
        return mDrawZeroLine;
    }

    /**
     * 将此设置为true以绘制零线，而不管是否启用其他网格线。
     * 默认值：false
     *
     * @param mDrawZeroLine
     */
    public void setDrawZeroLine(boolean mDrawZeroLine) {
        this.mDrawZeroLine = mDrawZeroLine;
    }

    public int getZeroLineColor() {
        return mZeroLineColor;
    }

    public void setZeroLineColor(int color) {
        mZeroLineColor = color;
    }

    public float getZeroLineWidth() {
        return mZeroLineWidth;
    }

    public void setZeroLineWidth(float width) {
        this.mZeroLineWidth = Utils.convertDpToPixel(width);
    }

    /**
     * 这是针对正常（非水平）图表的水平间距。
     *
     * @param p
     * @return
     */
    public float getRequiredWidthSpace(Paint p) {
        p.setTextSize(mTextSize);

        String label = getLongestLabel();
        float width = Utils.calcTextWidth(p, label) + getXOffset() * 2f;
        float minWidth = getMinWidth();
        float maxWidth = getMaxWidth();

        if (minWidth > 0.f)
            minWidth = Utils.convertDpToPixel(minWidth);

        if (maxWidth > 0.f && maxWidth != Float.POSITIVE_INFINITY)
            maxWidth = Utils.convertDpToPixel(maxWidth);

        width = Math.max(minWidth, Math.min(width, maxWidth > 0.0 ? maxWidth : width));

        return width;
    }

    /**
     * 这是用于HorizontalBarChart垂直间距。
     *
     * @param p
     * @return
     */
    public float getRequiredHeightSpace(Paint p) {
        p.setTextSize(mTextSize);

        String label = getLongestLabel();
        return (float) Utils.calcTextWidth(p, label) + getYOffset() * 2f;
    }

    /**
     * 如果此轴需要水平偏移量，则返回true;如果不需要偏移量，则返回false。
     *
     * @return
     */
    public boolean needsOffset() {
        if (isEnabled() && isDrawLabelsEnabled() && getLabelPosition() == YAxisLabelPosition.OUTSIDE_CHART)
            return true;
        else
            return false;
    }

    @Override
    public void calculate(float dataMin, float dataMax) {
        float min = mCustomAxisMin ? mAxisMinimum : dataMin;
        float max = mCustomAxisMax ? mAxisMaximum : dataMax;

        //临时范围（计算前）
        float range = Math.abs(max - min);

        //万一所有的值都相等
        if (range == 0f) {
            max = max + 1f;
            min = min - 1f;
        }

        // 底部空间只影响非自定义的最小值
        if (!mCustomAxisMin) {
            float bottomSpace = range / 100f * getSpaceBottom();
            this.mAxisMinimum = (min - bottomSpace);
        }

        //顶层空间仅影响非自定义最大值
        if (!mCustomAxisMin) {
            float topSpace = range / 100f * getSpaceTop();
            this.mAxisMaximum = (max + topSpace);
        }

        //计算实际范围
        this.mAxisRange = Math.abs(this.mAxisMaximum - this.mAxisMinimum);
    }
}
