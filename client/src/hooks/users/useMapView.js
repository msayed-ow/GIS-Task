import { useEffect, useState, useCallback, useRef } from "react";

import MapView from '@arcgis/core/views/MapView';
import Map from '@arcgis/core/Map';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Point from '@arcgis/core/geometry/Point';
import FeatureEffect from "@arcgis/core/layers/support/FeatureEffect";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";
import { red } from '@mui/material/colors';

const USERS_LAYER_ID = "Users";

const useMapView = () => {

    const mapRef = useRef(null);
    const [mapView, setMapView] = useState(null);

    useEffect(() => {

        let map = new Map({
            basemap: "streets-vector"
        });

        const mapView = new MapView({
            map: map,
            zoom: 3,
            center: [48, 27],
            container: mapRef.current
        });

        mapView.when(view =>
            setMapView(view)
        );

    }, []);

    useEffect(() => {

        // FeatureLayer declaration

        let layer = new FeatureLayer({
            id: USERS_LAYER_ID,
            source: [],
            fields: [{
                name: "ObjectID",
                alias: "ObjectID",
                type: "oid"
            }, {
                name: "userID",
                alias: "userID",
                type: "integer"
            }],
            objectIdField: "ObjectID",
            geometryType: "point"
        });

        layer.renderer = {
            type: "simple",
            symbol: {
                type: "simple-marker",
                path: "M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 2c1.1 0 2 .9 2 2 0 1.11-.9 2-2 2s-2-.89-2-2c0-1.1.9-2 2-2zm0 10c-1.67 0-3.14-.85-4-2.15.02-1.32 2.67-2.05 4-2.05s3.98.73 4 2.05c-.86 1.3-2.33 2.15-4 2.15z",
                size: 24,
                color: red[800],
                outline: null
            }
        };

        mapView?.map?.add(layer);

    }, [mapView]);

    // const drawUsersOnMap = useCallback((users) => {

    //     let usersLayer = mapView.map.findLayerById(USERS_LAYER_ID);

    //     let features = users.map(user => {

    //         return {
    //             geometry: {
    //                 type: "point",
    //                 y: user.address.geo.lat,
    //                 x: user.address.geo.lng
    //             },
    //             attributes: {
    //                 userID: user.id
    //             }
    //         }
    //     });

    //     usersLayer.applyEdits({
    //         addFeatures: features
    //     })

    // }, [mapView]);

    const drawUsersOnMap = useCallback((users) => {

        let usersLayer = mapView.map.findLayerById(USERS_LAYER_ID);

        let addFeatures = users.map(user => {

            return {
                geometry: {
                    type: "point",
                    y: user.address.geo.lat,
                    x: user.address.geo.lng
                },
                attributes: {
                    userID: user.id
                }
            }
        });

        usersLayer.queryFeatures().then(response => {

            console.log("delete", response.features.length);
            console.log("add", addFeatures.length)

            usersLayer.applyEdits({
                addFeatures,
                deleteFeatures: response.features
            });
        });

    }, [mapView]);

    const selectUser = (id, lat, lng) => {

        let point = new Point({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
        })

        mapView?.goTo({
            target: point
        });

        applyFeatureEffect(id);
    }

    function applyFeatureEffect(userID) {

        let usersLayer = mapView.map.findLayerById(USERS_LAYER_ID);

        const featureFilter = new FeatureFilter({
            where: `userID = ${userID}`
        });

        usersLayer.featureEffect = new FeatureEffect({
            filter: featureFilter,
            excludedEffect: "grayscale(100%) opacity(70%)"
        });

    }

    return { mapRef, mapView, selectUser, drawUsersOnMap };
}

export default useMapView