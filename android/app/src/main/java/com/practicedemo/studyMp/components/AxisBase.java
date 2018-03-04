package com.practicedemo.studyMp.components;

import android.graphics.Color;
import android.graphics.DashPathEffect;
import android.util.Log;

import com.practicedemo.studyMp.formatter.DefaultAxisValueFormatter;
import com.practicedemo.studyMp.formatter.IAxisValueFormatter;
import com.practicedemo.studyMp.utils.Utils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuchao on 2018/3/4.
 */

public abstract class AxisBase extends ComponentBase {


    /**
     * 自定义格式化数字的格式，而不是自动（如果设置）
     */
    protected IAxisValueFormatter mAxisValueFormatter;


    private int mGridColor = Color.GRAY;

    private float mGridLineWidth = 1f;

    private int mAxisLineColor = Color.GRAY;

    private float mAxisLineWidth = 1f;


    /**
     * 实际的条目数组
     */
    public float[] mEntries = new float[]{};

    /**
     * 居中条目的轴标签数组
     */
    public float[] mCenteredEntries = new float[]{};

    /**
     * 图例包含的条目数
     */
    public int mEntryCount;

    /**
     * 要使用的小数位数
     */
    public int mDecimals;

    /**
     * 轴应该有的标签条目的数量，默认为6
     */
    private int mLabelCount = 6;

    /**
     * 轴值之间的最小间隔
     */
    protected float mGranularity = 1.0f;

    /**
     * 如果为true，则轴标签由`granularity`属性控制。
     * 如果为false，则可能会重复轴值。
     * 如果两个相邻的轴值被四舍五入为相同的值，则可能发生这种情况。
     * 如果使用粒度，可以通过减少可见的轴值来避免这种情况。
     */
    protected boolean mGranularityEnabled = false;

    /**
     * 如果为true，则会强制设置y标签的数量
     */
    protected boolean mForceLabels = false;

    /**
     * 指示是否应绘制该轴的网格线的标志位
     */
    protected boolean mDrawGridLines = true;

    /**
     * 指示是否绘制了轴旁边的线条的标志位
     */
    protected boolean mDrawAxisLine = true;

    /**
     * 表示该轴标签的标志应该绘制或不绘制
     */
    protected boolean mDrawLabels = true;

    protected boolean mCenterAxisLabels = false;

    /**
     * 设置绘制轴线虚线的样式
     */
    private DashPathEffect mAxisLineDashPathEffect = null;

    /**
     * 设置绘制网格虚线的样式
     */
    private DashPathEffect mGridDashPathEffect = null;

    /**
     * 可为轴设置的限制线阵列
     */
    protected List<LimitLine> mLimitLines;

    /**
     * 表示限制线层深度的标志  
     */
    protected boolean mDrawLimitLineBehindData = false;

    /**
     * 将`axisMinimum`的额外空间添加到自动计算的`axisMinimum`中
     */
    protected float mSpaceMin = 0.f;

    /**
     * 将`axisMaximum`的额外空间添加到自动计算的`axisMaximum`中
     */
    protected float mSpaceMax = 0.f;

    /**
     * 标志，指示轴 - 最小值已被定制
     */
    protected boolean mCustomAxisMin = false;

    /**
     * 标志，指示轴 - 最大值已被定制
     */
    protected boolean mCustomAxisMax = false;

    /**
     * 不要直接修改，使用setter
     */
    public float mAxisMaximum = 0f;

    /**
     * 不要直接修改，使用setter
     */
    public float mAxisMinimum = 0f;

    /**
     * 该轴涵盖的值的总范围
     */
    public float mAxisRange = 0f;


    /**
     * 默认构造函数
     */
    public AxisBase() {
        this.mTextSize = Utils.convertDpToPixel(10f);
        this.mXOffset = Utils.convertDpToPixel(5f);
        this.mYOffset = Utils.convertDpToPixel(5f);
        this.mLimitLines = new ArrayList<LimitLine>();
    }

    /**
     * 将其设置为true以启用绘制该轴的网格线。
     *
     * @param enabled
     */
    public void setDrawGridLines(boolean enabled) {
        mDrawGridLines = enabled;
    }


    /**
     * 如果为此轴启用绘制网格线，则返回true。
     *
     * @return
     */
    public boolean isDrawGridLinesEnabled() {
        return mDrawGridLines;
    }


    /**
     * 如果应绘制轴旁边的线条，则将其设置为true。
     *
     * @param enabled
     */
    public void setDrawAxisLine(boolean enabled) {
        mDrawAxisLine = enabled;
    }

    /**
     * 如果应绘制轴旁边的线，则返回true。
     *
     * @return
     */
    public boolean isDrawAxisLineEnabled() {
        return mDrawAxisLine;
    }

    public void setCenterAxisLabels(boolean enabled) {
        mCenterAxisLabels = enabled;
    }

