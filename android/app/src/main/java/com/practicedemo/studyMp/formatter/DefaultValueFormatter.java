package com.practicedemo.studyMp.formatter;

import com.practicedemo.studyMp.data.Entry;
import com.practicedemo.studyMp.utils.ViewPortHandler;

import java.text.DecimalFormat;

/**
 * Created by liuchao on 2018/3/11.
 */

public class DefaultValueFormatter implements IValueFormatter {

    /**
     * 用于格式化的DecimalFormat
     */
    protected DecimalFormat mFormat;

    protected int mDecimalDigits;

    /**
     * 构造函数，用于指定有几位小数
     *
     * @param digits
     */
    public DefaultValueFormatter(int digits) {
        setup(digits);
    }

    /**
     * 使用给定的小数位数设置格式器。
     *
     * @param digits
     */
    public void setup(int digits) {
        this.mDecimalDigits = digits;

        StringBuffer b = new StringBuffer();
        for (int i = 0; i < digits; i++) {
            if (i == 0)
                b.append(".");

            b.append("0");
        }

        mFormat = new DecimalFormat("###,###,###,##0" + b.toString());

    }

    @Override
    public String getFormattedValue(float value, Entry entry, int dataSetIndex, ViewPortHandler viewPortHandler) {
        return mFormat.format(value);
    }

    public int getDecimalDigits() {
        return mDecimalDigits;
    }
}
