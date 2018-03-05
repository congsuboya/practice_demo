package com.practicedemo.studyMp.interfaces.datasets;

import android.graphics.DashPathEffect;
import android.graphics.Typeface;

import com.github.mikephil.charting.data.DataSet;
import com.practicedemo.studyMp.components.Legend;
import com.practicedemo.studyMp.components.YAxis;
import com.practicedemo.studyMp.data.Entry;
import com.practicedemo.studyMp.formatter.IValueFormatter;
import com.practicedemo.studyMp.utils.MPPointF;

import java.util.List;

/**
 * Created by liuchao on 2018/3/3.
 *
 * @param <T>
 */

public interface IDataSet<T extends Entry> {


    /** ################################     数据的相关方法     ################################### **/


    /**
     * 返回这个 DataSet 的最小y值
     *
     * @return
     */
    float getYMin();


    /**
     * 返回这个 DataSet 的最大y值
     *
     * @return
     */
    float getYMax();


    /**
     * 返回这个 DataSet 的最小x值
     *
     * @return
     */
    float getXMin();


    /**
     * 返回这个 DataSet 的最大x值
     *
     * @return
     */
    float getXMax();


    /**
     * 返回这个 DataSet 表示的y值的数量  y值数组的大小  比如 yvals.size()
     *
     * @return
     */
    int getEntryCount();


    /**
     * 计算x和y的最大最小值（mXMin,mXMax,mYMin,mYMax）
     *
     * @return
     */
    void calcMinMax();


    /**
     * 计算从最接近给定fromX的数据Item到距离给定toX值最近的数据Item的最小和最大y值。
     * 这仅适用于autoScaleMinMax功能。
     *
     * @return
     */
    void calcMinMaxY(float fromX, float toX);


    /**
     * 使用二分搜索返回在给定x值处找到的所有Entry对象。如果该x值没有Entry对象，则为空数组。
     * 重要提示: 改方法是在运行时进行计算，所以勿在性能严重不足的情况下过度使用
     *
     * @param xValue     x的值
     * @param closestToY 如果指定的x值有多个y值
     * @param rounding   如果没有与所提供的x值匹配的数据Item,则确定是否向上或者向下舍入取值
     * @return
     */
    T getEntryForXValue(float xValue, float closestToY, DataSet.Rounding rounding);


    /**
     * 使用二分搜索返回在给定x值处找到的所有Entry对象。如果该x值没有Entry对象，则为空数组。
     * 重要提示: 改方法是在运行时进行计算，所以勿在性能严重不足的情况下过度使用
     *
     * @param xValue     x的值
     * @param closestToY 如果指定的x值有多个y值
     * @return
     */
    T getEntryForXValue(float xValue, float closestToY);


    /**
     * 使用二分搜索返回在给定x值处找到的所有Entry对象。如果该x值没有Entry对象，则为空数组。
     * 重要提示: 改方法是在运行时进行计算，所以勿在性能严重不足的情况下过度使用
     *
     * @param xValue x的值
     * @return
     */
    List<T> getEntriesForXValue(float xValue);

    /**
     * 返回values数组中给定索引（NOT xIndex）处的Entry对象。
     *
     * @param index
     * @return
     */
    T getEntryForIndex(int index);

    /**
     * 返回在二进制搜索时在给定x值处找到的第一个Entry索引。如果找到指定x值处的为空对象，则此方法根据舍入返回最接近x值处的Entry。
     * 重要提示：该方法在运行时进行计算。 请勿在性能严重的情况下过度使用。
     *
     * @param xValue     x的值
     * @param closestToY 如果指定的x值有多个y值，
     * @param rounding   则舍入确定是否在没有与所提供的x值匹配的条目时向上舍入/向下/最近舍入
     * @return
     */
    int getEntryIndex(float xValue, float closestToY, DataSet.Rounding rounding);

    /**
     * 返回DataSets Entry数组中提供的条目的位置。 如果不存在，则返回-1。
     *
     * @param e
     * @return
     */
    int getEntryIndex(T e);


