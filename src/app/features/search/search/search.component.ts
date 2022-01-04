import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { MapComponent } from 'ngx-mapbox-gl';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {
  
  @ViewChild('map') map!: MapComponent;
  public filteredMarkers!: any[];
  public center: [number, number] = [6.5, 46.5];
  public markers!: any[];
  public maxItemCountPerPage: number = 10;
  public maxItemCount: number = 10;
  public ready!: boolean;

  constructor(
    private readonly _route: ActivatedRoute,
    private readonly _router: Router,
    private readonly _service: SearchService
  ) { }

  async ngOnInit() {
    const {where = null} = this._route.snapshot.queryParams;
    if (!where) {
      this._router.navigate(['/']);
      return;
    }
    this.center = await this._service.getCenter(where);
    this.markers = await this._service.getPlaces(where);
    this.filteredMarkers = this.markers;
  }

  async ngAfterViewInit() {
      await this.initMap();
  }

  async initMap() {
    await new Promise((res) => {
      setTimeout(() => {
        console.log('after view init');
        res(true);
      }, 500);
    });
    this.ready = true;
    if (!this.map) {
      return;
    }
    // filter markers by bounds
    const mapBoxBound = this.map.mapInstance.getBounds();
    this._filterMarkersbyBound(mapBoxBound)
  }

  async searchResults($event: any){
    if (!this.map||!this.markers) {
      return;
    }
    this.maxItemCount = 10;
    const mapBoxBound = ($event.target as mapboxgl.Map).getBounds();
    this._filterMarkersbyBound(mapBoxBound)
  }

  async displayPopUp($event: any, marker: any){}

  private _filterMarkersbyBound(mapBoxBound: mapboxgl.LngLatBounds) {
    const filteredMarkers = (this.markers||[]).filter(
      marker => mapBoxBound.contains(marker.lngLat)
    );
    this.filteredMarkers = filteredMarkers;
  }
}
