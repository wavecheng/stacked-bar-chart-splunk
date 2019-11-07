# Stacked Bar Chart Viz #

Stacked Bar Chart visualization is built upon Apache ECharts library. It allows you to build a stacked bar chart, which can show the total duration as well as independent components duration with given order. The X axis will be the duration while Y axis is the time stamp, thus it can better handle long time range with small duration problem.

# Who is this app for? #
This app is for anyone who wants to visualise time duration in a transposed waterfall format.

# How does the app work? #
This app provides a visualization that you can use in your own apps and dashboards.

To use it in your dashboards, simply install the app, and create a search that provides the values you want to display in given order.

The expected data table should like this:

`...| table _time, total, {p1}-offset, {p1}, {p2}-offset, {p2}, ...`

where `p1`,`p2` are the data pionts you want to show on it. `-offset` is mandatory for each data point even they are all 0.

For example: 

`...| table _time, total, data-1-offset, data-1, data-2-offset, data-2`

* `_time` column will be y Axis label
* `total` column will be the the first bar in the chart and no offset needed
* `data-1-offset` will be the second bar's offset in the chart and will not show
* `data-1` is the real second bar on chart and it continues for `data-2-offset`,`data-2`,...

Runnable Splunk query:
` index=_internal thruput 
| table _time ,average_kbps, total_k_processed, kb, ev 
| where average_kbps !=0 AND total_k_processed!=0 AND kb!=0 AND ev!=0 
| eval total=round(total_k_processed/10000,2) 
| eval kbps=round(average_kbps*10,2) 
| eval kb=round(kb,2) 
| eval ev=round(abs(total-ev),2) 
| eval kbps_offset=kb 
| eval kb_offset=kb+kbps
| eval ev_offset=kb 
| table _time, total,kbps_offset, kbps,kb_offset,kb,ev_offset, ev 
| head 5
`

# Release Notes #

## Issues and Limitations ##
No issues identified.

## Privacy and Legal ##
No personally identifiable information is logged or obtained in any way through this visualizaton.

Support is not guaranteed and will be provided on a best effort basis.

# Credits #
This visualization uses the echarts.js visualization library.
