package com.practicedemo.studyMp.animation;

import com.github.mikephil.charting.animation.*;

/**
 * Created by chaoye on 2018/3/13.
 */

public class Easing {

    public enum EasingOption {
        Linear,
        EaseInQuad,
        EaseOutQuad,
        EaseInOutQuad,
        EaseInCubic,
        EaseOutCubic,
        EaseInOutCubic,
        EaseInQuart,
        EaseOutQuart,
        EaseInOutQuart,
        EaseInSine,
        EaseOutSine,
        EaseInOutSine,
        EaseInExpo,
        EaseOutExpo,
        EaseInOutExpo,
        EaseInCirc,
        EaseOutCirc,
        EaseInOutCirc,
        EaseInElastic,
        EaseOutElastic,
        EaseInOutElastic,
        EaseInBack,
        EaseOutBack,
        EaseInOutBack,
        EaseInBounce,
        EaseOutBounce,
        EaseInOutBounce,
    }

    public static com.github.mikephil.charting.animation.EasingFunction getEasingFunctionFromOption(com.github.mikephil.charting.animation.Easing.EasingOption easing) {
        switch (easing) {
            default:
            case Linear:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.Linear;
            case EaseInQuad:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInQuad;
            case EaseOutQuad:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutQuad;
            case EaseInOutQuad:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutQuad;
            case EaseInCubic:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInCubic;
            case EaseOutCubic:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutCubic;
            case EaseInOutCubic:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutCubic;
            case EaseInQuart:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInQuart;
            case EaseOutQuart:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutQuart;
            case EaseInOutQuart:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutQuart;
            case EaseInSine:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInSine;
            case EaseOutSine:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutSine;
            case EaseInOutSine:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutSine;
            case EaseInExpo:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInExpo;
            case EaseOutExpo:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutExpo;
            case EaseInOutExpo:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutExpo;
            case EaseInCirc:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInCirc;
            case EaseOutCirc:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutCirc;
            case EaseInOutCirc:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutCirc;
            case EaseInElastic:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInElastic;
            case EaseOutElastic:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutElastic;
            case EaseInOutElastic:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutElastic;
            case EaseInBack:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInBack;
            case EaseOutBack:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutBack;
            case EaseInOutBack:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutBack;
            case EaseInBounce:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInBounce;
            case EaseOutBounce:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseOutBounce;
            case EaseInOutBounce:
                return com.github.mikephil.charting.animation.Easing.EasingFunctions.EaseInOutBounce;
        }
    }

    private static class EasingFunctions {

        /**
         * ########## ########## ########## ########## ########## ##########
         * PREDEFINED EASING FUNCTIONS BELOW THIS
         */

        public static final com.github.mikephil.charting.animation.EasingFunction Linear = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // return elapsed / (float) duration;
            // }

