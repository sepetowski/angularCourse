export interface Post {
  id?: string;
  title: string;
  content: string;
}
export interface ResponsePosts {
  [key: string]: Post;
}
export interface NewPostResposne {
  name: string;
}
