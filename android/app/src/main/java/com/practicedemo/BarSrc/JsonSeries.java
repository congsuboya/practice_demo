package com.practicedemo.BarSrc;

import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuchao on 2017/12/9.
 */

public class JsonSeries {

    private String name;
    private List<Float> data;


    public JsonSeries() {

    }

    public void setReactMap(ReadableMap object) {
            name = object.getString("name");
            ReadableArray dataObjArrary = object.getArray("data");
            data = new ArrayList<>();
            float dataItem;
            for (int i = 0; i < dataObjArrary.size(); i++) {
                dataItem = (float) dataObjArrary.getDouble(i);
                data.add(dataItem);
            }
    }

    public float getDataItemByIndex(int index) {
        return data.get(index);
    }
}
