let assets =
{
	map: './assets/map.png',
	log: './assets/log.png',
	gordo: './assets/gordo.png',
	key: './assets/key.png',
	gate: './assets/gate.png',
	vault: './assets/vault.png',
	gordoTypes:
	{
		
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
		//wrapHorizontal: true,
		//wrapVertical: true,
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
		//zoomPerSecond
		//showNavigationControl
		showNavigator:true,
		//navigatorSizeRatio
		navigatorAutoFade: true,
		navigatorBackground: '#FFFFFF44',
		navigatorOpacity: 1,
		controlsFadeDelay: 800,
		controlsFadeLength: 400,
		navigatorFadeDelay: 800,
		navigatorFadeLength: 400,
		//useCanvas
		//sequenceMode
		//preserveOverlays
		//showReferenceStrip
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
	log: //WIP
	[
		{x: 700, y: 800},
		{x: 500, y: 600}
	],
	gordo:
	[
		{x: 1892, y: 2592}, //gordoType: 'tabby'
		{x: 1284, y: 2589}, //gordoType: 'pink'
		{x: 2117, y: 2243}, //gordoType: 'pink'
		{x: 2001, y: 2055}, //gordoType: 'phosphor'
		{x: 2713, y: 2007}, //gordoType: 'rock'
		{x: 1858, y: 1996}, //gordoType: 'tabby'
		{x: 4406, y: 1979}, //gordoType: 'dervish'
		{x: 2823, y: 1883}, //gordoType: 'rad'
		{x: 4438, y: 1692}, //gordoType: 'tangle'
		{x: 1518, y: 1568}, //gordoType: 'honey'
		{x: 3046, y: 1558}, //gordoType: 'rock'
		{x: 4480, y: 1490}, //gordoType: 'mosaic'
		{x: 3089, y: 1007}, //gordoType: 'crystal'
		{x: 2365, y: 924}, //gordoType: 'boom'
		{x: 2638, y: 729}, //gordoType: 'quantum'
		{x: 1570, y: 711} //gordoType: 'hunter'
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
viewer.addHandler('open-failed', errHand)
viewer.addHandler('open', createOverlays)

function errHand()
{
	while (document.hasChildNodes())
	{
		document.removeChild(document.lastChild)
	}
	
	let data = JSON.stringify(JSON.decycle(arguments), undefined, "\n").replace(/\n+/g, "\n")
	let string = "Call the cops immediately!\nTell them this:\n" + data
	window.alert(string)
	console.log(string)
}

function createMarker(marker, group)
{
	let element = new Image(75, 75)
	element.style.opacity = 0.8
	element.addEventListener('error', function(){errHand("Couldn't load a marker.")})
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
