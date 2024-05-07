import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/types';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error: null | string = null;
  private errorSub: Subscription;

  constructor(private postsSerivice: PostsService) {}

  private fetchPosts() {
    this.isFetching = true;
    this.postsSerivice.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error: Error) => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  ngOnInit() {
    this.errorSub = this.postsSerivice.error.subscribe(
      (erroMes) => (this.error = erroMes)
    );
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    this.postsSerivice.createAndStorePosts(postData);
  }
  onHandleError() {
    this.error = null;
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsSerivice.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
