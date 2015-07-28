$(document).ready(function(){

	var plotCharts = function (){
		this.hkData = [];
		this.bostonData = [];
		this.nycData = [];
	};

	plotCharts.prototype.getHkData = function (){
		$.ajax({
			context: this,
			type: "GET",
			url: 'http://api.openweathermap.org/data/2.5/history/city?q=hongkong&type=day',
			success: 
				function (responses){
					var lists = responses.list;
					for (var i = 0; i < lists.length; i++){
						var convertedDate = new Date(lists[i]['dt']*1000);
						this.hkData.push({
								x: convertedDate,
								y: lists[i]['main']['temp']
						});
					}
					console.log(this.hkData);
					plotcharts.drawCharts();
				}
		});
	};

	plotCharts.prototype.getBostonData = function (){
		$.ajax({
			context: this,
			type: "GET",
			url: 'http://api.openweathermap.org/data/2.5/history/city?q=boston&type=day',
			success: 
				function (responses){
					var lists = responses.list;
					for (var i = 0; i < lists.length; i++){
						var convertedDate = new Date(lists[i]['dt']*1000);
						this.bostonData.push({
							x: convertedDate,
							y: lists[i]['main']['temp']
						});
					}
					console.log(this.bostonData);
					plotcharts.drawCharts();
				}
		});
	};

	plotCharts.prototype.getNycData = function (){
		$.ajax({
			context: this,
			type: "GET",
			url: 'http://api.openweathermap.org/data/2.5/history/city?q=nyc&type=day',
			success: 
				function (responses){
					var lists = responses.list;
					for (var i = 0; i < lists.length; i++){
						var convertedDate = new Date(lists[i]['dt']*1000);
						this.nycData.push({
							x: convertedDate,
							y: lists[i]['main']['temp']
						});
					}
					console.log(this.nycData);
					plotcharts.drawCharts();

				}
		});
	};

	plotCharts.prototype.drawCharts = function (){
		var config = {
			chart: {
				marginTop: 80,
				height: 400
			},
			title: {
				text: 'Historical Temperatures'
			},
			subtitle: {
				text: 'openweathermap.org'
			},
			legend: {
				align: 'right',
				verticalAlign: 'middle',
				layout: 'vertical'
			},
			xAxis: {
				type: 'datetime'
			},
			yAxis: {
				title: { 
					text:'Temperature (°K)'
				}
			},
			series: [
				{
					name: 'HK temp', data: this.hkData
				},{
					name: 'Boston temp', data: this.bostonData
				},{
					name: 'New York temp', data: this.nycData
				}
			]
		};
		$('#chart').highcharts(config);
	};

	var plotcharts = new plotCharts();
	plotcharts.getHkData();
	plotcharts.getNycData();
	plotcharts.getBostonData();

})