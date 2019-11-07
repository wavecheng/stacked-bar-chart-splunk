#requires Splunk Packaging tool & AppInspect tool installed on Linux

slim generate-manifest stacked_bar_chart --output stacked_bar_chart/app.manifest
slim package stacked_bar_chart --repository stacked_bar_chart/
slim validate stacked_bar_chart-0.1.0.tar.gz
splunk-appinspect inspect stacked_bar_chart-0.1.0.tar.gz --mode precert --included-tags cloud