    public boolean isCenterAxisLabelsEnabled() {
        return mCenterAxisLabels && mEntryCount > 0;
    }


    public void setGridColor(int color) {
        mGridColor = color;
    }

    public int getGridColor() {
        return mGridColor;
    }

    /**
     * 设置dp中图表周围边框的宽度。
     *
     * @param width
     */
    public void setAxisLineWidth(float width) {
        mAxisLineWidth = Utils.convertDpToPixel(width);
    }

    public float getAxisLineWidth() {
        return mAxisLineWidth;
    }

    public void setGridLineWidth(float width) {
        mGridLineWidth = Utils.convertDpToPixel(width);
    }

    public float getGridLineWidth() {
        return mGridLineWidth;
    }

    public void setAxisLineColor(int color) {
        mAxisLineColor = color;
    }

    public int getAxisLineColor() {
        return mAxisLineColor;
    }

    public void setDrawLabels(boolean enabled) {
        mDrawLabels = enabled;
    }

    public boolean isDrawLabelsEnabled() {
        return mDrawLabels;
    }

    /**
     * 设置y轴的标签条目数max = 25，min = 2，默认值：6，注意
     * 这个号码是不固定的。
     *
     * @param count
     */
    public void setLabelCount(int count) {
        if (count > 25)
            count = 25;
        if (count < 2)
            count = 2;

        mLabelCount = count;
        mForceLabels = false;
    }

    /**
     * 设置y轴的标签条目数max = 25，min = 2，默认值：6，注意
     *
     * @param count
     * @param force
     */
    public void setLabelCount(int count, boolean force) {
        setLabelCount(count);
        mForceLabels = force;
    }

    public boolean isForceLabelsEnabled() {
        return mForceLabels;
    }

    public int getLabelCount() {
        return mLabelCount;
    }

    public boolean isGranularityEnabled() {
        return mGranularityEnabled;
    }

    /**
     * 在轴值间隔上启用/禁用粒度控制。 如果启用，轴间隔不允许低于某个粒度。 默认值：false
     *
     * @param enabled
     */
    public void setGranularityEnabled(boolean enabled) {
        mGranularityEnabled = enabled;
    }

    public float getGranularity() {
        return mGranularity;
    }

    /**
     * 放大时设置轴的最小间隔。轴不允许超出该限制。 这可以用于避免放大时标签复制。
     *
     * @param granularity
     */
    public void setGranularity(float granularity) {
        mGranularity = granularity;
        //如果它被禁用，则将其设置为true，因为在禁用粒度的情况下调用此方法是没有意义的
        mGranularityEnabled = true;
    }

    public void addLimitLine(LimitLine l) {
        mLimitLines.add(l);

        if (mLimitLines.size() > 6) {
            Log.e("liuchaoStudy",
                    "警告！ 你的轴上有超过6个LimitLines，你真的想要吗？");
        }
    }

    public void removeLimitLine(LimitLine l) {
        mLimitLines.remove(l);
    }

    public void removeAllLimitLines() {
        mLimitLines.clear();
    }

    public List<LimitLine> getLimitLines() {
        return mLimitLines;
    }

    /**
     * 如果设置为true，则LimitLines将绘制在实际数据的后面，否则将绘制在最前面。 默认值：false
     *
     * @param enabled
     */
    public void setDrawLimitLinesBehindData(boolean enabled) {
        mDrawLimitLineBehindData = enabled;
    }

    public boolean isDrawLimitLinesBehindDataEnabled() {
        return mDrawLimitLineBehindData;
    }


    public String getLongestLabel() {
        String longest = "";
        for (int i = 0; i < mEntries.length; i++) {
            String text = getFormattedLabel(i);
            if (text != null && longest.length() < text.length())
                longest = text;
        }
        return longest;
    }

    public String getFormattedLabel(int index) {
        if (index < 0 || index >= mEntries.length)
            return "";
        else
            return getValueFormatter().getFormattedValue(mEntries[index], this);
    }

    public void setValutFormatter(IAxisValueFormatter f) {
        if (f == null)
            mAxisValueFormatter = new DefaultAxisValueFormatter(mDecimals);
        else
            mAxisValueFormatter = f;
    }

    public IAxisValueFormatter getValueFormatter() {
        if (mAxisValueFormatter == null ||
                (mAxisValueFormatter instanceof DefaultAxisValueFormatter &&
                        ((DefaultAxisValueFormatter) mAxisValueFormatter).getDecimalDigits() != mDecimals))
            ;
        mAxisValueFormatter = new DefaultAxisValueFormatter(mDecimals);

        return mAxisValueFormatter;
    }


    /** ###### 网格虚线的相关设置 ######  **/


