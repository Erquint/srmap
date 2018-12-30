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
			width: 3987,
			height: 2971
		}
	}
)

window.onerror = errHand
viewer.addHandler('open-failed', errHand)

viewer.addHandler('open', function()
	{
		createMarkers(undefined, undefined, undefined, false)
		Array.from(document.getElementsByClassName('checkboxes')).forEach(setVisibility)
	})

let overlays =
{
	maps:
	[
			{asset: 'map', posistion: [0, 0]},
			{asset: 'map', posistion: [3987, 0]},
			{asset: 'map', posistion: [0, 2971]},
			{asset: 'map', posistion: [3987, 2971]}
	],
	logs:
	[
			{asset: 'log', posistion: [500, 600]},
			{asset: 'log', posistion: [700, 800]}
	],
	gordos:
	[
			{asset: 'gordo', posistion: [900, 1000]},
			{asset: 'gordo', posistion: [1100, 1200]}
	],
	keys:
	[
			{asset: 'key', posistion: [1300, 1400]},
			{asset: 'key', posistion: [1500, 1600]}
	],
	gates:
	[
			{asset: 'gate', posistion: [1700, 1800]},
			{asset: 'gate', posistion: [1900, 2000]}
	],
	vaults:
	[
			{asset: 'vault', posistion: [2100, 2200]},
			{asset: 'vault', posistion: [2300, 2400]}
	]
}

function createOverlays(overlays) //Check scope.
{
	Object.entries(overlays).map(function(key, index)
	{
		myObject[key] *= 2
	})
	overlays = overlays.map(createMarkers)
}

/*
Object.keys(myObject).map(function(key, index)
{
	myObject[key] *= 2
})
overlays = overlays.map(createMarkers)
*/

function createMarkers(markers)
{
	let element = new Image(75, 75)
	element.setAttribute('onerror', "errHand(\"Couldn't load a marker.\")")
	if (!gordoType)
	{
		element.setAttribute('src', assets[kind])
	}
	else
	{
		element.setAttribute('src', assets.gordoTypes[gordoType])
	}
	element.style.visibility = 'hidden'
	let overlayData =
	{
		element: element,
		location: viewer.viewport.imageToViewportCoordinates(new OpenSeadragon.Point(pos[0], pos[1])),
		placement: 'CENTER',
		checkResize: true
	}
	viewer.addOverlay(overlayData)
	return element
	
	return 
}

function setVisibility(element)
{
	if (!overlays[element.name])
	{
		errHand()
		return false
	}
	let group = overlays[element.name]
	if (element.checked)
	{
		group.forEach(function(item){item.style.visibility = 'visible'})
	}
	else
	{
		group.forEach(function(item){item.style.visibility = 'hidden'})
	}
	return true
}

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
