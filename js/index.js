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

let overlays = {
	map: [
		{x: 0, y: 0},
		{x: 3987, y: 0},
		{x: 0, y: 2971},
		{x: 3987, y: 2971}
	],
	log: [
		{x: 500, y: 600},
		{x: 700, y: 800}
	],
	gordo: [
		{x: 900, y: 1000},
		{x: 1100, y: 1200}
	],
	key: [
		{x: 1300, y: 1400},
		{x: 1500, y: 1600}
	],
	gate: [
		{x: 1700, y: 1800},
		{x: 1900, y: 2000}
	],
	vault: [
		{x: 2100, y: 2200},
		{x: 2300, y: 2400}
	]
};

window.onerror = errHand
viewer.addHandler('open-failed', errHand)

viewer.addHandler('open', function() {
	
	function createMarker(marker, group) {
		let element = new Image(75, 75)
		marker.element = element;
		element.addEventListener('error', function() {errHand("Couldn't load a marker.")});
		if (!marker.gordoType)
		{
			element.setAttribute('src', assets[group])
		}
		else
		{
			element.setAttribute('src', assets.gordoTypes[marker.gordoType])
		}
		element.style.visibility = 'hidden'
		
		element.addEventListener('load', function() {
			viewer.addOverlay({
				element: element,
				location: viewer.viewport.imageToViewportCoordinates(new OpenSeadragon.Point(marker.x, marker.y)),
				placement: 'CENTER',
				checkResize: true
			});
		});
	}
	
	window.setVisibility = function(checkbox)
	{
		let group = overlays[checkbox.name]
		if (group) {
			group.forEach(function(item){
				item.element.style.visibility = checkbox.checked ? 'visible' : 'hidden';
			});
		}
	}
	
	_.forOwn(overlays, function(items, group) {
		_.forEach(items, function(item) {
			createMarker(item, group);
		});
	});
		
	_.forEach(document.getElementsByClassName('checkboxes'), window.setVisibility)
});
