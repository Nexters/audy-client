import { MarkerType } from '@/types';

export class ClusterModule {
    markers: MarkerType[] = [];
    clusterMarker: typeof window.Tmapv3.Marker;
    lat = 0;
    lng = 0;

    addMarker(marker: MarkerType) {
        this.markers.push(marker);
        this.lat += parseFloat(marker.latitude);
        this.lng += parseFloat(marker.longitude);
    }

    getCenter() {
        return {
            lat: this.lat / this.markers.length,
            lng: this.lng / this.markers.length,
        };
    }

    getSize() {
        return this.markers.length;
    }
}
