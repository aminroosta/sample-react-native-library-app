import { types } from 'mobx-state-tree';
import { Review } from '../models/Review';
import { Google } from '../api/api';
import { json } from 'json-mobx';
import {observable, computed} from 'mobx';

export class Book {
  // @json @observable id = observable('');
  @json @observable kind = '';
  @json @observable title = '';
  @json @observable subtitle? = '';
  @json @observable authors : string[] = [];
  @json @observable publisher = '';
  @json @observable publishedDate = '';
  @json @observable description = '';
  @json @observable smallThumbnail = '';
  @json @observable thumbnail = '';
  @json @observable categories : string[] = [];
  @json @observable isbn10 = '';
  @json @observable isbn13 = '';

  @observable private _review : typeof Review.Type = null;

  @computed get review() {
    const title = this.title;
    if(this._review)
      return this._review;
    Review.getByTitle(title).then(review => this._review = review);
    return null;
  }

  static create(data: object) {
    const book = new Book();
    json.load(book, data);
    return book;
  }
}
