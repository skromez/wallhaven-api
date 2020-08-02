import {
  HttpService,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { ImageInterface } from './interfaces/image.interface';

@Injectable()
export class WallhavenService {
  constructor(
    private httpService: HttpService,
  ) {}

  private readonly apiBaseUrl = 'https://wallhaven.cc/api/v1/';

  getRandomImage(): Observable<AxiosResponse<ImageInterface>> {
    return this.httpService.get(this.apiBaseUrl + `search?sorting=random`)
      .pipe(map(response => response.data.data[0]));
  }

  findImagesByName(category: string, q: string = '', limit: number = 5): Observable<AxiosResponse<ImageInterface>> {
    return this.httpService.get(this.apiBaseUrl + `search?q=${q}&categories=${category}010&sorting=toplist`)
      .pipe(
        map(response => {
            return response.data.data.slice(0, limit);
          },
        ));
  }
}
