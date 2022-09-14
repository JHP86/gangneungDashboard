// const { Chart } = require("chart.js");

let bldChart = null;
let bldChartTwo = null;
let roadChartNain = null;
let roadChartNach = null;

// const { Chart } = require("chart.js");

const bounds = [
	[128.780817, 37.672999], // Southwest coordinates
	[128.995380, 37.839961], // Northeast coordinates
];

// Basemap config
mapboxgl.accessToken =
	"pk.eyJ1IjoibWltLWluc3RpdHV0ZSIsImEiOiJjbDV3MzVib24wYnN4M2VydGx5MDV5OGZ0In0.oRjIg9kkz19u7FHFTt8kMw";
const map = new mapboxgl.Map({
	container: "map",
	style: "mapbox://styles/mim-institute/cl5w389nr001x15p1y83qz6nm",
	center: [128.903449, 37.761082],
	zoom: 12,
	maxZoom: 22,
	minZoom: 12,
	antialias: true,
	maxBounds: bounds,
	clickTolerence: -200,
});

// Disable map rotation with mouse rmb and touch
map.dragRotate.disable();
map.touchZoomRotate.disableRotation();

map.on("load", () => {
	map.addSource("BufferHL", {
		type: "vector",
		url: "mapbox://mim-institute.5i8c18vx",
	});

	map.addLayer({
		id: "BufferHL",
		type: "fill",
		source: "BufferHL",
		"source-layer": "BUFFER-2lwhab",
		layout: {
			visibility: "visible",
		},
		paint: {
			"fill-color": "#cccccc",
			"fill-opacity": 0.95,
		},
		filter: ['in', 'id', '']
	});
});

// Original Buffer
map.on("load", function() {
	const layers = map.getStyle().layers;

	let labelLayerId;
	for (let i = 0; i < layers.length; i++) {
		labelLayerId = layers[i].id;
		break;
	}
	map.addSource("buffer", {
		type: "vector",
		url: "mapbox://mim-institute.4h4rr5eq",
	});

	map.addLayer({
		id: "Buffer",
		type: "fill",
		source: "buffer",
		"source-layer": "BUFFER_E-2nddjz",
		layout: {
			visibility: "visible",
		},
		paint: {
			"fill-color": "#cccccc",
			"fill-opacity": 0.15,
		},
	});
})

map.on("mousemove", "Buffer", (e) => {
	map.getCanvas().style.cursor = "pointer";
	const feature = e.features[0];

	map.setFilter('BufferHL', [
		'in',
		'id',
		feature.properties.id
	]);
});

map.on("mouseleave", "Buffer", () => {
	map.getCanvas().style.cursor = " ";
	map.setFilter('BufferHL', ['in', 'id', '']);
});

