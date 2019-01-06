let assets =
{
	map: './assets/map.png',
	log: './assets/log.png',
	key: './assets/key.png',
	gate: './assets/gate.png',
	vault: './assets/vault.png',
	gordoTypes:
	{
		boom: './assets/gordo/boom_gordo.png',
		crystal: './assets/gordo/crystal_gordo.png',
		dervish: './assets/gordo/dervish_gordo.png',
		honey: './assets/gordo/honey_gordo.png',
		hunter: './assets/gordo/hunter_gordo.png',
		mosaic: './assets/gordo/mosaic_gordo.png',
		phosphor: './assets/gordo/phosphor_gordo.png',
		pink: './assets/gordo/pink_gordo.png',
		quantum: './assets/gordo/quantum_gordo.png',
		rad: './assets/gordo/rad_gordo.png',
		rock: './assets/gordo/rock_gordo.png',
		tabby: './assets/gordo/tabby_gordo.png',
		tangle: './assets/gordo/tangle_gordo.png'
	}
}

let gestureSettings =
{
	clickToZoom: false,
	dblClickToZoom: true
}

let viewer = new OpenSeadragon.Viewer
(
	{
		id: 'canvas',
		immediateRender: true,
		autoHideControls: true,
		maxZoomPixelRatio: 4,
		minZoomImageRatio: 0.1,
		visibilityRatio: 0,
		animationTime: 0.3,
		gestureSettingsMouse: gestureSettings,
		gestureSettingsTouch: gestureSettings,
		gestureSettingsPen: gestureSettings,
		gestureSettingsUnknown: gestureSettings,
		zoomPerClick: 4,
		zoomPerScroll: 1.6,
		showNavigator:true,
		navigatorAutoFade: true,
		navigatorBackground: '#FFFFFF44',
		navigatorOpacity: 1,
		controlsFadeDelay: 800,
		controlsFadeLength: 400,
		navigatorFadeDelay: 800,
		navigatorFadeLength: 400,
		tileSources:
		{
			type: 'image',
			url:  './assets/xmap.png',
			width: 6144,
			height: 3200
		}
	}
)

let overlays =
{
	map:
	[
		{x: 2151, y: 2080},
		{x: 2789, y: 1960},
		{x: 4393, y: 1648},
		{x: 2481, y: 1069}
	],
	log:
	[
		{x: 2153, y: 2954},
		{x: 1295, y: 2876},
		{x: 2641, y: 2818},
		{x: 2202, y: 2626},
		{x: 2676, y: 2481},
		{x: 1812, y: 2466},
		{x: 2425, y: 2278},
		{x: 2596, y: 2144},
		{x: 1811, y: 2058},
		{x: 3163, y: 2054},
		{x: 2223, y: 1964},
		{x: 4484, y: 1943},
		{x: 2500, y: 1929},
		{x: 4654, y: 1834},
		{x: 3013, y: 1826},
		{x: 2007, y: 1553},
		{x: 1797, y: 1545},
		{x: 4505, y: 1338},
		{x: 1392, y: 1277},
		{x: 4410, y: 1177},
		{x: 2423, y: 1156},
		{x: 3015, y: 1111},
		{x: 2314, y: 1085},
		{x: 1649, y: 1038},
		{x: 4347, y: 1022},
		{x: 4352, y: 934},
		{x: 4347, y: 820},
		{x: 2383, y: 792},
		{x: 4344, y: 722},
		{x: 2388, y: 341}
	],
	gordo:
	[
		{x: 1892, y: 2592, gordoType: 'tabby'},
		{x: 1284, y: 2589, gordoType: 'pink'},
		{x: 2117, y: 2243, gordoType: 'pink'},
		{x: 2001, y: 2055, gordoType: 'phosphor'},
		{x: 2713, y: 2007, gordoType: 'rock'},
		{x: 1858, y: 1996, gordoType: 'tabby'},
		{x: 4406, y: 1979, gordoType: 'dervish'},
		{x: 2823, y: 1883, gordoType: 'rad'},
		{x: 4438, y: 1692, gordoType: 'tangle'},
		{x: 1518, y: 1568, gordoType: 'honey'},
		{x: 3046, y: 1558, gordoType: 'rock'},
		{x: 4480, y: 1490, gordoType: 'mosaic'},
		{x: 3089, y: 1007, gordoType: 'crystal'},
		{x: 2365, y: 924, gordoType: 'boom'},
		{x: 2638, y: 729, gordoType: 'quantum'},
		{x: 1570, y: 711, gordoType: 'hunter'}
	],
	key:
	[
		{x: 1299, y: 2583},
		{x: 2121, y: 2230},
		{x: 1993, y: 2061},
		{x: 4407, y: 1949},
		{x: 2822, y: 1880},
		{x: 1526, y: 1560},
		{x: 4485, y: 1506},
		{x: 3067, y: 1024},
		{x: 2364, y: 922},
		{x: 2632, y: 716},
		{x: 1594, y: 709}
	],
	gate:
	[
		{x: 1833, y: 2225},
		{x: 2346, y: 1959},
		{x: 4693, y: 1746},
		{x: 2002, y: 1695},
		{x: 4356, y: 1648},
		{x: 2372, y: 1598},
		{x: 2245, y: 1512},
		{x: 2404, y: 515}
	],
	vault:
	[
		{x: 1394, y: 2680},
		{x: 3140, y: 916},
		{x: 1838, y: 757}
	]
}

window.onerror = errHand
viewer.addHandler('open-failed', function(){throw new Error("Viewer couldn't initialize.")})
viewer.addHandler('open', initialize)

function errHand(msg, url, line, col, error)
{
	while (document.hasChildNodes())
	{
		document.removeChild(document.lastChild)
	}
	let string = "Call the cops immediately!\ngness.na@gmail.com\nTell them this:\n" + msg + "\n" + url + ':' + line + ":" + col + "\n" + error.stack
	window.alert(string)
	console.log(string)
}

function createMarker(marker, group)
{
	let element = new Image()
	element.style.opacity = 0.75
	element.addEventListener('error', function(){throw new Error("Couldn't load a marker.")})
	marker.element = element
	if (!marker.gordoType)
	{
		element.setAttribute('src', assets[group])
	}
	else
	{
		element.setAttribute('src', assets.gordoTypes[marker.gordoType])
	}
	element.style.visibility = 'hidden'
	
	element.addEventListener('load', function()
	{
		viewer.addOverlay(
		{
			element: marker.element,
			location: viewer.viewport.imageToViewportCoordinates(new OpenSeadragon.Point(marker.x, marker.y)),
			placement: 'CENTER',
			checkResize: true
		})
	})
}

function setVisibility(checkbox)
{
	let group = overlays[checkbox.name]
	if (group)
	{
		group.forEach(function(item)
		{
			item.element.style.visibility = checkbox.checked ? 'visible' : 'hidden'
		})
	}
}

function initialize()
{
	document.getElementsByClassName('openseadragon-container')[0].style.setProperty('background-color', '#00000000')
	createOverlays()
}

function createOverlays()
{
	_.forOwn(overlays, function(items, group)
{
	_.forEach(items, function(item)
	{
		createMarker(item, group)
	})
})
	
_.forEach(document.getElementsByClassName('checkboxes'), window.setVisibility)
}
