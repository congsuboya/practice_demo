package com.practicedemo.studyMp.formatter;

import com.practicedemo.studyMp.components.AxisBase;

import java.text.DecimalFormat;

/**
 * Created by liuchao on 2018/3/4.
 */

public class DefaultAxisValueFormatter implements IAxisValueFormatter {

    /**
     * 用于格式化的十进制格式
     */
    protected DecimalFormat mFormat;

    protected int digits = 0;

    public DefaultAxisValueFormatter(int digits) {
        this.digits = digits;

        StringBuffer b = new StringBuffer();
        for (int i = 0; i < digits; i++) {
            if (i == 0)
                b.append(".");

            b.append("0");
        }

        mFormat = new DecimalFormat("###,###,###,##0" + b.toString());
    }

    @Override
    public String getFormattedValue(float value, AxisBase axis) {
        return mFormat.format(value);
    }

    public int getDecimalDigits() {
        return digits;
    }
}
