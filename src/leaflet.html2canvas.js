if (typeof html2canvas === 'undefined') {
    console.error("Please include html2canvas before this script! https://html2canvas.hertzen.com/")
} else {
    const ICON_SVG_BASE64 =
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/PjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMyIDMyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMiAzMjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxnIGlkPSJjYW1lcmEiPjxwYXRoIHN0eWxlPSJmaWxsOiMwMTAwMDI7IiBkPSJNMTYsOS41MDFjLTQuNDE5LDAtOCwzLjU4MS04LDhjMCw0LjQxOCwzLjU4MSw4LDgsOGM0LjQxOCwwLDgtMy41ODIsOC04UzIwLjQxOCw5LjUwMSwxNiw5LjUwMXogTTIwLjU1NSwyMS40MDZjLTIuMTU2LDIuNTE2LTUuOTQzLDIuODA3LTguNDU5LDAuNjVjLTIuNTE3LTIuMTU2LTIuODA3LTUuOTQ0LTAuNjUtOC40NTljMi4xNTUtMi41MTcsNS45NDMtMi44MDcsOC40NTktMC42NUMyMi40MiwxNS4xMDIsMjIuNzExLDE4Ljg5MSwyMC41NTUsMjEuNDA2eiIvPjxwYXRoIHN0eWxlPSJmaWxsOiMwMTAwMDI7IiBkPSJNMTYsMTMuNTAxYy0yLjIwOSwwLTMuOTk5LDEuNzkxLTQsMy45OTl2MC4wMDJjMCwwLjI3NSwwLjIyNCwwLjUsMC41LDAuNXMwLjUtMC4yMjUsMC41LTAuNVYxNy41YzAuMDAxLTEuNjU2LDEuMzQzLTIuOTk5LDMtMi45OTljMC4yNzYsMCwwLjUtMC4yMjQsMC41LTAuNVMxNi4yNzYsMTMuNTAxLDE2LDEzLjUwMXoiLz48cGF0aCBzdHlsZT0iZmlsbDojMDEwMDAyOyIgZD0iTTI5LjQ5Miw4LjU0MmwtNC4zMzQtMC43MjNsLTEuMzczLTMuNDM0QzIzLjMyNiwzLjI0LDIyLjIzMiwyLjUsMjEsMi41SDExYy0xLjIzMiwwLTIuMzI2LDAuNzQtMi43ODYsMS44ODZMNi44NDIsNy44MTlMMi41MDksOC41NDJDMS4wNTUsOC43ODMsMCwxMC4wMjcsMCwxMS41djE1YzAsMS42NTQsMS4zNDYsMywzLDNoMjZjMS42NTQsMCwzLTEuMzQ2LDMtM3YtMTVDMzIsMTAuMDI3LDMwLjk0NSw4Ljc4MywyOS40OTIsOC41NDJ6IE0zMCwyNi41YzAsMC41NTMtMC40NDcsMS0xLDFIM2MtMC41NTMsMC0xLTAuNDQ3LTEtMXYtMTVjMC0wLjQ4OSwwLjM1NC0wLjkwNiwwLjgzNi0wLjk4Nkw4LjI4LDkuNjA3bDEuNzkxLTQuNDc4QzEwLjIyNCw0Ljc1LDEwLjU5MSw0LjUsMTEsNC41aDEwYzAuNDA4LDAsMC43NzUsMC4yNDksMC45MjgsMC42MjlsMS43OTEsNC40NzhsNS40NDUsMC45MDdDMjkuNjQ2LDEwLjU5NCwzMCwxMS4wMTEsMzAsMTEuNVYyNi41eiIvPjwvZz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PC9zdmc+";

    CanvasScreenshot = L.Control.extend({
        options: {
            hidden: false,
            position: "topleft",
            screenName: "screen",
            elementQuery: "#container",
            iconUrl: ICON_SVG_BASE64,
        },
        capture() {
            const capture = document.querySelector(this.options.elementQuery);
            const screenName = typeof this.options.screenName === 'function' ?
                this.options.screenName.call(this) :
                this.options.screenName
            html2canvas(capture, {
                    allowTaint: true,
                    useCORS: true,
                })
                .then((canvas) => {
                    document.body.appendChild(canvas);
                    canvas.style.display = "none";
                    return canvas;
                })
                .then((canvas) => {
                    const image = canvas
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream");
                    image.crossOrigin = "anonymous";
                    const a = document.createElement("a");
                    a.setAttribute("download", `${screenName}.png`);
                    a.setAttribute("href", image);
                    a.click();
                    canvas.remove();
                });
        },

        onAdd() {
            this._container = L.DomUtil.create(
                "div",
                "leaflet-control-simpleMapScreenshoter"
            );
            this._link = null;
            if (this.options.hidden === false) {
                this._addScreenBtn();
            }
            return this._container;
        },
        _addScreenBtn() {
            this._link = L.DomUtil.create(
                "a",
                "leaflet-control-simpleMapScreenshoter-btn",
                this._container
            );
            this._addCss();
            L.DomEvent.addListener(this._link, "click", this.capture, this);
            L.DomEvent.disableClickPropagation(this._link);
        },
        _addCss() {
            let css = `
.leaflet-control-simpleMapScreenshoter{
   border: 2px solid rgba(0,0,0,0.2);
   background-clip: padding-box;
}
.leaflet-control-simpleMapScreenshoter a{
   background-color: #fff;
   border-bottom: 1px solid #ccc;
   width: 30px;
   height: 30px;
   line-height: 30px;
   display: block;
   text-align: center;
   text-decoration: none;
   color: black;
   overflow: hidden;
   border-radius: 2px;
   background-image: url('${this.options.iconUrl}');
   background-position: 46% 41%;
   background-repeat: no-repeat;
   background-size: 63%;
}
.leaflet-control-simpleMapScreenshoter a:hover{
   cursor: pointer;
}
`;
            let head = document.head || document.getElementsByTagName("head")[0];
            let style = document.createElement("style");
            style.appendChild(document.createTextNode(css));
            head.appendChild(style);
        },
    });

    L.Control.html2canvas = CanvasScreenshot;
    L.html2canvas = function(options) {
        return new L.Control.html2canvas(options);
    };

}