package com.practicedemo.BarSrc;

import android.support.v7.widget.RecyclerView;
import android.view.MotionEvent;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.practicedemo.R;


/**
 * Created by liuchao on 2017/12/9.
 */

public class BarItemVIewHolder extends RecyclerView.ViewHolder {

    TextView xAsixText;
    LinearLayout barHolder;
    LinearLayout lineHolder;
    LinearLayout allHolder;
    public BarItemVIewHolder(View itemView) {
        super(itemView);
        allHolder = (LinearLayout) itemView.findViewById(R.id.bar_all_view_holder);
        xAsixText = (TextView) itemView.findViewById(R.id.yAxis_text);
        barHolder = (LinearLayout) itemView.findViewById(R.id.bar_holder);
        lineHolder = (LinearLayout) itemView.findViewById(R.id.line_holder);


    }
}
