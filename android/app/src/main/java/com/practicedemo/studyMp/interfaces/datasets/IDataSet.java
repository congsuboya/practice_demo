package com.practicedemo.studyMp.interfaces.datasets;

import com.github.mikephil.charting.data.DataSet;
import com.practicedemo.studyMp.data.Entry;

import java.util.List;

/**
 * Created by liuchao on 2018/3/3.
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
     * 计算从最接近给定fromX的数据Item到距离给定toX值最近的数据Item的最小和最大y值。这仅适用于autoScaleMinMax功能。
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



}
