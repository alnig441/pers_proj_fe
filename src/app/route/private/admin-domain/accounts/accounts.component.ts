import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AccountServices } from "../../../../services/account.services";
import { PermissionServices } from "../../../../services/permission.services";
import { HttpAuthService } from "../../../../services/httpAuth.service";
import { AccountModel } from "../../../../models/account.model";
import {CompInitService} from "../../../../services/comp-init.service";

@Component({
    selector: 'app-accounts',
    template: require('./accounts.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class AccountsComponent implements OnInit {

    private accountForm: AccountModel = new AccountModel('uuid_generate_v4()');

    constructor(private compInit: CompInitService, private activeUser: HttpAuthService, private accountService: AccountServices, private permissionService: PermissionServices){}

    ngOnInit(): void {
        if(this.activeUser.isPermitted['to_view_accounts']){
            this.compInit.initialize('permissions')
                .then((result: any) => {
                    console.log('account comp init ', result);
                })
        }
    }
}