import { MarkerType } from '@/types';

export class ClusterModule {
    markers: MarkerType[] = [];
    clusterMarker: typeof window.Tmapv3.Marker;
    lat = 0;
    lng = 0;

    addMarker(marker: MarkerType) {
        this.markers.push(marker);
        this.lat += parseFloat(marker.lat);
        this.lng += parseFloat(marker.lng);
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
