package com.practicedemo.studyMp.data;

import android.graphics.Typeface;
import android.util.Log;

import com.practicedemo.studyMp.components.YAxis;
import com.practicedemo.studyMp.formatter.IValueFormatter;
import com.practicedemo.studyMp.highlight.Highlight;
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

                    if (dataSet.getYMin() < mLeftAxisMin)
                        mLeftAxisMin = dataSet.getYMin();

                    if (dataSet.getYMax() > mLeftAxisMax)
                        mLeftAxisMax = dataSet.getYMax();
                }
            }
        }

        T firstRight = getFirstRight(mDataSets);

        if (firstRight != null) {
            mRightAxisMax = firstRight.getYMax();
            mRightAxisMin = firstRight.getYMin();

            for (T dataSet : mDataSets) {
                if (dataSet.getAxisDependency() == YAxis.AxisDependency.RIGHT) {
                    if (dataSet.getYMin() < mRightAxisMin)
                        mRightAxisMin = dataSet.getYMin();

                    if (dataSet.getYMax() > mRightAxisMax)
                        mRightAxisMax = dataSet.getYMax();
                }
            }
        }
    }


    /***    下面的都是getter和setter方法         ***/

    /**
     * 返回此对象包含的LineDataSets的数量
     *
     * @return
     */
    public int getDataSetCount() {
        if (mDataSets == null)
            return 0;
        return mDataSets.size();
    }

    /**
     * 返回数据对象包含的最小y值。
     *
     * @return
     */
    public float getYMin() {
        return mYMin;
    }

    /**
     * 返回指定轴的最小y值。
     *
     * @param axis
     * @return
     */
    public float getYMin(YAxis.AxisDependency axis) {
        if (axis == YAxis.AxisDependency.LEFT) {
            if (mLeftAxisMin == Float.MAX_VALUE) {
                return mRightAxisMin;
            } else
                return mLeftAxisMin;
        } else {
            if (mRightAxisMin == Float.MAX_VALUE) {
                return mLeftAxisMin;
            } else
                return mRightAxisMin;
        }
    }

    /**
     * 返回数据对象包含的最大y值。
     *
     * @return
     */
    public float getYMax() {
        return mYMax;
    }

    /**
     * 返回指定轴的最大y值。
     *
     * @param axis
     * @return
     */
    public float getYMax(YAxis.AxisDependency axis) {
        if (axis == YAxis.AxisDependency.LEFT) {
            if (mLeftAxisMax == -Float.MAX_VALUE) {
                return mRightAxisMax;
            } else
                return mLeftAxisMax;
        } else {
            if (mRightAxisMax == -Float.MAX_VALUE) {
                return mLeftAxisMax;
            } else
                return mRightAxisMax;
        }
    }

    /**
     * 返回此数据对象包含的最小x值。
     *
     * @return
     */
    public float getXMin() {
        return mXMin;
    }

    /**
     * 返回此数据对象包含的最大x值。
     *
     * @return
     */
    public float getXMax() {
        return mXMax;
    }

    /**
     * 返回此ChartData对象保存的所有DataSet对象。
     *
     * @return
     */
    public List<T> getDataSets() {
        return mDataSets;
    }


    /**
     * 从ChartData中检索具有特定标签的DataSet的索引。
     * 搜索可能区分大小写。
     * 重要提示：此方法在运行时进行计算，不要在性能严重的情况下过度使用。
     *
     * @param dataSets   要搜索的数组
     * @param label
     * @param ignorecase 是否忽视大小写
     * @return
     */
    public int getDataSetIndexByLabel(List<T> dataSets, String label, boolean ignorecase) {
        if (ignorecase) {
            for (int i = 0; i < dataSets.size(); i++)
                if (label.equalsIgnoreCase(dataSets.get(i).getLabel()))
                    return i;
        } else {
            for (int i = 0; i < dataSets.size(); i++)
                if (label.equals(dataSets.get(i).getLabel()))
                    return i;
        }
        return -1;
    }

    /**
     * 以字符串数组形式返回所有DataSet的标签。
     *
     * @return
     */
    public String[] getDataSetLabels() {
        String[] types = new String[mDataSets.size()];

        for (int i = 0; i < mDataSets.size(); i++) {
            types[i] = mDataSets.get(i).getLabel();
        }

        return types;
    }

    /**
     * 获取相应高亮对象的条目
     *
     * @param highlight
     * @return
     */
    public Entry getEntryForHighlight(Highlight highlight) {
        if (highlight.getDataSetIndex() >= mDataSets.size())
            return null;
        else {
            return mDataSets.get(highlight.getDataSetIndex()).getEntryForXValue(highlight.getX(), highlight.getY());
        }
    }

    /**
     * 用给定的标签返回DataSet对象。
     * 搜索可能区分大小写。
     * 重要提示：此方法在运行时进行计算。 在性能危急的情况下小心使用。
     *
     * @param label
     * @param ignorecase
     * @return
     */
    public T getDataSetByLabel(String label, boolean ignorecase) {
        int index = getDataSetIndexByLabel(mDataSets, label, ignorecase);
        if (index < 0 || index >= mDataSets.size())
            return null;
        else
            return mDataSets.get(index);
    }

    public T getDataSetByIndex(int index) {
        if (mDataSets == null || index < 0 || index > mDataSets.size())
            return null;

        return mDataSets.get(index);
    }

    /**
     * 动态添加一个DataSet。
     *
     * @param d
     */
    public void addDataSet(T d) {
        if (d == null)
            return;

        calcMinMax(d);

        mDataSets.add(d);
    }

    /**
     * 从此数据对象中移除给定的DataSet。
     * 还重新计算所有最小值和最大值。
     * 如果DataSet被移除，则返回true;如果不能移除DataSet，则返回false。
     *
     * @param d
     * @return
     */
    public boolean removeDataSet(T d) {
        if (d == null)
            return false;

        boolean removed = mDataSets.remove(d);

        if (removed) {
            calcMinMax();
        }
        return removed;
    }

    /**
     * 从数据对象中删除DataSet数组中给定索引处的DataSet。
     * 还重新计算所有最小值和最大值。
     * 如果DataSet被移除，则返回true;如果不能移除DataSet，则返回false。
     *
     * @param index
     * @return
     */
    public boolean removeDataSet(int index) {
        if (index >= mDataSets.size() || index < 0)
            return false;

        T set = mDataSets.get(index);
        return removeDataSet(set);
    }

    /**
     * 在指定的索引处向DataSet添加一个条目。 条目被添加到列表的末尾。
     *
     * @param e
     * @param dataSetIndex
     */
    public void addEntry(Entry e, int dataSetIndex) {
        if (mDataSets.size() > dataSetIndex && dataSetIndex >= 0) {
            IDataSet set = mDataSets.get(dataSetIndex);
            if (!set.addEntry(e))
                return;

            calcMinMax(e, set.getAxisDependency());
        } else {
            Log.e("addEntry", "由于dataSetIndex太高或太低，无法添加条目。");
        }
    }

    /**
     * 从指定索引处的DataSet中移除给定的Entry对象。
     *
     * @param e
     * @param dataSetIndex
     * @return
     */
    public boolean removeEntry(Entry e, int dataSetIndex) {
        if (e == null || dataSetIndex >= mDataSets.size())
            return false;

        IDataSet set = mDataSets.get(dataSetIndex);

        if (set != null) {
            boolean removed = set.removeEntry(e);
            if (removed)
                calcMinMax();

            return removed;
        } else {
            return false;
        }
    }

    /**
     * 删除指定索引处最接近给定DataSet的Entry对象。
     * 如果删除了条目，则返回true;如果未找到符合指定要求的条目，则返回false。
     *
     * @param xValue
     * @param dataSetIndex
     * @return
     */
    public boolean removeEntry(float xValue, int dataSetIndex) {
        if (dataSetIndex >= mDataSets.size())
            return false;

        IDataSet dataSet = mDataSets.get(dataSetIndex);
        Entry e = dataSet.getEntryForXValue(xValue, Float.NaN);
        if (e == null)
            return false;
        return removeEntry(e, dataSetIndex);
    }

    /**
     * 返回包含提供的Entry的DataSet;如果没有DataSet包含此Entry，则返回null。
     *
     * @param e
     * @return
     */
    public T getDataSetForEntry(Entry e) {
        if (e == null)
            return null;

        for (int i = 0; i < mDataSets.size(); i++) {
            T set = mDataSets.get(i);
            for (int j = 0; j < set.getEntryCount(); j++) {
                if (e.equalTo(set.getEntryForXValue(e.getX(), e.getY()))) ;
                return set;
            }
        }
        return null;
    }

    /**
     * 返回此对象表示的所有DataSet对象中使用的所有颜色。
     *
     * @return
     */
    public int[] getColors() {
        if (mDataSets == null)
            return null;

        int clrcnt = 0;
        for (int i = 0; i < mDataSets.size(); i++) {
            clrcnt += mDataSets.get(i).getColors().size();
        }

        int[] colors = new int[clrcnt];
        int cnt = 0;

        for (int i = 0; i < mDataSets.size(); i++) {
            List<Integer> clrs = mDataSets.get(i).getColors();
            for (Integer clr : clrs) {
                colors[cnt] = clr;
                cnt++;
            }
        }
        return colors;
    }

    /**
     * 返回此数据对象的DataSet数组中提供的DataSet的索引，如果不存在则返回-1。
     *
     * @param dataSet
     * @return
     */
    public int getIndexOfDataSet(T dataSet) {
        return mDataSets.indexOf(dataSet);
    }

    /**
     * 从数据集数组中返回第一个DataSet，该数据集具有与左侧坐标轴的依赖关系。
     * 如果没有找到具有左依赖项的DataSet，则返回null。
     *
     * @param sets
     * @return
     */
    protected T getFirstLeft(List<T> sets) {
        for (T dataSet : sets) {
            if (dataSet.getAxisDependency() == YAxis.AxisDependency.LEFT)
                return dataSet;
        }
        return null;
    }

    /**
     * 从数据集数组中返回第一个DataSet，该数据集与右侧的依赖关系相关。
     * 如果没有找到具有右依赖关系的DataSet，则返回null。
     *
     * @param sets
     * @return
     */
    public T getFirstRight(List<T> sets) {
        for (T dataSet : sets) {
            if (dataSet.getAxisDependency() == YAxis.AxisDependency.RIGHT)
                return dataSet;
        }
        return null;
    }

    /**
     * 为此数据对象包含的所有DataSet设置自定义IValueFormatter。
     *
     * @param f
     */
    public void setValueFormatter(IValueFormatter f) {
        if (f == null)
            return;
        else {
            for (IDataSet set : mDataSets) {
                set.setValueFormatter(f);
            }
        }
    }

    /**
     * 为此数据对象包含的所有DataSet设置相同的值颜色列表。
     *
     * @param colors
     */
    public void setValueTextColors(List<Integer> colors) {
        for (IDataSet set : mDataSets) {
            set.setValueTextColors(colors);
        }
    }


    /**
     * 设置此数据对象包含的所有DataSet的值文本的颜色（绘制值标签的颜色）。
     *
     * @param color
     */
    public void setValueTextColor(int color) {
        for (IDataSet set : mDataSets) {
            set.setValueTextColor(color);
        }
    }

    /**
     * 为此数据对象包含的所有DataSet设置所有值标签的字体。
     *
     * @param tf
     */
    public void setValueTypeface(Typeface tf) {
        for (IDataSet set : mDataSets) {
            set.setValutTypeface(tf);
        }
    }

    /**
     * 设置此数据对象包含的所有DataSet的值文本的大小（以dp为单位）。
     *
     * @param size
     */
    public void setValueTextSize(float size) {
        for (IDataSet set : mDataSets) {
            set.setValueTextSize(size);
        }
    }

    /**
     * 为此数据对象包含的所有DataSet启用/禁用绘图值（值 - 文本）。
     *
     * @param enabled
     */
    public void setDrawValues(boolean enabled) {
        for (IDataSet set : mDataSets) {
            set.setDrawValues(enabled);
        }
    }

    /**
     * 为此数据对象包含的所有DataSet启用/禁用突出显示值。
     * 如果设置为true，则表示可以以编程方式或通过触摸手势突出显示值。
     *
     * @param enabled
     */
    public void setHighlightEnabled(boolean enabled) {
        for (IDataSet set : mDataSets) {
            set.setHighlightEnabled(enabled);
        }
    }

    /**
     * 如果突出显示所有基础值，则返回true，否则返回false。
     *
     * @return
     */
    public boolean isHighlightEnabled() {
        for (IDataSet set : mDataSets) {
            if (!set.isHighlightEnabled())
                return false;
        }
        return true;
    }

    /**
     * 从所有数据集中清除此数据对象并删除所有条目。
     * 此后不要忘记使图表无效。
     */
    public void clearValues() {
        if (mDataSets != null)
            mDataSets.clear();

        notifyDataChanged();
    }

    /**
     * 检查此数据对象是否包含指定的DataSet。
     * 如果是，则返回true，否则返回false。
     *
     * @param dataSet
     * @return
     */
    public boolean contains(T dataSet) {
        for (T set : mDataSets) {
            if (set.equals(dataSet))
                return true;
        }
        return false;
    }

    /**
     * 返回此数据对象包含的所有DataSet对象的总entry计数。
     *
     * @return
     */
    public int getEntryCount() {
        int count = 0;

        for (T set : mDataSets) {
            count += set.getEntryCount();
        }
        return count;
    }

    /**
     * 返回具有最大条目数的DataSet对象，如果没有数据集，则返回null。
     *
     * @return
     */
    public T getMaxEntryCountSet() {
        if (mDataSets == null || mDataSets.isEmpty())
            return null;

        T max = mDataSets.get(0);
        for (T set : mDataSets) {
            if (set.getEntryCount() > max.getEntryCount())
                max = set;
        }

        return max;
    }

    /**
     * 根据提供的Entry对象调整当前的最小值和最大值。
     *
     * @param e
     * @param axis
     */
    protected void calcMinMax(Entry e, YAxis.AxisDependency axis) {
        if (mYMax < e.getY())
            mYMax = e.getY();
        if (mYMin > e.getY())
            mYMin = e.getY();

        if (mXMax < e.getX())
            mXMax = e.getX();
        if (mXMin > e.getX())
            mXMin = e.getX();

        if (axis == YAxis.AxisDependency.LEFT) {
            if (mLeftAxisMax < e.getY())
                mLeftAxisMax = e.getY();
            if (mLeftAxisMin > e.getY())
                mLeftAxisMin = e.getY();
        } else {
            if (mRightAxisMax < e.getY())
                mRightAxisMax = e.getY();
            if (mRightAxisMin > e.getY())
                mRightAxisMin = e.getY();
        }
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