    /**
     * 此方法返回给定xIndex的DataSet的Entry数组中的实际索引。
     * 重要提示：此方法在运行时进行计算，请勿在性能严重的情况下过度使用。
     *
     * @param xIndex
     * @return
     */
    int getIndexInEntries(int xIndex);


    /**
     * 动态添加一个条目到DataSet。
     * 条目被添加到列表的末尾。
     * 这也将重新计算DataSet的当前最小值和最大值以及总和值。
     * 添加成功返回true 否则 false
     *
     * @param e
     */
    boolean addEntry(T e);

    /**
     * 动态添加一个条目到DataSet。
     * 条目将添加到values数组中相应于其x位置的适当索引。
     * 这也将重新计算DataSet的当前最小值和最大值以及总和值。
     * 添加成功返回true 否则 false
     *
     * @param e
     */
    void addEntryOrdered(T e);


    /**
     * 从对象数组中删除第一个DataSet
     * 如果成功返回 true 失败返回false
     *
     * @return
     */
    boolean removeFirst();


    /**
     * 从对象数组中删除最后一个DataSet
     * 如果成功返回 true 失败返回false
     *
     * @return
     */
    boolean removeLast();


    /**
     * 从DataSets数组中删除传入的DataSet。
     * 这也将重新计算DataSet的当前最小值和最大值以及总和值。
     * 如果成功返回 true 失败返回false
     *
     * @return
     */
    boolean removeEntry(T e);

    /**
     * 从DataSet中的values数组中删除给定索引处的Entry对象。
     * 这也将重新计算DataSet的当前最小值和最大值以及总和值。
     * 如果成功返回 true 失败返回false
     *
     * @return
     */
    boolean removeEntry(int index);

    /**
     * 检查此DataSet是否包含指定的Entry。
     * 如果是，则返回true，否则返回false。
     * 注意：再性能上这个非常糟糕，不要在性能严重的情况下过度使用。
     *
     * @param entry
     * @return
     */
    boolean contains(T entry);


    /**
     * 从此DataSet中移除所有值并执行所有必要的重新计算。
     */
    void clear();


    /** ###### ###### 样式相关的方法 ###### ###### */


    /**
     * 返回描述DataSet的标签字符串。
     *
     * @return
     */
    String getLabel();


    /**
     * 设置描述DataSet的标签字符串。
     *
     * @param label
     */
    void setLabel(String label);

    /**
     * 返回这个DataSet应该被绘制的轴。
     *
     * @return
     */
    YAxis.AxisDependency getAxisDependency();

    /**
     * 设置这个DataSet应绘制的Y轴（LEFT或RIGHT）。
     * 默认值：LEFT
     *
     * @param dependency
     */
    void setAxisDependency(YAxis.AxisDependency dependency);

    /**
     * 返回为此DataSet设置的所有颜色
     *
     * @return
     */
    List<Integer> getColors();

    /**
     * 返回此DataSet包含的colors-array的第一个颜色（索引0）。
     * 仅当颜色数组中只有一种颜色时（大小== 1），才会出于性能原因使用此功能。
     *
     * @return
     */
    int getColor();

    /**
     * 返回DataSet的颜色数组的给定索引处的颜色。
     * 按模量执行IndexOutOfBounds检查。
     *
     * @param index
     * @return
     */
    int getColor(int index);

    /**
     * 如果启用了高亮值，则返回true，否则返回false
     *
     * @return
     */
    boolean isHighlightEnabled();

    /**
     * 如果设置为true，则启用值高亮显示，这意味着可以以编程方式或通过触摸手势突出显示值。
     *
     * @param enabled
     */
    void setHighlightEnabled(boolean enabled);

    /**
     * 设置用于在图表内绘制值的格式器。
     * 如果未设置格式化程序，图表将自动确定图表内绘制的所有值的合理格式（涉及小数）。
     * 使用chart.getDefaultValueFormatter（）来使用图表计算的格式化程序。
     *
     * @param f
     */
    void setValueFormatter(IValueFormatter f);

