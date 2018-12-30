```JS
JSON.stringify(viewer.currentOverlays.map(function(currentOverlay){return currentOverlay.location}), undefined, "\n").replace(/\n+/g, "\n")```
http://openseadragon.github.io/docs/OpenSeadragon.Point.html
http://openseadragon.github.io/docs/OpenSeadragon.Viewport.html#imageToViewerElementCoordinates
http://openseadragon.github.io/docs/OpenSeadragon.html#.Options
http://openseadragon.github.io/docs/OpenSeadragon.Viewer.html#open

Reported Issues:  

* TypeError: overlays is undefined @/js/index.js:137:6

Interpolation methods:  

* imageToViewerElementCoordinates  
* imageToViewportCoordinates  
* imageToViewportZoom  
* imageToWindowCoordinates  
* viewerElementToImageCoordinates  
* viewerElementToViewportCoordinates  
* viewportToImageCoordinates  
* viewportToImageZoom  
* viewportToViewerElementCoordinates  
* viewportToWindowCoordinates  
* windowToImageCoordinates  
* windowToViewportCoordinates  
* pixelFromPoint  
* pixelFromPointNoRotate  
* pointFromPixel  
* pointFromPixelNoRotate  

=>  

* imageToViewportCoordinates  
* viewerElementToViewportCoordinates  
* windowToViewportCoordinates  
* pointFromPixel  

```JS
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
return y};```