import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NewPostResposne, Post, ResponsePosts } from 'src/types';

//interceptors - allows to add headers to all requests

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>();

  private url =
    'https://angular-course-f67b5-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  //by observe we cane change the wave of getting the response data- observe: response returne all response .. body,statusText,status etc
  createAndStorePosts(post: Post) {
    this.http
      .post<NewPostResposne>(`${this.url}/posts.json`, post, {
        observe: 'response',
      })
      .subscribe(
        (res) => console.log(res),
        (error: Error) => this.error.next(error.message)
      );

    // Send Http request
    //HttpClient provided by angular automatically converts objects to JSON
    //it must have been subscribed, when not it will not trigger the method
  }

  fetchPosts() {
    return this.http
      .get<ResponsePosts>(`${this.url}/posts.json`, {
        headers: new HttpHeaders({
          'Custom-Header': 'Hello',
        }),
        params: new HttpParams().set('print', 'pretty'),
      })
      .pipe(
        map((res) => {
          const postArray: Post[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key))
              postArray.push({ ...res[key], id: key });
          }
          return postArray;
        }),
        catchError((error: Error) => {
          //do smth send to anaylitc server for example
          return throwError(error);
        })
      );
  }

  //tap - Used to perform side-effects for notifications from the source observable. it dosent changde the data that is going to subscribtion
  deletePosts() {
    return this.http
      .delete(`${this.url}/posts.json`, {
        observe: 'events',
        //change the type of return object by angular - deafult json
        responseType: 'text',
      })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
          if (event.type === HttpEventType.Sent) {
            console.log('Sent');
          }
        })
      );
  }
}
