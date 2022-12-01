(function ($) {
    "use strict";
    var markerIcon = {
        anchor: new google.maps.Point(12, 0),
        url: "images/marker3.svg",
        labelOrigin: new google.maps.Point(25, 20),
    };
    function mainMap() {
        function locationData(
            locationURL,
            locationImg,
            locationTitle,
            locationAddress,
            locationPrice,
            locationStarRating
        ) {
            return (
                '<div class="map-popup-wrap"><div class="map-popup"><div class="infoBox-close"><i class="far fa-times"></i></div><a href="' +
                locationURL +
                '" class="listing-img-content fl-wrap"><img src="' +
                locationImg +
                '" alt=""><span class="map-popup-location-price">' +
                locationPrice +
                '</span></a> <div class="listing-content fl-wrap"><div class="card-popup-raining map-card-rainting" data-staRrating="' +
                locationStarRating +
                '"></div><div class="listing-title fl-wrap"><h4><a href=' +
                locationURL +
                ">" +
                locationTitle +
                '</a></h4><span class="map-popup-location-info"><i class="fas fa-map-marker-alt"></i>' +
                locationAddress +
                "</span></div></div></div></div>"
            );
        }
        var locations = [
            [
                locationData(
                    "listing-single2.html",
                    "images/cars/car1.png",
                    "BMW Seria 3",
                    "Strada Teodor Mihali 58-60, Cluj-Napoca 400591",
                    "$ 35",
                    "5"
                ),
                46.77336800334197,
                23.62126681042156,
                0,
                markerIcon,
            ],
            [
                locationData(
                    "listing-single2.html",
                    "images/cars/car2.png",
                    "Dacia Logan",
                    "Strada Teodor Mihali 58-60, Cluj-Napoca 400591",
                    "$ 15",
                    "5"
                ),
                46.76971237916247,
                23.617462439232757,
                1,
                markerIcon,
            ],
            [
                locationData(
                    "listing-single2.html",
                    "images/cars/car3.png",
                    "Rolls Royce Ghost",
                    "Strada Teodor Mihali 58-60, Cluj-Napoca 400591",
                    "$ 100",
                    "5"
                ),
                46.77199414148495,
                23.62536959009357,
                2,
                markerIcon,
            ],
            [
                locationData(
                    "listing-single2.html",
                    "images/cars/car4.png",
                    "Mercedes Benz G63",
                    "Strada Teodor Mihali 58-60, Cluj-Napoca 400591",
                    "$ 150",
                    "5"
                ),
                46.77020722739304,
                23.629222820969904,
                3,
                markerIcon,
            ],
            [
                locationData(
                    "listing-single2.html",
                    "images/gal/masina1.png",
                    "Toyota Rav4",
                    "Strada Teodor Mihali 58-60, Cluj-Napoca 400591",
                    "$ 40",
                    "5"
                ),
                46.776639840703055,
                23.62023194903853,
                4,
                markerIcon,
            ],
        ];
        var map = new google.maps.Map(document.getElementById("map-main"), {
            zoom: 15,
            scrollwheel: false,
            center: new google.maps.LatLng(
                46.7735610788989,
                23.622680356044462
            ),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: false,
            mapTypeControl: false,
            scaleControl: false,
            panControl: false,
            fullscreenControl: true,
            navigationControl: false,
            streetViewControl: false,
            animation: google.maps.Animation.BOUNCE,
            gestureHandling: "cooperative",
            styles: [
                {
                    featureType: "poi.attraction",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "poi.business",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "poi.medical",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "poi.place_of_worship",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "poi.school",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
                {
                    featureType: "transit.station.bus",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
            ],
        });
        var boxText = document.createElement("div");
        boxText.className = "map-box";
        var currentInfobox;
        var boxOptions = {
            content: boxText,
            disableAutoPan: true,
            alignBottom: true,
            maxWidth: 0,
            pixelOffset: new google.maps.Size(-137, -25),
            zIndex: null,
            boxStyle: {
                width: "260px",
            },
            closeBoxMargin: "0",
            closeBoxURL: "",
            infoBoxClearance: new google.maps.Size(1, 1),
            isHidden: false,
            pane: "floatPane",
            enableEventPropagation: false,
        };

        var markerCluster, marker, i;
        var allMarkers = [];
        var clusterStyles = [
            {
                textColor: "white",
                url: "",
                height: 50,
                width: 50,
            },
        ];
        for (i = 0; i < locations.length; i++) {
            var labels = "123456789";
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(
                    locations[i][1],
                    locations[i][2]
                ),
                icon: locations[i][4],
                id: i,
                label: {
                    text: " ",
                    color: "#3AACED",
                    fontSize: "11px",
                    fontWeight: "bold",
                },
            });
            allMarkers.push(marker);
            var ib = new InfoBox();
            google.maps.event.addListener(ib, "domready", function () {
                cardRaining();
            });
            google.maps.event.addListener(
                marker,
                "click",
                (function (marker, i) {
                    return function () {
                        ib.setOptions(boxOptions);
                        boxText.innerHTML = locations[i][0];
                        ib.close();
                        ib.open(map, marker);
                        currentInfobox = marker.id;
                        var latLng = new google.maps.LatLng(
                            locations[i][1],
                            locations[i][2]
                        );
                        map.panTo(latLng);
                        map.panBy(0, -50);
                        google.maps.event.addListener(
                            ib,
                            "domready",
                            function () {
                                $(".infoBox-close").click(function (e) {
                                    e.preventDefault();
                                    ib.close();
                                });
                            }
                        );
                    };
                })(marker, i)
            );
        }
        var options2 = {
            imagePath: "images/",
            styles: clusterStyles,
            minClusterSize: 2,
        };
        markerCluster = new MarkerClusterer(map, allMarkers, options2);
        google.maps.event.addDomListener(window, "resize", function () {
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
        if ($(".controls-mapwn").length) {
            var input = document.getElementById("pac-input");
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.addListener("bounds_changed", function () {
                searchBox.setBounds(map.getBounds());
            });
            var markers = [];
            searchBox.addListener("places_changed", function () {
                var places = searchBox.getPlaces();

                if (places.length == 0) {
                    return;
                }
                markers.forEach(function (marker) {
                    marker.setMap(null);
                });
                markers = [];

                var bounds = new google.maps.LatLngBounds();
                places.forEach(function (place) {
                    if (!place.geometry) {
                        console.log("Returned place contains no geometry");
                        return;
                    }
                    var icon = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25),
                    };
                    markers.push(
                        new google.maps.Marker({
                            map: map,
                            icon: icon,
                            title: place.name,
                            position: place.geometry.location,
                        })
                    );

                    if (place.geometry.viewport) {
                        bounds.union(place.geometry.viewport);
                    } else {
                        bounds.extend(place.geometry.location);
                    }
                });
                map.fitBounds(bounds);
            });
        }
        $(".map-item").on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            var marker_index = parseInt($(this).attr("href").split("#")[1], 10);
            google.maps.event.trigger(allMarkers[marker_index], "click");
            if ($(window).width() > 1064) {
                if ($(".map-container").hasClass("fw-map")) {
                    $("html, body").animate(
                        {
                            scrollTop:
                                $(".map-container").offset().top + "-110px",
                        },
                        1000
                    );
                    return false;
                }
            }
        });
        $(".nextmap-nav").on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            var index = currentInfobox;
            if (index + 1 < allMarkers.length) {
                google.maps.event.trigger(allMarkers[index + 1], "click");
            } else {
                google.maps.event.trigger(allMarkers[0], "click");
            }
        });
        $(".prevmap-nav").on("click", function (e) {
            e.preventDefault();
            map.setZoom(15);
            if (typeof currentInfobox == "undefined") {
                google.maps.event.trigger(
                    allMarkers[allMarkers.length - 1],
                    "click"
                );
            } else {
                var index = currentInfobox;
                if (index - 1 < 0) {
                    google.maps.event.trigger(
                        allMarkers[allMarkers.length - 1],
                        "click"
                    );
                } else {
                    google.maps.event.trigger(allMarkers[index - 1], "click");
                }
            }
        });
        var zoomControlDiv = document.createElement("div");
        var zoomControl = new ZoomControl(zoomControlDiv, map);
        function ZoomControl(controlDiv, map) {
            zoomControlDiv.index = 1;
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(
                zoomControlDiv
            );
            controlDiv.style.padding = "5px";
            var controlWrapper = document.createElement("div");
            controlDiv.appendChild(controlWrapper);
            var zoomInButton = document.createElement("div");
            zoomInButton.className = "mapzoom-in";
            controlWrapper.appendChild(zoomInButton);
            var zoomOutButton = document.createElement("div");
            zoomOutButton.className = "mapzoom-out";
            controlWrapper.appendChild(zoomOutButton);
            google.maps.event.addDomListener(
                zoomInButton,
                "click",
                function () {
                    map.setZoom(map.getZoom() + 1);
                }
            );
            google.maps.event.addDomListener(
                zoomOutButton,
                "click",
                function () {
                    map.setZoom(map.getZoom() - 1);
                }
            );
        }
    }
    var map = document.getElementById("map-main");
    if (typeof map != "undefined" && map != null) {
        google.maps.event.addDomListener(window, "load", mainMap);
    }
})(this.jQuery);
