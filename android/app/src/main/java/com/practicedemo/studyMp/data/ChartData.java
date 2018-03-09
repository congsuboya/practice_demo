package com.practicedemo.studyMp.data;

import com.practicedemo.studyMp.components.YAxis;
import com.practicedemo.studyMp.interfaces.datasets.IDataSet;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuchao on 2018/3/5.
 */

public abstract class ChartData<T extends IDataSet<? extends Entry>> {

    /**
     * 所有轴的值数组中的最大y值
     */
    protected float mYMax = -Float.MAX_VALUE;

    /**
     * 所有轴的值数组中的最小y值
     */
    protected float mYMin = Float.MAX_VALUE;

    /**
     * 值数组中的最大x值
     */
    protected float mXMax = -Float.MAX_VALUE;

    /**
     * 值数组中的最小x值
     */
    protected float mXMin = Float.MAX_VALUE;

    protected float mLeftAxisMax = -Float.MAX_VALUE;

    protected float mLeftAxisMin = Float.MAX_VALUE;

    protected float mRightAxisMax = -Float.MAX_VALUE;

    protected float mRightAxisMin = Float.MAX_VALUE;

    protected List<T> mDataSets;

    /**
     * 默认构造方法
     */
    public ChartData() {
        mDataSets = new ArrayList<T>();
    }

    /**
     * 采用单个或者多个的DataSet对象的构造函数
     *
     * @param dataSets
     */
    public ChartData(T... dataSets) {
        mDataSets = arrayToList(dataSets);
    }

    /**
     * @param array
     * @return
     */
    private List<T> arrayToList(T[] array) {
        List<T> list = new ArrayList<T>();
        for (T set : array) {
            list.add(set);
        }
        return list;
    }

    /**
     * 采用数组的构造方法
     *
     * @param sets 数据数组
     */
    public ChartData(List<T> sets) {
        this.mDataSets = sets;
        notifyDataChanged();
    }

    /**
     * 调用此方法让ChartData知道底层数据已更改。
     * 调用它可以在包含的数据发生变化时执行所有必要的重新计算。
     */
    public void notifyDataChanged() {
        calcMinMax();
    }

    /**
     * 计算所有数据集的最小和最大y值。
     * 告诉DataSet重新计算它们的最小和最大y值，这仅仅是autoScaleMinMax所必需的。
     *
     * @param fromX 开始计算的x值
     * @param toX   结束计算的x值
     */
    public void calcMinMaxY(float fromX, float toX) {
        for (T set : mDataSets) {
            set.calcMinMaxY(fromX, toX);
        }
        //应用新的数据
        calcMinMax();
    }

    /**
     * 计算所有数据集的最小值和最大值（包括x和y）。
     */
    protected void calcMinMax() {

        if (mDataSets == null)
            return;

        mYMax = -Float.MAX_VALUE;
        mYMin = Float.MAX_VALUE;
        mXMax = -Float.MAX_VALUE;
        mXMin = Float.MAX_VALUE;

        for (T set : mDataSets) {
            calcMinMax(set);
        }

        mLeftAxisMax = -Float.MAX_VALUE;
        mLeftAxisMin = Float.MAX_VALUE;
        mRightAxisMax = -Float.MAX_VALUE;
        mRightAxisMin = Float.MAX_VALUE;

        T firstLeft = getFirstLeft(mDataSets);

        if (firstLeft != null) {
            mLeftAxisMax = firstLeft.getXMax();
            mLeftAxisMin = firstLeft.getXMin();

            for (T dataSet : mDataSets) {
                if (dataSet.getAxisDependency() == YAxis.AxisDependency.LEFT) {

                    if (dataSet.getYMin()<mLeftAxisMin)
                        mLeftAxisMin = dataSet.getYMin();

                    if (dataSet.getYMax() > mLeftAxisMax)
                        mLeftAxisMax = dataSet.getYMax();
                }
            }
        }

        T firstRight = getFirstRight()
    }

    protected T getFirstLeft(List<T> sets) {
        for (T dataSet : sets) {
            if (dataSet.)
        }
    }

    public  T getFirstRight(List<T> sets){
        for (T dataSet: sets){
            if (dataSet.getAxisDependency() == YAxis.AxisDependency.RIGHT)
                return dataSet;
        }
        return null;
    }

    protected void calcMinMax(T d) {
        if (mYMax < d.getYMax())
            mYMax = d.getYMax();
        if (mYMin > d.getYMin())
            mYMin = d.getYMin();

        if (mXMax < d.getXMax())
            mXMax = d.getXMax();
        if (mXMin > d.getXMin())
            mXMin = d.getXMin();
    }
}
