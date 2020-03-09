import React from "react";
import ReactDOM from "react-dom";
import { Map, Popup, TileLayer, GeoJSON } from "react-leaflet";
import axios from "axios";
import GeoState from "../data/india_state.json";
import GeoDistrict from "../data/india_district.json";

import "./css/Geo.css";

export default class Geo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      type: "state",
      mapData: [],
      GeoJson: GeoState,
      center: [21.5937, 82.9629],
      zoom: 10
    };
    this.myRef = React.createRef();
    // this.geoJsonLayer = React.createRef();
  }
  // state = {
  //   type: "state",
  //   mapData: [],
  //   GeoJson: GeoState,
  //   center: [21.5937, 82.9629],
  //   zoom: 5
  // };

  extractGeo = async () => {
    var polygon = GeoDistrict.features;
    var geom = {
      type: "FeatureCollection",
      crs: {
        type: "name",
        properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" }
      },

      features: []
    };
    polygon.forEach(item => {
      if (item.properties.NAME_1.toLowerCase() === this.state.type) {
        // console.log(item);
        geom.features.push(item);
      }
    });
    await this.setState({ GeoJson: geom });
  };

  getCenter = async () => {
    var polygonCenter = require("geojson-polygon-center");
    // let index = GeoState.features.findIndex(
    //   x => x.properties.NAME_1 === this.state.type
    // );
    // let index = GeoState.features.findIndex((x, { properties }) => {
    //   console.log(x);
    // Object.entries(properties).forEach(([key, val]) => {
    //   console.log(key, "--->", val);
    // });
    //   if (x.properties.NAME_1 === this.state.type) return 1;
    //   return 10;
    // }, {});
    var polygon = GeoState.features;
    var geom;
    polygon.forEach((item, index) => {
      if (item.properties.NAME_1.toLowerCase() === this.state.type) {
        console.log(item);
        geom = item.geometry;
      }
    });
    console.log(geom);
    var center = polygonCenter(geom);
    console.log(center.coordinates);
    center.coordinates.reverse();
    await this.setState({ center: center.coordinates });
  };

  getValues = async () => {
    let check = this.state.type;
    let res, data;
    if (check === "state") {
      res = await axios.get("http://localhost:8000/api/tstate");
      data = res.data;
      await this.setState({ mapData: data });
      await this.setState({ GeoJson: GeoState, zoom: 5 });
    } else {
      console.log("else");
      res = await axios.get(`http://localhost:8000/api/dstate/${check}/`);
      data = res.data;
      console.log(this.myRef.current);
      let mountNode = ReactDOM.findDOMNode(this.myRef.current);
      let unmount = ReactDOM.unmountComponentAtNode(mountNode);
      console.log(unmount);
      await this.setState({ mapData: data });
      await this.setState({ zoom: 7 });
      this.extractGeo();
      this.getCenter();
    }
    console.log(this.state);
  };

  componentDidMount() {
    this.map = this.mapInstance.leafletElement;
    this.getValues();
  }

  async componentDidUpdate(nextProps) {
    const { type } = this.props;
    if (nextProps.type !== type) {
      if (type) {
        await this.setState({ type: type });
        this.getValues();
      }
    }
  }
  onMouseOut = e => {
    // console.log("onMouseOut", e.sourceTarget.feature.properties.NAME_1);
  };

  onMouseOver = e => {
    // console.log("onMouseOver", e.sourceTarget.feature.properties.NAME_1);
    return (
      <Popup>
        A pretty CSS3 popup.
        <br />
        Easily customizable.
      </Popup>
    );
  };

  style = feature => {
    // console.log(feature.properties.NAME_1);
    // console.log(this.state.mapData);
    console.log(this.state.mapData[feature.properties.NAME_1.toLowerCase()]);
    //   console.log([feature.properties.NAME_1.toLowerCase()]);
    // let fillColor = "grey";
    // if(this.props.mapData.(feature.properties.NAME_1))
    if (this.state.mapData[feature.properties.NAME_1.toLowerCase()] > 0)
      return { color: "white", fillColor: "blue" };
    else return { color: "white", fillColor: "red" };
  };

  render() {
    const position = this.state.center;
    return (
      <div ref={this.myRef}>
        <Map
          center={position}
          zoom={this.state.zoom}
          ref={e => {
            this.mapInstance = e;
          }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            accessToken="pk.eyJ1Ijoic2hyZXlhc2thcjMwIiwiYSI6ImNqc2Zpa3hlYzBzc2g0OW5zcGZlbzdmaWwifQ.7gGJckdf1KrSYdTinr4SdQ"
          />
          <GeoJSON
            key={this.state.type}
            data={this.state.GeoJson}
            onMouseOut={this.onMouseOut}
            onMouseOver={this.onMouseOver}
            style={this.style}
          />
        </Map>
      </div>
    );
  }
}
