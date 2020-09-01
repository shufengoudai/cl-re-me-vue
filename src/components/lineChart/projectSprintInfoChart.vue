<template>
    <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
    mixins: [resize],
    props: {
        className: {
            type: String,
            default: "chart"
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "350px"
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null
        };
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                this.setOptions(val);
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
        });
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, "macarons");
            this.setOptions(this.chartData);
        },
        setOptions({ expectedData, actualData, days } = {}) {
            this.chart.setOption({
                xAxis: {
                    data: days,
                    boundaryGap: false,
                    type: 'category'
                },
                grid: {
                    left: 10,
                    right: 16,
                    bottom: 20,
                    top: 30,
                    containLabel: true
                },
                tooltip: {
                    trigger: "axis",
                    padding: [5, 10]
                },
                yAxis: {
                },
                legend: {
                    data: [this.$t('projectChart.point'), this.$t('projectChart.pointRemian')]
                },
                series: [
                    {
                        name: this.$t('projectChart.point'),
                        symbolSize: 10,
                        symbol: "circle",
                        itemStyle: {
                            normal: {
                                color: "#FF005A",
                                lineStyle: {
                                    color: "#FF005A",
                                    width: 2
                                }
                            }
                        },
                        smooth: false,
                        type: "line",
                        data: expectedData,
                        animationDuration: 2800,
                        animationEasing: "cubicInOut"
                    },
                    {
                        name: this.$t('projectChart.pointRemian'),
                        smooth: false,
                        type: "line",
                        symbolSize: 10,
                        symbol: "circle",
                        itemStyle: {
                            normal: {
                                color: "#3888fa",
                                lineStyle: {
                                    color: "#3888fa",
                                    width: 2
                                },
                                areaStyle: {
                                    color: "#f3f8ff"
                                }
                            }
                        },
                        data: actualData,
                        animationDuration: 2800,
                        animationEasing: "quadraticOut"
                    }
                ]
            });
        }
    }
};
</script>
