import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import { ErrorParser } from './error-parser';
import { UserModel } from "../models/user.model";
import { AuthenticationService } from "./authentication.service";
import { SetMessageService } from "./set-message.service";

@Injectable()

export class UserServices {

    errorParser = new ErrorParser();
    users: UserModel[] = new Array();
    baseUrl = '/usersDb';

    constructor(private message: SetMessageService, private http: HttpClient, private activeUser: AuthenticationService) {}

    getAll(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
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
                    this.message.set(error);
                })
        }

    }

    getOne(): Promise<any> {
        if(!this.activeUser.isPermitted['to_view_users']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: null, message: 'method not yet defined'})
        }

    }

    getList(): Promise<any> {
        console.log('hello from users list');
        if(!this.activeUser.isPermitted['to_view_users']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        else {
            return Promise.reject({ status: null , message: 'method not yet defined'})
                .catch((result: any) => {
                    this.message.set(result);
                })

        }

    }

    addRecord(form: UserModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_add_users']) {
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }

        else{
            return this.http.post(this.baseUrl, form, { observe : "response"})
                .toPromise()
                .then((result: any) => {
                    this.message.set({ status: result.status , message : result.body.message });
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.message.set(error);
                })
        }
    }

    deleteRecord(permission_id: string): Promise<any> {



        if(!this.activeUser.isPermitted['to_delete_permissions']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.delete(`${this.baseUrl}/${permission_id}`, {observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.message.set({ status: response.status , message: response.body.message });
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.message.set(error);
                })
        }
    }

    editRecord(user: UserModel): Promise<any> {
        if(!this.activeUser.isPermitted['to_edit_users']){
            this.message.set({ status: 405, message: 'insufficient permissions'});
        }
        else {
            return this.http.put(`${this.baseUrl}/${user.user_id}`, user, { observe: "response"})
                .toPromise()
                .then((response: any) => {
                    this.message.set({status: response.status, message: response.body.message});
                    this.getAll();
                })
                .catch(this.errorParser.handleError)
                .catch((error: any) => {
                    this.message.set(error);
                })
        }
    }
}