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

// boundary polygon data
map.on("load", () => {
  map.addSource("boundary", {
    type: "vector",
    url: "mapbox://mim-institute.0xsvpqf0",
  });
  map.addLayer({
    id: "boundary",
    type: "fill",
    source: "boundary",
    "source-layer": "BOUNDARY-44g3cw",
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-color": "#FFFFFF",
      "fill-opacity": 0.8,
    },
  });
});

// 400m buffer polygon data
map.on("load", () => {
  map.addSource("buffer", {
    type: "vector",
    url: "mapbox://mim-institute.5i8c18vx",
  });
  map.addLayer({
    id: "Buffer",
    type: "fill",
    source: "buffer",
    "source-layer": "BUFFER-2lwhab",
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-color": "#cccccc",
      "fill-opacity": 0.8,
    },
  });
});

// roadwidth polygon data
map.on("load", () => {
  map.addSource("roadwidth", {
    type: "vector",
    url: "mapbox://mim-institute.3asjji30",
  });
  map.addLayer({
    id: "Road Width",
    type: "fill",
    source: "roadwidth",
    "source-layer": "ROADWIDTH-8sk7o7",
    layout: {
      visibility: "none",
    },
    paint: {
      "fill-color": "#7d7d7d",
      "fill-opacity": 0.8,
    },
  });
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
          "#fee6c2",
          "02",
          "#c08484",
          "03",
          "#f7412a",
          "04",
          "#f7412a",
          "05",
          "#f7412a",
          "06",
          "#f6b112",
          "07",
          "#67e785",
          "08",
          "#dd6f8a",
          "09",
          "#33a02c",
          "10",
          "#ccccc1",
          "11",
          "#ed83b8",
          "12",
          "#f7412a",
          "13",
          "#f7f966",
          "14",
          "#f7f966",
          "15",
          "#f7f966",
          "16",
          "#f7f966",
          "17",
          "#9ff2ff",
          "18",
          "#9ff2ff",
          "19",
          "#009874",
          "20",
          "#0a4f40",
          "21",
          "#f6b112",
          "#8D8D8D",
        ],
        "fill-opacity": 0.85,
      },
    });
  });

// road line data
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
      visibility: "none",
    },
    minzoom: 12,
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
          [14, 1],
          [15, 2],
          [17, 3],
        ],
      },
    },
  });
});

// landval grid polygon data
map.on("load", () => {
  map.addSource("landval", {
    type: "vector",
    url: "mapbox://mim-institute.4uofkc9q",
  });
  map.addLayer({
    id: "Land Value",
    type: "fill",
    source: "landval",
    "source-layer": "LANDVALUE-d7cxuu",
    layout: {
      visibility: "none",
    },
    minzoom: 12,
    maxzoom: 14,
    paint: {
      "fill-color": [
        "step",
        ["get", "A9_mean"],
        "#ffffff",
        15681,
        "#f6cacc",
        24151,
        "#f1a7a9",
        33543,
        "#ec8385",
        45045,
        "#e66063",
        54850,
        "#e35053",
        77957,
        "#dd2c2f",
        120431,
        "#d02224",
        194967,
        "#bd1f21",
        315900,
        "#ac1c1e",
        3994185,
        "#9c191b",
      ],
      "fill-opacity": 0.25,
    },
  });
});

// landuse polygon data
map.on("load", () => {
  map.addSource("landuse", {
    type: "vector",
    url: "mapbox://mim-institute.ayoi9838",
  });
  map.addLayer({
    id: "Land Use",
    type: "fill",
    source: "landuse",
    "source-layer": "LANDUSE-d51g2b",
    layout: {
      visibility: "none",
    },
    // minzoom: 12,
    paint: {
      "fill-color": [
        "match",
        ["get", "L1_CODE"],
        "100",
        "#ff0000",
        "200",
        "#eee907",
        "300",
        "#2a4b2d",
        "400",
        "#399926",
        "500",
        "#7c227e",
        "600",
        "#59ceca",
        "700",
        "#0602fa",
        "#cccccc"
      ],
      "fill-opacity": 0.75,
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
      visibility: "none",
    },
    minzoom: 12,
    paint: {
      "fill-color": "#34495E",
      "fill-opacity": 0.75,
    },
  });
});

// safetyzone polygon data
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
      visibility: "none",
    },
    minzoom: 12,
    paint: {
      "fill-color": "#FDDA0D",
      "fill-opacity": 0.6,
    },
  });
});

// overpass polygon data
map.on("load", () => {
  map.addSource("overpass", {
    type: "vector",
    url: "mapbox://mim-institute.711gsu1p",
  });
  map.addLayer({
    id: "Overpass",
    type: "fill",
    source: "overpass",
    "source-layer": "OVERPASS-5jdicc",
    layout: {
      visibility: "none",
    },
    minzoom: 12,
    paint: {
      "fill-color": "#8d8d8d",
      "fill-opacity": 0.6,
    },
  });
});

// bus stop point data
map.on("load", () => {
  map.loadImage("/images/busstopicon.png", (error, image) => {
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
        visibility: "none",
        "icon-image": "busstopicon",
        "icon-size": {
          base: 0,
          stops: [
            [12, 0.03],
            [15, 0.035],
            [17, 0.07],
          ]
        }
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
  const toggleableLayerIds = ["Building", "Road Analysis", "Road Width", "Bus Stop", "Land Value", "Land Use", "Pedestrian Crossing", "School Zone", "Overpass"];

  for (const id of toggleableLayerIds) {
    if (document.getElementById(id)) {
      continue;
    }

    const link = document.createElement("a");
    link.id = id;
    link.href = "#";
    link.textContent = id;
    link.className = "active";

    link.onclick = function (e) {
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
