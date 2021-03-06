import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../../services/account.services";
import { AuthenticationServices } from "../../../../services/authentication.services";
import { UserModel } from "../../../../models/user.model";
import { UserServices } from "../../../../services/user.services";
import { ActivatedRoute } from "@angular/router";
import {ServiceModelManagerServices} from "../../../../services/service-model-manager.services";

@Component({
    selector: 'app-users',
    template: require('./users.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class UsersComponent implements OnInit {

    userUpdated: boolean = false;
    doEdit = {};

    constructor(
        private formManager: ServiceModelManagerServices,
        private activatedRoute: ActivatedRoute,
        private activeUser: AuthenticationServices,
        private accountService: AccountServices,
        private userService: UserServices
    ) {}

    ngOnInit(): void {
        this.formManager.setService(this.activatedRoute.snapshot.url[0].path);
    }

    edit(user: UserModel): void {
        this.doEdit[user.user_name] = true;
    }

    done(user: UserModel): void {

        if(this.userUpdated){
            this.userService.editRecord(user)
        }

        this.doEdit = {};
        this.userUpdated = false;
    }

    delete(user_id: string): void {
        this.userService.deleteRecord(user_id)
    }
}