            @Override
            public float getInterpolation(float input) {
                return input;
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInQuad = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (float) duration;
            // return position * position;
            // }

            @Override
            public float getInterpolation(float input) {
                return input * input;
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutQuad = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (float) duration;
            // return -position * (position - 2.f);
            // }

            @Override
            public float getInterpolation(float input) {
                return -input * (input - 2f);
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutQuad = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (duration / 2.f);
            // if (position < 1.f)
            // {
            // return 0.5f * position * position;
            // }
            // return -0.5f * ((--position) * (position - 2.f) - 1.f);
            // }

            @Override
            public float getInterpolation(float input) {

                float position = input / 0.5f;

                if (position < 1.f) {
                    return 0.5f * position * position;
                }

                return -0.5f * ((--position) * (position - 2.f) - 1.f);
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInCubic = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (float) duration;
            // return position * position * position;
            // }

            @Override
            public float getInterpolation(float input) {
                return input * input * input;
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutCubic = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // float position = elapsed / (float) duration;
                    // position--;
                    // return (position * position * position + 1.f);
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        input--;
                        return (input * input * input + 1.f);
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutCubic = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // float position = elapsed / (duration / 2.f);
                    // if (position < 1.f)
                    // {
                    // return 0.5f * position * position * position;
                    // }
                    // position -= 2.f;
                    // return 0.5f * (position * position * position + 2.f);
                    // }

                    @Override
                    public float getInterpolation(float input) {

                        float position = input / 0.5f;
                        if (position < 1.f) {
                            return 0.5f * position * position * position;
                        }
                        position -= 2.f;
                        return 0.5f * (position * position * position + 2.f);
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInQuart = new com.github.mikephil.charting.animation.EasingFunction() {

            public float getInterpolation(float input) {
                return input * input * input * input;
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutQuart = new com.github.mikephil.charting.animation.EasingFunction() {

            public float getInterpolation(float input) {
                input--;
                return -(input * input * input * input - 1f);
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutQuart = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    @Override
                    public float getInterpolation(float input) {
                        float position = input / 0.5f;
                        if (position < 1.f) {
                            return 0.5f * position * position * position * position;
                        }
                        position -= 2.f;
                        return -0.5f * (position * position * position * position - 2.f);
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInSine = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (float) duration;
            // return -(float) Math.cos(position * (Math.PI / 2.f)) + 1.f;
            // }
            @Override
            public float getInterpolation(float input) {
                return -(float) Math.cos(input * (Math.PI / 2.f)) + 1.f;
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutSine = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (float) duration;
            // return (float) Math.sin(position * (Math.PI / 2.f));
            // }
            @Override
            public float getInterpolation(float input) {
                return (float) Math.sin(input * (Math.PI / 2.f));
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutSine = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (float) duration;
            // return -0.5f * ((float) Math.cos(Math.PI * position) - 1.f);
            // }

            @Override
            public float getInterpolation(float input) {
                return -0.5f * ((float) Math.cos(Math.PI * input) - 1.f);
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInExpo = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // return (elapsed == 0) ? 0.f : (float) Math.pow(2.f, 10.f * (elapsed
            // / (float) duration - 1.f));
            // }
            @Override
            public float getInterpolation(float input) {
                return (input == 0) ? 0.f : (float) Math.pow(2.f, 10.f * (input - 1.f));
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutExpo = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // return (elapsed == duration) ? 1.f : (-(float) Math.pow(2.f, -10.f *
            // elapsed
            // / (float) duration) + 1.f);
            // }

            @Override
            public float getInterpolation(float input) {
                return (input == 1f) ? 1.f : (-(float) Math.pow(2.f, -10.f * (input + 1.f)));
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutExpo = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // if (elapsed == 0)
                    // {
                    // return 0.f;
                    // }
                    // if (elapsed == duration)
                    // {
                    // return 1.f;
                    // }
                    //
                    // float position = elapsed / (duration / 2.f);
                    // if (position < 1.f)
                    // {
                    // return 0.5f * (float) Math.pow(2.f, 10.f * (position - 1.f));
                    // }
                    // return 0.5f * (-(float) Math.pow(2.f, -10.f * --position) +
                    // 2.f);
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        if (input == 0)
                        {
                            return 0.f;
                        }
                        if (input == 1f)
                        {
                            return 1.f;
                        }

                        float position = input / 0.5f;
                        if (position < 1.f)
                        {
                            return 0.5f * (float) Math.pow(2.f, 10.f * (position - 1.f));
                        }
                        return 0.5f * (-(float) Math.pow(2.f, -10.f * --position) + 2.f);
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInCirc = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (float) duration;
            // return -((float) Math.sqrt(1.f - position * position) - 1.f);
            // }

            @Override
            public float getInterpolation(float input) {
                return -((float) Math.sqrt(1.f - input * input) - 1.f);
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutCirc = new com.github.mikephil.charting.animation.EasingFunction() {
            // @Override
            // public float ease(long elapsed, long duration) {
            // float position = elapsed / (float) duration;
            // position--;
            // return (float) Math.sqrt(1.f - position * position);
            // }
            @Override
            public float getInterpolation(float input) {
                input--;
                return (float) Math.sqrt(1.f - input * input);
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutCirc = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // float position = elapsed / (duration / 2.f);
                    // if (position < 1.f)
                    // {
                    // return -0.5f * ((float) Math.sqrt(1.f - position * position)
                    // - 1.f);
                    // }
                    // return 0.5f * ((float) Math.sqrt(1.f - (position -= 2.f) *
                    // position)
                    // + 1.f);
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        float position = input / 0.5f;
                        if (position < 1.f)
                        {
                            return -0.5f * ((float) Math.sqrt(1.f - position * position) - 1.f);
                        }
                        return 0.5f * ((float) Math.sqrt(1.f - (position -= 2.f) * position)
                                + 1.f);
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInElastic = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // if (elapsed == 0)
                    // {
                    // return 0.f;
                    // }
                    //
                    // float position = elapsed / (float) duration;
                    // if (position == 1)
                    // {
                    // return 1.f;
                    // }
                    //
                    // float p = duration * .3f;
                    // float s = p / (2.f * (float) Math.PI) * (float)
                    // Math.asin(1.f);
                    // return -((float) Math.pow(2.f, 10.f * (position -= 1.f)) *
                    // (float)
                    // Math
                    // .sin((position * duration - s) * (2.f * Math.PI) / p));
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        if (input == 0)
                        {
                            return 0.f;
                        }

                        float position = input;
                        if (position == 1)
                        {
                            return 1.f;
                        }

                        float p = .3f;
                        float s = p / (2.f * (float) Math.PI) * (float) Math.asin(1.f);
                        return -((float) Math.pow(2.f, 10.f * (position -= 1.f)) * (float)
                                Math
                                        .sin((position - s) * (2.f * Math.PI) / p));
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutElastic = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // if (elapsed == 0)
                    // {
                    // return 0.f;
                    // }
                    //
                    // float position = elapsed / (float) duration;
                    // if (position == 1)
                    // {
                    // return 1.f;
                    // }
                    //
                    // float p = duration * .3f;
                    // float s = p / (2 * (float) Math.PI) * (float) Math.asin(1.f);
                    // return (float) Math.pow(2, -10 * position)
                    // * (float) Math.sin((position * duration - s) * (2.f *
                    // Math.PI) / p) +
                    // 1.f;
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        if (input == 0)
                        {
                            return 0.f;
                        }

                        float position = input;
                        if (position == 1)
                        {
                            return 1.f;
                        }

                        float p = .3f;
                        float s = p / (2 * (float) Math.PI) * (float) Math.asin(1.f);
                        return (float) Math.pow(2, -10 * position)
                                * (float) Math.sin((position - s) * (2.f * Math.PI) / p) +
                                1.f;
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutElastic = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // if (elapsed == 0)
                    // {
                    // return 0.f;
                    // }
                    //
                    // float position = elapsed / (duration / 2.f);
                    // if (position == 2)
                    // {
                    // return 1.f;
                    // }
                    //
                    // float p = duration * (.3f * 1.5f);
                    // float s = p / (2.f * (float) Math.PI) * (float)
                    // Math.asin(1.f);
                    // if (position < 1.f)
                    // {
                    // return -.5f
                    // * ((float) Math.pow(2.f, 10.f * (position -= 1.f)) * (float)
                    // Math
                    // .sin((position * duration - s) * (2.f * Math.PI) / p));
                    // }
                    // return (float) Math.pow(2.f, -10.f * (position -= 1.f))
                    // * (float) Math.sin((position * duration - s) * (2.f *
                    // Math.PI) / p) *
                    // .5f
                    // + 1.f;
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        if (input == 0)
                        {
                            return 0.f;
                        }

                        float position = input / 0.5f;
                        if (position == 2)
                        {
                            return 1.f;
                        }

                        float p = (.3f * 1.5f);
                        float s = p / (2.f * (float) Math.PI) * (float) Math.asin(1.f);
                        if (position < 1.f)
                        {
                            return -.5f
                                    * ((float) Math.pow(2.f, 10.f * (position -= 1.f)) * (float) Math
                                    .sin((position * 1f - s) * (2.f * Math.PI) / p));
                        }
                        return (float) Math.pow(2.f, -10.f * (position -= 1.f))
                                * (float) Math.sin((position * 1f - s) * (2.f * Math.PI) / p) *
                                .5f
                                + 1.f;
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInBack = new com.github.mikephil.charting.animation.EasingFunction()
        {
            // @Override
            // public float ease(long elapsed, long duration) {
            // final float s = 1.70158f;
            // float position = elapsed / (float) duration;
            // return position * position * ((s + 1.f) * position - s);
            // }

            @Override
            public float getInterpolation(float input) {
                final float s = 1.70158f;
                float position = input;
                return position * position * ((s + 1.f) * position - s);
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutBack = new com.github.mikephil.charting.animation.EasingFunction()
        {
            // @Override
            // public float ease(long elapsed, long duration) {
            // final float s = 1.70158f;
            // float position = elapsed / (float) duration;
            // position--;
            // return (position * position * ((s + 1.f) * position + s) + 1.f);
            // }

            @Override
            public float getInterpolation(float input) {
                final float s = 1.70158f;
                float position = input;
                position--;
                return (position * position * ((s + 1.f) * position + s) + 1.f);
            }
        };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutBack = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // float s = 1.70158f;
                    // float position = elapsed / (duration / 2.f);
                    // if (position < 1.f)
                    // {
                    // return 0.5f * (position * position * (((s *= (1.525f)) + 1.f)
                    // *
                    // position - s));
                    // }
                    // return 0.5f * ((position -= 2.f) * position
                    // * (((s *= (1.525f)) + 1.f) * position + s) + 2.f);
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        float s = 1.70158f;
                        float position = input / 0.5f;
                        if (position < 1.f)
                        {
                            return 0.5f * (position * position * (((s *= (1.525f)) + 1.f) *
                                    position - s));
                        }
                        return 0.5f * ((position -= 2.f) * position
                                * (((s *= (1.525f)) + 1.f) * position + s) + 2.f);
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInBounce = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // return 1.f - EaseOutBounce.ease(duration - elapsed,
                    // duration);
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        return 1.f - EaseOutBounce.getInterpolation(1f - input);
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseOutBounce = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // float position = elapsed / (float) duration;
                    // if (position < (1.f / 2.75f))
                    // {
                    // return (7.5625f * position * position);
                    // }
                    // else if (position < (2.f / 2.75f))
                    // {
                    // return (7.5625f * (position -= (1.5f / 2.75f)) * position +
                    // .75f);
                    // }
                    // else if (position < (2.5f / 2.75f))
                    // {
                    // return (7.5625f * (position -= (2.25f / 2.75f)) * position +
                    // .9375f);
                    // }
                    // else
                    // {
                    // return (7.5625f * (position -= (2.625f / 2.75f)) * position +
                    // .984375f);
                    // }
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        float position = input;
                        if (position < (1.f / 2.75f))
                        {
                            return (7.5625f * position * position);
                        }
                        else if (position < (2.f / 2.75f))
                        {
                            return (7.5625f * (position -= (1.5f / 2.75f)) * position + .75f);
                        }
                        else if (position < (2.5f / 2.75f))
                        {
                            return (7.5625f * (position -= (2.25f / 2.75f)) * position + .9375f);
                        }
                        else
                        {
                            return (7.5625f * (position -= (2.625f / 2.75f)) * position +
                                    .984375f);
                        }
                    }
                };

        public static final com.github.mikephil.charting.animation.EasingFunction EaseInOutBounce = new
                com.github.mikephil.charting.animation.EasingFunction() {
                    // @Override
                    // public float ease(long elapsed, long duration) {
                    // if (elapsed < duration / 2.f)
                    // {
                    // return EaseInBounce.ease(elapsed * 2, duration) * .5f;
                    // }
                    // return EaseOutBounce.ease(elapsed * 2 - duration, duration) *
                    // .5f +
                    // .5f;
                    // }

                    @Override
                    public float getInterpolation(float input) {
                        if (input < 0.5f)
                        {
                            return EaseInBounce.getInterpolation(input * 2) * .5f;
                        }
                        return EaseOutBounce.getInterpolation(input * 2 - 1f) * .5f +
                                .5f;
                    }
                };

    }
}
