package com.practicedemo.BarSrc;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuchao on 2017/12/9.
 */

public class JsonSeries {

    private String name = "";
    private List<Float> data;


    public JsonSeries() {

    }

    public void setReactMap(ReadableMap object) {

        name = object.getString("name");
        ReadableArray dataObjArrary = object.getArray("data");
        data = new ArrayList<>();
        float dataItem;
        try {
            for (int i = 0; i < dataObjArrary.size(); i++) {
                if (!dataObjArrary.isNull(i)) {
                    dataItem = (float) dataObjArrary.getDouble(i);
                } else {
                    dataItem = 0;
                }
                data.add(dataItem);
            }
        } catch (Exception e) {

        }

    }

    public float getDataItemByIndex(int index) {
        if (data.size() > 0 && data.size() > index) {
            return data.get(index);
        } else {
            return 0;
        }
    }
}
