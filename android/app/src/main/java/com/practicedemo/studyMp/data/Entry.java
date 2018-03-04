package com.practicedemo.studyMp.data;

import android.graphics.drawable.Drawable;
import android.os.Parcel;
import android.os.ParcelFormatException;
import android.os.Parcelable;

import com.practicedemo.studyMp.utils.Utils;

/**
 * Created by liuchao on 2018/3/3.
 */

public class Entry extends BaseEntry implements Parcelable {

    /**
     * x对应的值
     */
    private float x = 0f;

    public Entry() {

    }

    /**
     * 一个Entry再图标 chart中代表一个数据对象
     *
     * @param x x的值
     * @param y y的值
     */
    public Entry(float x, float y) {
        super(y);
        this.x = x;
    }


    /**
     * 一个Entry再图标 chart中代表一个数据对象
     *
     * @param x    x的值
     * @param y    y的值
     * @param data 代表一个数据对象中额外的数据
     */
    public Entry(float x, float y, Object data) {
        super(y, data);
        this.x = x;
    }


    /**
     * 一个Entry再图标 chart中代表一个数据对象
     *
     * @param x    x的值
     * @param y    y的值
     * @param icon 数据额外的图标
     */
    public Entry(float x, float y, Drawable icon) {
        super(y, icon);
        this.x = x;
    }

    /**
     * 一个Entry再图标 chart中代表一个数据对象
     *
     * @param x    x的值
     * @param y    y的值
     * @param icon 数据条目对应的图标
     * @param data 数据条目的额外数据
     */
    public Entry(float x, float y, Drawable icon, Object data) {
        super(y, data, icon);
        this.x = x;
    }


    /**
     * @return 返回数据对象中x的值
     */
    public float getX() {
        return x;
    }

    /**
     * @param x 设置数据对象中x的值
     */
    public void setX(float x) {
        this.x = x;
    }


    /**
     * @return 返回该对象的一个复制对象
     */
    public Entry copy() {
        Entry e = new Entry(x, getY(), getData());
        return e;
    }


    /**
     * 返回两个数据对象的比较结果
     *
     * @param e
     * @return
     */
    public boolean equalTo(Entry e) {
        if (e == null)
            return false;

        if (e.getData() != this.getData())
            return false;

        if (Math.abs(e.x - this.x) > Utils.FLOAT_EPSILON)
            return false;

        if (Math.abs(e.getY() - this.getY()) > Utils.FLOAT_EPSILON)
            return false;

        return true;

    }


    @Override
    public String toString() {
        return "Entry, x: " + x + " y: " + getY();
    }


    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeFloat(this.x);
        dest.writeFloat(this.getY());
        if (getData() != null) {
            if (getData() instanceof Parcelable) {
                dest.writeInt(1);
                dest.writeParcelable((Parcelable) this.getData(), flags);
            } else {
                throw new ParcelFormatException("不能序列化一个带为序列化数据的数据条目");
            }
        } else {
            dest.writeInt(0);
        }
    }


    protected Entry(Parcel in) {
        this.x = in.readFloat();
        this.setY(in.readFloat());
        if (in.readInt() == 1) {
            this.setData(in.readParcelable(Object.class.getClassLoader()));
        }
    }

    public static final Parcelable.Creator<Entry> CREATOR = new Parcelable.Creator<Entry>() {

        @Override
        public Entry createFromParcel(Parcel source) {
            return new Entry(source);
        }

        @Override
        public Entry[] newArray(int size) {
            return new Entry[size];
        }
    };
}
