package com.practicedemo.studyMp.highlight;

/**
 * Created by liuchao on 2018/3/3.
 * 用来表示堆叠图的数据值的一个范围
 * 例如 堆叠图数据是 -10，5，20 => 则范围就是（-10 - 0，0 - 5，5 - 25）
 */

public class Range {

    public float from;
    public float to;

    public Range(float from, float to) {
        this.from = from;
        this.to = to;
    }


    /**
     * 如果给的值再范围之内 返回 true 否则返回 false
     *
     * @param value
     * @return
     */
    public boolean contains(float value) {
        if (value > from && value <= to)
            return true;
        else
            return false;
    }


    public boolean isLarger(float value) {
        return value > to;
    }

    public boolean isSmaller(float value) {
        return value < from;
    }

}
