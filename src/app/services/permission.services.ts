import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './error-parser';
import { PermissionModel } from "../models/permission.model";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class PermissionServices {

    errorParser = new ErrorParser();
    permissions: PermissionModel[] = new Array();
    baseUrl = '/permissionsDb';

    constructor(
      private message: SetMessageService,
      private http: HttpClient,
      private activeUser: AuthenticationService
    ) {}

    getAll(): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_permissions']) {
        return this.http.get(this.baseUrl, { observe: "response"})
          .toPromise()
          .then(res => {
            this.permissions = res.body as PermissionModel[];

            return Promise.resolve('success');
          })
          .catch(this.errorParser.handleError)
      } else {
        this.message.set({ status: 405, message: 'insufficient permissions'});
      }

    }

    getList(): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_permissions']) {
        return Promise.reject({ status: '', message: 'method not yet defined'});
      } else {
        this.message.set({ status: 405, message: 'insufficient permissions'});
      }

    }

    getOne(): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_view_permissions']) {
        return Promise.reject({ status: '', message: 'method not yet defined'})
      } else {
        this.message.set({ status: 405, message: 'insufficient permissions'});
      }

    }

    addRecord(form: PermissionModel): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_add_permissions']) {
        return this.http.post(this.baseUrl, form, { observe : "response"})
          .toPromise()
          .then((response: any) => {
            this.message.set({status: response.status, message: response.body.message});
            this.getAll();
          })
          .catch(this.errorParser.handleError)
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 405, message: 'insufficient permissions'});
      }

    }

    deleteRecord(permission_id: string): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_delete_permissions']) {
        return this.http.delete(`${this.baseUrl}/${permission_id}`, {observe: "response"})
          .toPromise()
          .then((response: any) => {
            this.message.set({status: response.status, message: response.body.message});
            this.getAll();
          })
          .catch(this.errorParser.handleError)
          .catch((error: any) => {
            this.message.set(error);
          })
      } else {
        this.message.set({ status: 405, message: 'insufficient permissions'});
      }

    }

    editRecord(): Promise<any> {

      if (this.activeUser.isAdmin || this.activeUser.isPermitted['to_edit_permissions']) {
        return Promise.reject({ status: '', message: 'method not yet defined'})
      } else {
        this.message.set({ status: 405, message: 'insufficient permissions'});
      }

    }
}
