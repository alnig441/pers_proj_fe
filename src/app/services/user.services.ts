
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './errorParser';
import { UserModel } from "../models/user.model";
import { HttpAuthService } from "./httpAuth.service";
import { Router } from "@angular/router";

@Injectable()

export class UserServices {

    errorParser = new ErrorParser();
    users: UserModel[] = new Array();
    baseUrl = '/usersDb';
    message: any = {};

    constructor(private http: HttpClient, private activeUser: HttpAuthService, private router: Router) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return this.http.get(this.baseUrl, { observe: "response"})
                .toPromise()
                .then( result => {
                    this.users = result.body as UserModel[];
                    return Promise.resolve('success');
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.setMessage(error);
                })
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    getList(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: '', message: 'method not yet defined'})
        }

    }

    addItem(form: UserModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_users']) {
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }

        else{
            return this.http.post(this.baseUrl, form, { observe : "response"})
                .toPromise()
                .then((result: any) => {
                    this.setMessage({ status: result.status , message : result.body.message });
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.setMessage(error);
                })
        }
    }

    deleteItem(permission_id: string): Promise<any> {



        if(!this.activeUser.isPermitted['to_delete_permissions']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.delete(`${this.baseUrl}/${permission_id}`, {observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.setMessage({ status: response.status , message: response.body.message });
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.setMessage(error);
                })
        }
    }

    editItem(user: UserModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_users']){
            this.setMessage({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.put(`${this.baseUrl}/${user.user_id}`, user, { observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.setMessage({status: response.status, message: response.body.message});
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.setMessage(error);
                })
        }
    }

    private setMessage(message ?: any) {
        message.status != 200 ? this.message.failure = message : this.message.success = message;

        setTimeout(() => {
            this.message.success = null;
            this.message.failure = null;
            if(message.forceLogout){
                this.activeUser.logout();
                this.router.navigate(['/login']);
            }
        },3000)
    }

}