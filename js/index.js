window.onerror = errHand

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
			width: 3987, //problem, officer
			height: 2971
		}
	}
)

viewer.addHandler('open-failed', errHand)
viewer.addHandler('open', function(){Array.from(document.getElementsByClassName('checkboxes')).forEach(setVisibility)})

let overlays =
{
	maps:
	[
			createMarker('map', [0, 0]),
			createMarker('map', [3987, 0]),
			createMarker('map', [0, 2971]),
			createMarker('map', [3987, 2971])
	],
	logs:
	[
			createMarker('log', [500, 600]),
			createMarker('log', [700, 800])
	],
	gordos:
	[
			createMarker('gordo', [900, 1000]),
			createMarker('gordo', [1100, 1200])
	],
	keys:
	[
			createMarker('key', [1300, 1400]),
			createMarker('key', [1500, 1600])
	],
	gates:
	[
			createMarker('gate', [1700, 1800]),
			createMarker('gate', [1900, 2000])
	],
	vaults:
	[
			createMarker('vault', [2100, 2200]),
			createMarker('vault', [2300, 2400])
	]
}

function createMarker(kind, pos, gordoType)
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

//JSON.stringify(viewer.currentOverlays.map(function(currentOverlay){return currentOverlay.location}), undefined, "\n").replace(/\n+/g, "\n")
//http://openseadragon.github.io/docs/OpenSeadragon.Point.html
//http://openseadragon.github.io/docs/OpenSeadragon.Viewport.html#imageToViewerElementCoordinates
//http://openseadragon.github.io/docs/OpenSeadragon.html#.Options
//http://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#open

/*
function kek (){point = new OpenSeadragon.Point(3987/2,2971/2);
x = [viewer.viewport.imageToViewerElementCoordinates(point),
viewer.viewport.imageToViewportCoordinates(point),
viewer.viewport.imageToViewportZoom(point),
viewer.viewport.imageToWindowCoordinates(point),
viewer.viewport.viewerElementToImageCoordinates(point),
viewer.viewport.viewerElementToViewportCoordinates(point),
viewer.viewport.viewportToImageCoordinates(point),
viewer.viewport.viewportToImageZoom(point),
viewer.viewport.viewportToViewerElementCoordinates(point),
viewer.viewport.viewportToWindowCoordinates(point),
viewer.viewport.windowToImageCoordinates(point),
viewer.viewport.windowToViewportCoordinates(point),
viewer.viewport.pixelFromPoint(point),
viewer.viewport.pixelFromPointNoRotate(point),
viewer.viewport.pointFromPixel(point),
viewer.viewport.pointFromPixelNoRotate(point)];
y = x.map(function(item){if ((Math.abs(item.x) < 100) && (Math.abs(item.y) < 100)){return item}});
return y};

//imageToViewerElementCoordinates
imageToViewportCoordinates
//imageToViewportZoom
//imageToWindowCoordinates
//viewerElementToImageCoordinates
viewerElementToViewportCoordinates
//viewportToImageCoordinates
//viewportToImageZoom
//viewportToViewerElementCoordinates
//viewportToWindowCoordinates
//windowToImageCoordinates
windowToViewportCoordinates
//pixelFromPoint
//pixelFromPointNoRotate
pointFromPixel
pointFromPixelNoRotate

imageToViewportCoordinates
viewerElementToViewportCoordinates
windowToViewportCoordinates
pointFromPixel
*/
