import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const styles = {
    height: "90%",
    width: "100%",
};

export class MapContainer extends Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoomControl={false}
                scaleControl={false}
                streetViewControl={true}
                panControl={true}
                rotateControl={true}
                fullscreenControl={true}
                zoom={15}
                containerStyle={styles}
                initialCenter={{
                    lat: this.props.lat,
                    lng: this.props.lon,
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDG3h3ZR0cKQRVYiEA6upxhUSvCy483mJY",
})(MapContainer);