package com.practicedemo.studyMp.data;

import android.graphics.drawable.Drawable;

/**
 * 数据的基本类型
 * <p>
 * Created by chaoye on 2018/1/31.
 */

public abstract class BaseEntry {


    /**
     * y 的值
     */
    private float y = 0f;

    /**
     * TODO
     */
    private Object mData = null;


    /**
     * icon 的 image
     */
    private Drawable mIcon = null;


    /**
     * 构造方法
     */
    public BaseEntry() {

    }


    public BaseEntry(float y) {
        this.y = y;
    }

    public BaseEntry(float y, Object data) {
        this.y = y;
        this.mData = data;
    }

    public BaseEntry(float y, Drawable icon) {
        this.y = y;
        this.mIcon = icon;
    }

    public BaseEntry(float y, Object data, Drawable icon) {
        this.y = y;
        this.mData = data;
        this.mIcon = icon;
    }


    /**
     * @return 获得Y的数值
     */
    public float getY() {
        return y;
    }

    public void setIcon(Drawable icon) {
        this.mIcon = icon;
    }

    public Drawable getIcon() {
        return mIcon;
    }

    public void setY(float y) {
        this.y = y;
    }

    public Object getData() {
        return mData;
    }


    public void setData(Object data) {
        this.mData = data;
    }


}