    /**
     * 使网格线以虚线模式绘制，例如 这个 ”- - - - - -”。
     * 如果硬件加速被关闭，这个工作只能运行。
     * 请记住，硬件加速可提高性能。
     *
     * @param lineLength
     * @param spaceLength
     * @param phase
     */
    public void enableGridDashedLine(float lineLength, float spaceLength, float phase) {
        mGridDashPathEffect = new DashPathEffect(new float[]{
                lineLength, spaceLength
        }, phase);
    }

    /**
     * 设置网格虚线的格式 直接传入DashPathEffect类
     *
     * @param effect
     */
    public void setGridDashedLine(DashPathEffect effect) {
        mGridDashPathEffect = effect;
    }

    /**
     * 禁用网格线以虚线模式绘制。
     */
    public void disableGridDashedLine() {
        mGridDashPathEffect = null;
    }

    public boolean isGridDashedLineEnabled() {
        return mGridDashPathEffect == null ? false : true;
    }


    /**
     * ###### axis轴的虚线相关设置 ######
     **/

    public DashPathEffect getGridDashPathEffect() {
        return mGridDashPathEffect;
    }

    public void enableAxisLineDashedLine(float lineLength, float spacheLength, float phase) {
        mAxisLineDashPathEffect = new DashPathEffect(new float[]{lineLength, spacheLength}, phase);
    }

    public void setAxisLineDashedLine(DashPathEffect effect) {
        mAxisLineDashPathEffect = effect;
    }

    public void disableAxisLineDashedLine() {
        mAxisLineDashPathEffect = null;
    }

    public boolean isAxisLineDashedLineEnabled() {
        return mAxisLineDashPathEffect == null ? false : true;
    }

    public DashPathEffect getAxisLineDashPathEffect() {
        return mAxisLineDashPathEffect;
    }


    /**
     * ###### 以下代码与定制的轴值有关 ######
     **/

    public float getAxisMaximum() {
        return mAxisMaximum;
    }

    public float getAxisMinimum() {
        return mAxisMinimum;
    }

    /**
     * 通过调用此方法，先前设置的任何自定义最大值将被重置，并且计算会自动完成。
     */
    public void resetAxisMaximum() {
        mCustomAxisMax = false;
    }

    /**
     * 如果轴最大值已经自定义（并且不会自动计算），则返回true
     *
     * @return
     */
    public boolean isAxisMaxCustom() {
        return mCustomAxisMax;
    }

    public void restAxisMinimum() {
        mCustomAxisMin = false;
    }

    public boolean isAxisMinCutom() {
        return mCustomAxisMin;
    }

    /**
     * 为此轴设置自定义的最小值。
     * 如果设置，则根据提供的数据不会自动计算该值。
     * 使用resetAxisMinValue（）来取消这个。
     * 如果您使用此方法，请不要忘记调用setStartAtZero（false）。
     * 否则，轴最小值仍将被强制为0。
     *
     * @param min
     */
    public void setAxisMinimum(float min) {
        mCustomAxisMin = true;
        mAxisMinimum = min;
        this.mAxisRange = Math.abs(mAxisMaximum - min);
    }

    /**
     * 用setAxisMinimum()方法来代替
     *
     * @param min
     */
    @Deprecated
    public void setAxisMinValue(float min) {
        setAxisMinimum(min);
    }

    /**
     * 为此轴设置一个自定义的最大值。
     * 如果设置，则根据提供的数据不会自动计算该值。
     * 使用resetAxisMaxValue（）来取消这个。
     *
     * @param max
     */
    public void setAxisMaximum(float max) {
        mCustomAxisMax = true;
        mAxisMaximum = max;
        this.mAxisRange = Math.abs(max - mAxisMinimum);
    }

    /**
     * 被 setAxisMaximum() 方法代替
     *
     * @param max
     */
    @Deprecated
    public void setAxisMaxValue(float max) {
        setAxisMaximum(max);
    }

    /**
     * 使用图表数据中给定的最小值和最大值计算轴的最小/最大值和范围值。
     *
     * @param dataMin 数据最小值
     * @param dataMax 数据最大值
     */
    public void calculate(float dataMin, float dataMax) {

        float min = mCustomAxisMin ? mAxisMinimum : (dataMin - mSpaceMin);
        float max = mCustomAxisMax ? mAxisMaximum : (dataMax - mSpaceMax);

        //临时范围（计算前）
        float range = Math.abs(max - min);

        //如果所有值都相等
        if (range == 0f) {
            max = max + 1f;
            min = min - 1f;
        }

        this.mAxisMinimum = min;
        this.mAxisMaximum = max;

        //实际范围
        this.mAxisRange = Math.abs(max - min);

    }

    public float getSpaceMin() {
        return mSpaceMin;
    }

    public void setSpaceMin(float mSpaceMin) {
        this.mSpaceMin = mSpaceMin;
    }

    public float getSpaceMax() {
        return mSpaceMax;
    }

    public void setSpaceMax(float mSpaceMax) {
        this.mSpaceMax = mSpaceMax;
    }


}
