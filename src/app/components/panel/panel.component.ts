import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserServices } from "../../services/user.services";
import { UserModel } from "../../models/user.model";

@Component({
    selector: 'app-panel',
    template: require('./panel.component.pug'),
    styleUrls: ['./panel.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PanelComponent implements OnInit {

    doEdit = {};
    accountTypes = [
        {
            account_id: 1,
            account_type: 'standard_user'
        },
        {
            account_id: 2,
            account_type: 'super_user'

        },
        {
            account_id: 3,
            account_type: 'administrator'
        }
    ]

    languages = [
        {
            language: 'english'
        },
        {
            language: 'danish'
        }
    ]


    constructor(private userService: UserServices) {}

    ngOnInit(): void {
        console.log('panel comp init');
    }

    edit(user: UserModel): void {
        console.log('editing user: ', user.user_name);
        this.doEdit[user.user_name] = true;
    }

    done(user: UserModel): void {
        console.log('done editing user: ', user);
        this.doEdit = {};
    }

    addInput(input: any, i: any): void {
        console.log('inputting this account: ', input);
        for(var prop in input){
            if(prop != 'account_id') {
                if(prop == 'account_name'){
                    this.userService.users[i][prop] = input.account_id;
                }
                this.userService.users[i][prop] = input[prop];
            }
        }
    }

    delete(user: UserModel): void {
        console.log('deleting user: ', user.user_name);
    }
}