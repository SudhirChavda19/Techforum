import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  // private bookmarks$ = new BehaviorSubject<Bookmark[]>([]);
  constructor(private http: HttpClient) {}
  private baseUrl = environment.baseUrl;
  getQuestions() {
    return this.http.get<any>(`${this.baseUrl}/api/users/question`);
  }

  questionPagination(page: number, limit: number) {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', limit.toString());
      console.log(page);
      console.log( typeof limit);
      console.log(`${this.baseUrl}/api/users/quepagination`);
      
    return this.http.get<any>(`${this.baseUrl}/api/users/quepagination`, {
      params,
    });
  }

  postQuestion(data: any) {
    return this.http.post<any>(`${this.baseUrl}/users/question`, data);
  }

  postAnswer(data: any) {
    return this.http.post<any>(`${this.baseUrl}/users/answer`, data);
  }

  getQuestionById(id: any) {
    return this.http.get<any>(`${this.baseUrl}/api/users/question/` + id);
  }

  getAnswerById(id: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/users/answer/` + id);
  }

  getTags(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/users/getalltags`);
  }

  addRemoveBookmark(data: any) {
    return this.http.post<any>(`${this.baseUrl}/api/users/bookmark`, data);
  }

  getBookmarkByUserId(userId: any) {
    return this.http.get<any>(`${this.baseUrl}/api/users/bookmark/` + userId);
  }

  upvotesAnswer(id: any, data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/api/users/upvote/${id}`,
      data
    );
  }

  downvotesAnswer(id: any, data: any) {
    return this.http.post<any>(
      `${this.baseUrl}/api/users/downvote/${id}`,
      data
    );
  }

  searchQuestion(query: any) {
    return this.http.get<any>(
      `${this.baseUrl}/api/users/search?question=` + query
    );
  }

  getBlogTitle(){
    return this.http.get<any>(`${this.baseUrl}/api/users/blogtitle`);
  }
}
