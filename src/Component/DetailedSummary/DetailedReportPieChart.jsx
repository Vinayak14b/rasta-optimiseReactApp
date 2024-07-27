import React, { useEffect, useRef } from "react";
// am charts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function DetailedReportPieChart({ defects }) {
    const chartRef = useRef(null);
    const data = [];

    useEffect(() => {
        let chart = am4core.create("pieChart", am4charts.PieChart);
        chart.data = data;

        // Let's cut a hole in our Pie chart the size of 40% the radius
        chart.innerRadius = am4core.percent(25);
        chart.minWidth = am4core.percent(100);

        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "label";

        pieSeries.slices.template.stroke = am4core.color("#ffffff");
        pieSeries.slices.template.strokeWidth = 1;
        pieSeries.slices.template.strokeOpacity = 1;

        // Disable ticks and labels
        pieSeries.labels.template.disabled = true;
        pieSeries.ticks.template.disabled = true;

        pieSeries.legendSettings.itemLabelText = "{category}: {value}";

        // Exporting menu
        // chart.exporting.menu = new am4core.ExportMenu();
        // chart.exporting.enabled = false;

        chart.logo.disabled = true;

        // Add a legend
        chart.legend = new am4charts.Legend();
        chart.legend.maxHeight = 150;
        chart.legend.scrollable = true;
        chart.legend.valueLabels.template.disabled = true;
        chart.legend.fontSize = 12;

        // legend markers
        chart.legend.useDefaultMarker = true;
        let marker = chart.legend.markers.template.children.getIndex(0);
        marker.cornerRadius(12, 12, 12, 12);

        chartRef.current = chart;

        return () => {
            chart.dispose();
        };
    }, [data]);

    if (defects && Object.keys(defects).length > 0) {
        for (const [key, value] of Object.entries(defects)) {
            data.push({ label: key, value: value });
        }
    }

    return (
        <div className="defectsChart lowerSection">
            <h2 className="pieChartTitle font-poppins font-semibold leading-9 text-center mt-2">
                Defects
            </h2>

            <div id="pieChart">
                {!(defects && Object.keys(defects).length > 0) && (
                    <div> No Defects found on this road! </div>
                )}
            </div>
        </div>
    );
}

export default DetailedReportPieChart;
