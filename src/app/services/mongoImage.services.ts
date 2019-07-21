import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { MongoImageModel } from "../models/mongoImage.model";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from "./error-parser";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class MongoImageServices {

  errorParser = new ErrorParser();
  images: MongoImageModel[] = new Array();
  imagesUpdated: boolean = false;
  baseUrl = '/api';

  constructor(
    private message: SetMessageService,
    private http: HttpClient,
    private activeUser: AuthenticationService
  ) {}

  generateTabs(year?: number): Promise<any> {
    if(!this.activeUser.isPermitted['to_view_images']){
        this.message.set({ status: 405, message: 'insufficient permissions'});
    }
    else{
      let params = new HttpParams({ fromString: 'endpoint'});
      params = params.set('endpoint', 'Photos');
      params = year ? params.append('year', year.toString()): params;

      return this.http.get(this.baseUrl + '/generate_tabs?', { params : params , observe: 'body'})
        .toPromise()
        .then((res : any) => {
            return Promise.resolve(res);
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) => {
            this.message.set(error)
        })
    }
  }

  search(form: MongoImageModel, page?: any, doAnd?: boolean): Promise<any> {
    if(!this.activeUser.isPermitted['to_view_images']){
        this.message.set({ status: 405, message: 'insufficient permissions'});
    }
    else{
      let params = new HttpParams({ fromString: 'doAnd' });
      let keys = Object.keys(form);
      keys.forEach( key => {
        if ( form[key] || ( typeof form[key] == 'number' && form[key] == 0 ) ){
          params = params.append(key, form[key]);
        }
      })
      params = page ? params.append('page', page.toString()) : params;
      params = doAnd ? params.set('doAnd', 'yes') : params;

      return this.http.get(this.baseUrl + '/photos', { params : params , observe: 'body'})
        .toPromise()
        .then((res : any) => {
            return Promise.resolve(res);
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) => {
            this.message.set(error)
        })
    }
  }

  findOne(_id: string): Promise<any> {
    if ( !this.activeUser.isPermitted['to_view_images'] ){
      this.message.set({ status: 405, message: 'insufficient permissions'});
    }
    else {
      return this.http.get(`${this.baseUrl}/${_id}`, { observe: 'body' })
        .toPromise()
        .then((res: any) => {
          return Promise.resolve(res);
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) => {
          this.message.set(error);
        })
    }
  }

  updateOne(_id: string, form: MongoImageModel): Promise<any> {
    if ( !this.activeUser.isPermitted['to_edit_images'] ){
      this.message.set({ status: 405, message: 'insufficient permissions'});
    }
    else {
      return this.http.post(`${this.baseUrl}/${_id}`, form, { observe: 'body' })
        .toPromise()
        .then((res: any) => {
          return Promise.resolve(res);
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) => {
          this.message.set(error);
        })
    }
  }

  updateMany(_ids: string[], form: MongoImageModel): Promise<any> {
    if ( !this.activeUser.isPermitted['to_edit_images'] ) {
      this.message.set({ status: 405, message: 'insufficient permissions'});
    }
    else {
      let body = { form: form, _ids: _ids };
      return this.http.post(`${this.baseUrl}/update`, body, { observe: 'body' })
        .toPromise()
        .then((result: any) => {
          return Promise.resolve(result);
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) =>{
          this.message.set(error);
        })
    }
  }

  deleteMany(_ids: string[]): Promise<any> {
    if (!this.activeUser.isPermitted['to_delete_images']) {
      this.message.set({ status: 405, message: 'insufficient permissions'});
    }
    else {
      this.message.set({ status: 300, message: 'not yet implemented' });
      return Promise.resolve({message: 'done'});
    }
  }

  deleteOne(_id: string): Promise<any> {
    if ( !this.activeUser.isPermitted['to_delete_images'] ){
      this.message.set({ status: 405, message: 'insufficient permissions'});
    }
    else {
      return this.http.delete(`${this.baseUrl}/${_id}`, { observe: 'body' })
        .toPromise()
        .then((res: any) => {
          return Promise.resolve(res);
        })
        .catch(this.errorParser.handleError)
        .catch((error: any) => {
          this.message.set(error);
        })
    }
  }

}