    /**
     * 返回用于在图表内绘制值的格式器。
     *
     * @return
     */
    IValueFormatter getValueFormatter();

    /**
     * 如果此DataSet的valueFormatter对象为null，则返回true。
     *
     * @return
     */
    boolean needsFormatter();

    /**
     * 设置此DataSet的值标签应具有的颜色。
     *
     * @param color
     */
    void setValueTextColor(int color);

    /**
     * 设置要用作绘制值颜色的颜色列表。
     *
     * @param colors
     */
    void setValueTextColors(List<Integer> colors);

    /**
     * 设置标签label的文本样式
     *
     * @param tf
     */
    void setValutTypeface(Typeface tf);

    /**
     * 设置此DataSet的值标签的文本大(dp)。
     *
     * @param size
     */
    void setValueTextSize(float size);

    /**
     * 仅返回设置为用于值的所有颜色的第一种颜色。
     *
     * @return
     */
    int getValueTextColor();

    /**
     * 返回用于在图表内绘制值的指定索引处的颜色。
     * 内部使用模数。
     *
     * @param index
     * @return
     */
    int getValueTextColor(int index);

    /**
     * 返回用于在图表内绘制值的字体
     *
     * @return
     */
    Typeface getValueTypeface();

    /**
     * 返回用于在图表内绘制值的文本大小
     *
     * @return
     */
    float getValueTextSize();

    /**
     * 在图例中为此数据集绘制的表单。
     * <p/>
     * 返回`DEFAULT`使用默认的图例形式。
     */
    Legend.LegendFrom getFrom();

    /**
     * 在图例中为此数据集绘制的表单大小。
     * <p/>
     * 返回`Float.NaN`使用默认的图例表单大小。
     */
    float getFormSize();

    /**
     * 用于在图例中绘制此数据集窗体的线宽
     * <p/>
     * 返回`Float.NaN`使用默认的图例表格线宽。
     */
    float getFromLineWidth();

    /**
     * 用于包含线条的形状的线条虚线路径效果。
     * <p/>
     * 返回`null`使用默认的图例表单行破折号效果
     */
    DashPathEffect getFromLineDashEffect();

    /**
     * 将此设置为true以在图表上绘制y值。
     * <p>
     * 注意（对于条形图和折线图）：如果达到了`maxVisibleCount`，即使启用了该值，也不会绘制任何值
     *
     * @param enabled
     */
    void setDrawValues(boolean enabled);

    /**
     * 如果启用了y值绘图，则返回true;否则返回false
     *
     * @return
     */
    boolean isDrawValuesEnabled();

    /**
     * 将其设置为true以在图表上绘制y图标。
     * <p>
     * 注意（对于条形图和折线图）：如果达到了`maxVisibleCount`，即使启用了该图标也不会绘制图标
     *
     * @param enabled
     */
    void setDrawIcons(boolean enabled);

    /**
     * 如果启用了y-icon绘图，则返回true;否则返回false
     *
     * @return
     */
    boolean isDrawIconsEnabled();

    /**
     * 在图表上绘制的图标的偏移量。
     * <p>
     * 对于除Pie和Radar之外的所有图表，它将是普通的（x偏移，y偏移）。
     * <p>
     * 对于馅饼和雷达图，它将是（y偏移量，距中心偏移距离）;
     * 所以如果你希望图标被渲染到值的下方，你应该增加CGPoint的X分量，
     * 并且如果你想把图标渲染到最接近中心的位置，你应该减少CGPoint的高度分量。
     *
     * @param offset
     */
    void setIconsOffset(MPPointF offset);

    /**
     * 获取绘图图标的偏移量。
     */
    MPPointF getIconsOffset();

    /**
     * 设置此DataSet的可见性。
     * 如果不可见，DataSet将不会被刷新到图表上。
     *
     * @param visible
     */
    void setVisible(boolean visible);

    /**
     * 如果此DataSet在图表内可见，则返回true;
     * 如果此数据集当前处于隐藏状态，则返回false。
     *
     * @return
     */
    boolean isVisible();


}
