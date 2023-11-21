import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import {
  icon,
  Icon,
  latLng,
  Layer,
  LayerGroup,
  LeafletEvent,
  Map,
  marker,
  tileLayer,
} from 'leaflet';
import { LANTERN } from './markers/lantern';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LeafletModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  map: Map;

  AtlasMap = tileLayer('/assets/mapStyles/styleAtlas/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'AtlasStyle map',
  });
  GridMap = tileLayer('/assets/mapStyles/styleGrid/{z}/{x}/{y}.png', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'GridStyle map',
  });
  SatelliteMap = tileLayer('/assets/mapStyles/styleSatelite/{z}/{x}/{y}.jpg', {
    minZoom: 0,
    maxZoom: 5,
    noWrap: true,
    id: 'SatelliteStyle map',
  });
  lantern: LayerGroup = new LayerGroup();

  options = {
    layers: [this.AtlasMap],
    zoom: 3,
    maxZoom: 5,
    minZoom: 0,
    center: latLng(0, 0),
    noWrap: true,
  };

  layersControl = {
    baseLayers: {
      AtlasMap: this.AtlasMap,
      GridMap: this.GridMap,
      SatelliteMap: this.SatelliteMap,
    },
    overlays: {},
  };

  clickEvent(event: LeafletEvent): void {
    console.log(event);
  }

  onMapReady(map: Map): void {
    this.map = map;
    this.setLantern();
  }

  setLantern(): void {
    for (const mark of LANTERN) {
      const newMarker = marker(latLng(mark.lat, mark.lng), {
        title: mark.name,
        icon: icon({
          ...Icon.Default.prototype.options,
          iconUrl: 'assets/marker/lantern.png',
          shadowUrl: 'assets/marker-shadow.png',
        }),
      });
      this.lantern.addLayer(newMarker);
    }

    this.layersControl.overlays = {
      ...this.layersControl.overlays,
      Lanterne: this.lantern,
    };

    this.map.addLayer(this.lantern);
  }
}
