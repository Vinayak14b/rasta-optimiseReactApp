import React, { useEffect, useRef } from "react";
// am charts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function DetailedReportBarChart({ assets }) {
    const chartRef = useRef(null);
    const chartDiv = useRef(null);
    const data = [];

    if (assets && Object.keys(assets).length > 0) {
        for (const [key, value] of Object.entries(assets)) {
            data.push({ asset: key, count: value });
        }
    }

    useEffect(() => {
        let chart = am4core.create("barChart", am4charts.XYChart);
        chart.data = data;
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "asset";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.labels.template.fontSize = 11;
        categoryAxis.renderer.minGridDistance = 15;
        categoryAxis.renderer.labels.template.truncate = true;
        categoryAxis.renderer.labels.template.maxWidth = 100;

        const rotateLabel = (ev) => {
            var axis = ev.target;
            var cellWidth = axis.pixelWidth / (axis.endIndex - axis.startIndex);
            if (cellWidth < axis.renderer.labels.template.maxWidth) {
                axis.renderer.labels.template.rotation = -45;
                axis.renderer.labels.template.horizontalCenter = "right";
                axis.renderer.labels.template.verticalCenter = "middle";
            } else {
                axis.renderer.labels.template.rotation = 0;
                axis.renderer.labels.template.horizontalCenter = "middle";
                axis.renderer.labels.template.verticalCenter = "top";
            }
        };

        categoryAxis.events.on("startendchanged", rotateLabel);
        categoryAxis.events.on("sizechanged", rotateLabel);

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Assets Count";

        // valueAxis.renderer.labels.template.fontSize = 12.5;

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "count";
        series.dataFields.categoryX = "asset";
        series.columns.template.minWidth = 30;
        series.columns.template.maxWidth = 40;
        series.columns.template.width = am4core.percent(30);
        series.columns.template.fill = am4core.color("#f97316");
        series.columns.template.stroke = am4core.color("#f97316");
        series.tooltipText = "{categoryX}: [bold]{valueY}[/]";

        // Exporting Menu
        // chart.exporting.menu = new am4core.ExportMenu();
        // chart.exporting.enabled = false;

        chart.logo.disabled = true;

        // Scroll Logic
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX.marginBottom = 15;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panX";

        chartRef.current = chart;

        return () => {
            chart.dispose();
        };
    }, [data]);

    return (
        <div className="assetsChart lowerSection">
            <h2 className="barChartTitle font-poppins font-semibold leading-9 text-center mt-2">
                Assets
            </h2>
            <div id="barChart" ref={chartDiv}>
                {!(assets && Object.keys(assets).length > 0) && (
                    <div> No Assets found on this road! </div>
                )}
            </div>
        </div>
    );
}

export default DetailedReportBarChart;