map.on(
	"click",
	"Buffer",
	(e) => {
		const bldres = e.features[0].properties.BLDRES;
		const bldfacil = e.features[0].properties.BLDFACIL;
		const bldserv = e.features[0].properties.BLDSERV;
		const bldedu = e.features[0].properties.BLDEDU;
		const bldother = e.features[0].properties.BLDOTHER;
		const intco = e.features[0].properties.INT_CO;
		const pedxco = e.features[0].properties.PEDX_CO;
		const sclznco = e.features[0].properties.SCLZN_CO;
		const nainavg = e.features[0].properties.NAINAVG;
		const nachavg = e.features[0].properties.NACHAVG;

		document.getElementById("info_int_co").innerHTML = intco;
		document.getElementById("info_pedx_co").innerHTML = pedxco;
		document.getElementById("info_sclzn_co").innerHTML = sclznco;
		// document.getElementById("nainavg").innerHTML = nainavg;
		// document.getElementById("nachavg").innerHTML = nachavg;

		window.onload = function() {
			load();
		};

		const ctx = document.getElementById("chartbld");

		if (bldChart != null) bldChart.destroy();

		bldChart = new Chart(ctx, {
			type: "doughnut",
			data: {
				labels: ["주거", "근린", "판매영업", "교육복지", "기타"],
				options: {
					responsive: true,
					maintainAspectRatio: true,
					plugins: {
						legend: {
							labels: {
								font: {
									weight: 'bold'
								}
							}
						}
					},
				},
				datasets: [{
					data: [
						[bldres],
						[bldfacil],
						[bldserv],
						[bldedu],
						[bldother]
					],
					borderWidth: 2,
					cutout: "45%",
					radius: '70%',
					hoverOffset: 25,
					backgroundColor: ["#CF4F4F", "#DF7649", "#BDE7F4", "#A3D393", "#8d8d8d"],
					borderColor: ["#CF4F4F", "#DF7649", "#BDE7F4", "#A3D393", "#8d8d8d"],
				}, ],
			},
		})

		const ctx2 = document.getElementById("chartblddetail");

		if (bldChartTwo != null) bldChartTwo.destroy();

		bldChartTwo = new Chart(ctx2, {
			type: "bar",
			options: {
				indexAxis: 'y',
				plugins: {
					legend: {
						display: false
					},
					datalabels: {
						display: false
					},
				},
			},
			data: {
				labels: ["주거", "근린", "판매영업", "교육복지", "기타"],
				datasets: [{
					data: [
						[bldres],
						[bldfacil],
						[bldserv],
						[bldedu],
						[bldother]
					],
					axis: 'y',
					fill: false,
					backgroundColor: ["#CF4F4F", "#DF7649", "#BDE7F4", "#A3D393", "#8d8d8d"],
					borderColor: ["#CF4F4F", "#DF7649", "#BDE7F4", "#A3D393", "#8d8d8d"],
					borderWidth: 2,
					barThickness: '20'
				}]
			}
		})

    // road nain chart
		const ctx3 = document.getElementById("chartroadnain");

		if (roadChartNain != null) roadChartNain.destroy();

		roadChartNain = new Chart(ctx3, {
			type: "doughnut",
			plugins: [{
				afterDraw: chart => {
					var needleValue = chart.config.data.datasets[0].needleValue;
					var dataTotal = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
					var angle = Math.PI + (1 / dataTotal * needleValue * Math.PI);
					var ctx = chart.ctx;
					var cw = chart.canvas.offsetWidth;
					var ch = chart.canvas.offsetHeight;
					var cx = cw / 2;
					var cy = ch - 6;

					ctx.translate(cx, cy);
					ctx.rotate(angle);
					ctx.beginPath();
					ctx.moveTo(0, -3);
					ctx.lineTo(ch - 20, 0);
					ctx.lineTo(0, 3);
					ctx.fillStyle = 'rgb(0, 0, 0)';
					ctx.fill();
					ctx.rotate(-angle);
					ctx.translate(-cx, -cy);
					ctx.beginPath();
					ctx.arc(cx, cy, 5, 0, Math.PI * 2);
					ctx.fill();
				}
			}],
			data: {
				labels: [],
				datasets: [{
					data: [0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06],
					needleValue: nainavg,
					backgroundColor: [
						"#577590",
						"#4d908e",
						"#43aa8b",
						"#90be6d",
						"#f9c74f",
						"#f8961e",
						"#f9844a",
						"#f3722c",
						"#f94144"
					]
				}]
			},
			options: {
				responsive: true,
				aspectRatio: 2,
				rotation: -90,
				cutout: "50%",
				circumference: 180,
				legend: {
					display: false,
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}
		})

    // road nach chart
		const ctx4 = document.getElementById("chartroadnach");

		if (roadChartNach != null) roadChartNach.destroy();

		roadChartNach = new Chart(ctx4, {
			type: "doughnut",
			plugins: [{
				afterDraw: chart => {
					var needleValue = chart.config.data.datasets[0].needleValue;
					var dataTotal = chart.config.data.datasets[0].data.reduce((a, b) => a + b, 0);
					var angle = Math.PI + (1 / dataTotal * needleValue * Math.PI);
					var ctx = chart.ctx;
					var cw = chart.canvas.offsetWidth;
					var ch = chart.canvas.offsetHeight;
					var cx = cw / 2;
					var cy = ch - 6;

					ctx.translate(cx, cy);
					ctx.rotate(angle);
					ctx.beginPath();
					ctx.moveTo(0, -3);
					ctx.lineTo(ch - 20, 0);
					ctx.lineTo(0, 3);
					ctx.fillStyle = 'rgb(0, 0, 0)';
					ctx.fill();
					ctx.rotate(-angle);
					ctx.translate(-cx, -cy);
					ctx.beginPath();
					ctx.arc(cx, cy, 5, 0, Math.PI * 2);
					ctx.fill();
				}
			}],
			data: {
				labels: [],
				datasets: [{
					data: [0.156, 0.156, 0.156, 0.156, 0.156, 0.156, 0.156, 0.156, 0.156],
					needleValue: nachavg,
					backgroundColor: [
						"#577590",
						"#4d908e",
						"#43aa8b",
						"#90be6d",
						"#f9c74f",
						"#f8961e",
						"#f9844a",
						"#f3722c",
						"#f94144"
					]
				}]
			},
			options: {
				responsive: true,
				aspectRatio: 2,
				rotation: -90,
				cutout: "50%",
				circumference: 180,
				legend: {
					display: false,
				},
				animation: {
					animateRotate: false,
					animateScale: true
				}
			}
		})
	});

// building polygon data
map.on("load", () => {
	map.addSource("building", {
		type: "vector",
		url: "mapbox://mim-institute.awmx9oje",
	});
	map.addLayer({
		id: "Building",
		type: "fill",
		source: "building",
		"source-layer": "BUILDING-7j9thc",
		layout: {
			visibility: "visible",
		},
		minzoom: 12,
		paint: {
			"fill-color": [
				"match",
				["get", "BDCODE"],
				"01",
				"#CF4F4F",
				"02",
				"#CF4F4F",
				"03",
				"#DF7649",
				"04",
				"#DF7649",
				"05",
				"#8D8D8D",
				"06",
				"#BDE7F4",
				"07",
				"#8D8D8D",
				"08",
				"#A3D393",
				"09",
				"#8D8D8D",
				"10",
				"#8D8D8D",
				"11",
				"#8D8D8D",
				"12",
				"#8D8D8D",
				"13",
				"#8D8D8D",
				"14",
				"#8D8D8D",
				"15",
				"#8D8D8D",
				"16",
				"#8D8D8D",
				"17",
				"#8D8D8D",
				"18",
				"#8D8D8D",
				"19",
				"#8D8D8D",
				"20",
				"#8D8D8D",
				"21",
				"#8D8D8D",
				"#8D8D8D",
				// "01",
				// "#fee6c2",
				// "02",
				// "#c08484",
				// "03",
				// "#f7412a",
				// "04",
				// "#f7412a",
				// "05",
				// "#f7412a",
				// "06",
				// "#f6b112",
				// "07",
				// "#67e785",
				// "08",
				// "#dd6f8a",
				// "09",
				// "#33a02c",
				// "10",
				// "#ccccc1",
				// "11",
				// "#ed83b8",
				// "12",
				// "#f7412a",
				// "13",
				// "#f7f966",
				// "14",
				// "#f7f966",
				// "15",
				// "#f7f966",
				// "16",
				// "#f7f966",
				// "17",
				// "#9ff2ff",
				// "18",
				// "#9ff2ff",
				// "19",
				// "#009874",
				// "20",
				// "#0a4f40",
				// "21",
				// "#f6b112",
				// "#8D8D8D",
			],
			"fill-opacity": 0.85,
		},
	});
});

// pedx polygon data
map.on("load", () => {
	map.addSource("pedx", {
		type: "vector",
		url: "mapbox://mim-institute.6xbo06os",
	});
	map.addLayer({
		id: "Pedestrian Crossing",
		type: "fill",
		source: "pedx",
		"source-layer": "PEDX-1gf1sk",
		layout: {
			visibility: "visible",
		},
		minzoom: 12,
		paint: {
			"fill-color": "#34495E",
			"fill-opacity": 0.75,
		},
	});
});

// schoolzone polygon data
map.on("load", () => {
	map.addSource("schoolzone", {
		type: "vector",
		url: "mapbox://mim-institute.9dir7dpo",
	});
	map.addLayer({
		id: "School Zone",
		type: "fill",
		source: "schoolzone",
		"source-layer": "SCHOOLZONE-cbdfuu",
		layout: {
			visibility: "visible",
		},
		minzoom: 12,
		paint: {
			"fill-color": "#dfed15",
			"fill-opacity": 0.85,
		},
	});
});

// bus stop point data
map.on("load", () => {
	map.loadImage("/images/busstopiconblue.png", (error, image) => {
		if (error) throw (error);
		map.addImage("busstopicon", image);
	})
	map.addSource("busstop", {
		type: "vector",
		url: "mapbox://mim-institute.6bweqps9",
	});

	map.addLayer({
		id: "Bus Stop",
		type: "symbol",
		source: "busstop",
		"source-layer": "BUSSTOP-7im883",
		minzoom: 12,
		layout: {
			visibility: "visible",
			"icon-image": "busstopicon",
			"icon-size": {
				base: 0,
				stops: [
					[12, 0.04],
					[15, 0.055],
					[17, 0.085],
				]
			}
		},
	});
});

map.on("load", () => {
	map.addSource("road", {
		type: "vector",
		url: "mapbox://mim-institute.bjralxjy",
	});
	map.addLayer({
		id: "Road Analysis",
		type: "line",
		source: "road",
		"source-layer": "ROADANALYSIS-61v534",
		layout: {
			visibility: "visible",
		},
		minzoom: 14,
		paint: {
			"line-color": [
				"step",
				["get", "AI__NAIN"],
				"#277da1",
				0.16,
				"#577590",
				0.235,
				"#4d908e",
				0.282,
				"#43aa8b",
				0.321,
				"#90be6d",
				0.358,
				"#f9c74f",
				0.395,
				"#f9844a",
				0.433,
				"#f8961e",
				0.474,
				"#f3722c",
				0.546,
				"#f94144",
			],
			"line-opacity": 1,
			"line-width": {
				base: 0,
				stops: [
					[14, 0.5],
					[15, 0.75],
					[17, 1.25],
				],
			},
		},
	});
});

// After the last frame rendered before the map enters an "idle" state.
map.on("idle", () => {
	if (
		!map.getLayer("Building") ||
		!map.getLayer("Road Analysis") ||
		!map.getLayer("Road Width") ||
		!map.getLayer("Bus Stop") ||
		!map.getLayer("Land Value") ||
		!map.getLayer("Land Use") ||
		!map.getLayer("Pedestrian Crossing") ||
		!map.getLayer("School Zone") ||
		!map.getLayer("Overpass")
	) {
		return;
	}

	// Enumerate ids of the layers.
	const toggleableLayerIds = ["Building", "Road Analysis", "Bus Stop", "Pedestrian Crossing", "School Zone"];

	for (const id of toggleableLayerIds) {
		if (document.getElementById(id)) {
			continue;
		}

		const link = document.createElement("a");
		link.id = id;
		link.href = "#";
		link.textContent = id;
		link.className = "active";

		link.onclick = function(e) {
			const clickedLayer = this.textContent;
			e.preventDefault();
			e.stopPropagation();

			const visibility = map.getLayoutProperty(clickedLayer, "visibility");

			if (visibility === "visible") {
				map.setLayoutProperty(clickedLayer, "visibility", "none");
				this.className = "";
			} else {
				this.className = "active";
				map.setLayoutProperty(clickedLayer, "visibility", "visible");
			}
		};

		const layers = document.getElementById("menu");
		layers.appendChild(link);
	}
});