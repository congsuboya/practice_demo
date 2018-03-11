package com.practicedemo.studyMp.renderer;

import com.practicedemo.studyMp.utils.ViewPortHandler;

/**
 * 所有Renderer的抽象基类。
 * Created by liuchao on 2018/3/11.
 */

public abstract class Renderer {

    protected ViewPortHandler mViewPortHandler;

    public Renderer(ViewPortHandler viewPortHandler) {
        this.mViewPortHandler = viewPortHandler;
    }
}
