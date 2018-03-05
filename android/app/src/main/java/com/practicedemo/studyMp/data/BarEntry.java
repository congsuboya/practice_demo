package com.practicedemo.studyMp.data;

import android.annotation.SuppressLint;
import android.graphics.drawable.Drawable;

import com.practicedemo.studyMp.highlight.Range;

/**
 * 柱形图的数据基本类（尤其是堆叠柱形图）
 * <p>
 * Created by liuchao on 2018/3/3.
 */

@SuppressLint("ParcelCreator")
public class BarEntry extends Entry {

    /**
     * 堆叠柱形图的数据
     */
    private float[] mYVals;

    /**
     * 自动计算 单个堆叠图数据的数据范围
     */
    private Range[] mRanges;

    /**
     * 这个柱形图数据的所有负数的总和
     */
    private float mNegativeSum;

    /**
     * 这个柱形图数据的所有正数的和
     */
    private float mPositiveSum;


    /**
     * 正常柱形图的构造函数（不是堆叠）
     *
     * @param x
     * @param y
     */
    public BarEntry(float x, float y) {
        super(x, y);
    }

    /**
     * 正常柱形图的构造函数（不是堆叠）
     *
     * @param x
     * @param y
     * @param data 点击条目时表示的其他数据
     */
    public BarEntry(float x, float y, Object data) {
        super(x, y, data);
    }


    /**
     * 正常柱形图的构造函数（不是堆叠）
     *
     * @param x
     * @param y
     * @param icon 图标
     */
    public BarEntry(float x, float y, Drawable icon) {
        super(x, y, icon);
    }


    /**
     * 正常柱形图的构造函数（不是堆叠）
     *
     * @param x
     * @param y
     * @param icon icon 图标
     * @param data 点击条目时表示的其他数据
     */
    public BarEntry(float x, float y, Drawable icon, Object data) {
        super(x, y, icon, data);
    }


    /**
     * 堆叠柱形图的构造函数，其中一个数据包含所有的堆叠数据
     *
     * @param x
     * @param vals 堆叠数据
     */
    public BarEntry(float x, float[] vals) {
        super(x, calcSum(vals));
        this.mYVals = vals;
        calcPosNegSum();
        calcRanges();
    }


    /**
     * 堆叠柱形图的构造函数，其中一个数据包含所有的堆叠数据
     *
     * @param x
     * @param vals 堆叠数据
     * @param data 点击条目时表示的其他数据
     */
    public BarEntry(float x, float[] vals, Object data) {
        super(x, calcSum(vals), data);

        this.mYVals = vals;
        calcPosNegSum();
        calcRanges();

    }


    /**
     * 堆叠柱形图的构造函数，其中一个数据包含所有的堆叠数据
     *
     * @param x
     * @param vals 堆叠数据
     * @param icon item的图标
     */
    public BarEntry(float x, float[] vals, Drawable icon) {
        super(x, calcSum(vals), icon);

        this.mYVals = vals;
        calcPosNegSum();
        calcRanges();
    }


    /**
     * 堆叠柱形图的构造函数，其中一个数据包含所有的堆叠数据
     *
     * @param x
     * @param vals 堆叠数据
     * @param icon item的图标
     * @param data 点击条目时表示的其他数据
     */
    public BarEntry(float x, float[] vals, Drawable icon, Object data) {
        super(x, calcSum(vals), icon, data);

        this.mYVals = vals;
        calcPosNegSum();
        calcRanges();
    }


    /**
     * 返回一个BarEntry的精确副本
     *
     * @return
     */
    public BarEntry copy() {
        BarEntry copied = new BarEntry(getX(), getY(), getData());
        copied.setYVals(getYVals());
        return copied;
    }


    public float[] getYVals() {
        return mYVals;
    }


    public void setYVals(float[] vals) {
        this.mYVals = vals;
    }


    @Override
    public float getY() {
        return super.getY();
    }


    public Range[] getRanges() {
        return mRanges;
    }


    /**
     *
     * 如果是堆叠图返回true 否则返回false
     *
     * @return
     */
    public boolean isStacked() {
        return this.mYVals != null;
    }


    public float getSumBelow(int stackInded){
        if (mYVals == null)
            return 0;

        float remainder = 0f;
        int index = mYVals.length -1;
        while (index>stackInded&&index>=0){
            remainder +=mYVals[index];
            index--;
        }

        return remainder;
    }





    private void calcPosNegSum() {
        if (mYVals == null) {
            mNegativeSum = 0;
            mPositiveSum = 0;
            return;
        }
        float sumNeg = 0f;
        float sumPos = 0f;

        for (float f : mYVals) {
            if (f <= 0f)
                sumNeg += Math.abs(f);
            else
                sumPos += f;
        }

        mNegativeSum = sumNeg;
        mPositiveSum = sumPos;
    }


    protected void calcRanges() {
        float[] values = getYVals();

        if (values == null || values.length == 0)
            return;

        mRanges = new Range[values.length];

        float negRemain = -getNegativeSum();
        float posRemain = 0f;

        for (int i = 0; i < mRanges.length; i++) {
            float value = values[i];

            if (value < 0) {
                mRanges[i] = new Range(negRemain, negRemain - value);
                negRemain -= value;
            } else {
                mRanges[i] = new Range(posRemain, posRemain + value);
                posRemain += value;
            }
        }
    }


    public float getNegativeSum() {
        return mNegativeSum;
    }

    public float getPositiveSum() {
        return mPositiveSum;
    }

    /**
     * 计算给定堆叠图数据的所有值之和。
     *
     * @param vals
     * @return
     */
    private static float calcSum(float[] vals) {
        if (vals == null)
            return 0f;

        float sum = 0f;

        for (float f : vals)
            sum += f;

        return sum;
    }

}
