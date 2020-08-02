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
    let seed = Math.random().toString(36).substring(7);
    return this.httpService.get(this.apiBaseUrl + `search?q=${q}&categories=${category}010&sorting=random&seed=${seed}`)
      .pipe(
        map(response => {
            return response.data.data.filter(image => image.file_size < 10045576 && image.file_size > 200000).slice(0, limit);
          },
        ));
  }
}
