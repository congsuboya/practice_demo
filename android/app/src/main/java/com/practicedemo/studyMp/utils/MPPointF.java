package com.practicedemo.studyMp.utils;

import android.os.Parcel;
import android.os.Parcelable;

import java.util.List;

/**
 * Created by liuchao on 2018/3/5.
 */

public class MPPointF extends ObjectPool.Poolable {

    private static ObjectPool<MPPointF> pool;

    public float x;
    public float y;

    static {
        pool = ObjectPool.create(32, new MPPointF(0, 0));
        pool.setReplenishPercentage(0.5f);
    }


    public MPPointF() {

    }

    public MPPointF(float x, float y) {
        this.x = x;
        this.y = y;
    }

    public static MPPointF getInstance(float x, float y) {
        MPPointF result = pool.get();
        result.x = x;
        result.y = y;
        return result;
    }

    public static MPPointF getInstance() {
        return pool.get();
    }

    public static MPPointF getInstance(MPPointF copy) {
        MPPointF result = pool.get();
        result.x = copy.x;
        result.y = copy.y;
        return result;
    }

    public static void recycleInstance(MPPointF instance) {
        pool.recycle(instance);
    }

    public static void recycleInstance(List<MPPointF> instances) {
        pool.recycle(instances);
    }

    public static final Parcelable.Creator<MPPointF> CREATOR = new Parcelable.Creator<MPPointF>() {


        /**
         *
         * 从指定宗地中的数据返回新点。
         *
         * @param in
         * @return
         */
        @Override
        public MPPointF createFromParcel(Parcel in) {
            MPPointF r = new MPPointF(0, 0);
            r.my_readFromParcel(in);
            return null;
        }

        /**
         *
         * 返回指定大小的矩形数组。
         *
         * @param size
         * @return
         */
        @Override
        public MPPointF[] newArray(int size) {
            return new MPPointF[size];
        }
    };

    /**
     * 根据存储在指定宗地中的数据设置点的坐标。
     * 要将点写入包裹，请调用writeToParcel（）。
     * 用于支持较旧的Android设备。
     *
     * @param in
     */
    public void my_readFromParcel(Parcel in) {
        x = in.readFloat();
        y = in.readFloat();
    }

    public float getX() {
        return this.x;
    }

    public float getY() {
        return this.y;
    }

    @Override
    protected ObjectPool.Poolable instantiate() {
        return new MPPointF(0, 0);
    }
}
