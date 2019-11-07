/*
 * Visualization source
 */
define([
            'jquery',
            'underscore',
            'api/SplunkVisualizationBase',
            'api/SplunkVisualizationUtils',
            // Add required assets to this list
			'echarts'
        ],
        function(
            $,
            _,
            SplunkVisualizationBase,
            vizUtils,
			echarts
        ) {
  
    // Extend from SplunkVisualizationBase
    return SplunkVisualizationBase.extend({
  
        initialize: function() {
            SplunkVisualizationBase.prototype.initialize.apply(this, arguments);
            this.$el = $(this.el);
            // Initialization logic goes here
			this._echarts = undefined;
        },

        // Optionally implement to format data returned from search. 
        // The returned object will be passed to updateView as 'data'
        formatData: function(data) {
            return data;
        },
  
        // Implement updateView to render a visualization.
        //  'data' will be the data object returned from formatData or from the search
        //  'config' will be the configuration property object
        updateView: function(data, config) {

            // Return if no data
            if (!data) {
                return;
            }

            this._echarts = echarts.init(this.el);
            var showInlineDataLabel = config[this.getPropertyNamespaceInfo().propertyNamespace + 'showInlineDataLabel'] === 'true';
            var customColors = (config[this.getPropertyNamespaceInfo().propertyNamespace + 'customColor'] || '').split(',');

			var option = {
                title: {                  
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: function(params){
                        var res = params[0].name;
                        for (var i = 0, l = params.length; i < l; i++) {
                            if(params[i].color !== "rgba(0,0,0,0)")
                                res += '<br/>' + params[i].marker + ' ' + params[i].seriesName + ': ' + params[i].value;
                        }
                        return res;
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: 150
                },
                xAxis: {
                    type: 'value',
                    name: '',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                yAxis: {
                    type: 'category',
                    inverse: true,
                    name: '',
                    data: [],
                },
                series: []
            };

            var columnsWithOffsets =_.map(data.fields, function(value){ return value.name;}).slice(1);
            var columns = _.filter(columnsWithOffsets,function(x,index){ return index % 2 == 0 ;});
            option.legend.data = columns;

            option.yAxis.data = _.map(data.columns[0],function(value){ return value.substr(0,19).replace("T"," ");});
            
            var dataSeries = _.map(data.columns,function(column, index){
                var obj = {
                    name:data.fields[index].name,
                    type: 'bar',
                    stack: data.fields[index].name,
                    label: {
                        normal: {
                            show: showInlineDataLabel,
                            position: 'inside'
                        }
                    },
                    data:column
                }

                //for offset column, we just need to set background color to white and remove "name" property to hide 
                if(data.fields[index].name.toUpperCase().includes("OFFSET")){
                    obj.itemStyle = {
                        normal: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: 'rgba(0,0,0,0)'
                        }
                    };
                    delete obj.name;
                    obj.stack = data.fields[index+1].name;
                }else {
                    //index ==0 means its the _time field, ignore it
                    if(index > 0){
                        var color = customColors.shift();
                        if(color !== '' || color !== undefined){
                            obj.itemStyle = {
                                normal: {
                                    color: color
                                }
                            }
                        }
                    }
                }
                return obj;
            });

            option.series = dataSeries.slice(1);
			this._echarts.setOption(option);
        },

        // Search data params
        getInitialDataParams: function() {
            return ({
                outputMode: SplunkVisualizationBase.COLUMN_MAJOR_OUTPUT_MODE,
                count: 1000
            });
        },

        // Override to respond to re-sizing events
        reflow: function() {}
    });
});