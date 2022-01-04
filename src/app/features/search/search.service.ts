import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {

  constructor(
    private _http: HttpClient
  ) { }

  async getCenter(region: string): Promise<[number, number]> {
    let center: [number, number] = [6.143158, 46.204391];
    switch (true) {
      case region === 'montreux':
        center = [6.9167, 46.4333];
        break;
      case region === 'lausanne':
        center = [6.6322734, 46.5196535];
        break;
      case region === 'zurich':
        center = [8.55, 47.3667];
        break;
      case region === 'geneva':
      case region === 'genève':
        center = [6.143158, 46.204391]
        break;

      default:
        break;
    }
    return center;
  }

  async getPlaces(region: string): Promise<any[]> {
    let url;
    switch (true) {
      case region === 'montreux':
        url = 'airbnb-montreux.json';
        break;
      case region === 'lausanne':
        url = 'airbnb-lausanne.json';
        break;
      case region === 'zurich':
        url = 'airbnb-zurich.json';
        break;
      case region === 'geneva':
      case region === 'genève':
        url = 'airbnb-geneva.json';
        break;

      default:
        throw new Error("Unexisting region")
    }
    const places: any[] = await this._http
      .get<any[]>('../../assets/json-data/' + url)
      .toPromise()
      .then(data => data
        .filter((a) => a.neighbourhood.toLowerCase().includes(region))
        .map(p => {
          return {
            ...p,
            title: p.name,
            shortDesc: `${p.property_roomType} - ${p.neighbourhood_cleansed}`,
            desc: `
              ${p.bedrooms ? p.bedrooms + ' chambres, ': ''}
              ${p.beds ? p.beds +' lits, ': ''}
              ${p.amenities ? p.amenities.slice(0, 3).join(', '): ''}
            `,
            price: p.price,
            imgUrl: p.picture_url,
            review_scores_value: p.review_scores_value,
            lngLat: [p.longitude, p.latitude]
          };
        })
        .sort((a, b) => {
          return a.id - b.id;
        })
      );
    return places;
  }
}
