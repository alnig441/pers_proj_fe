import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin/admin.component";
import { PrivateRoutingModule } from "./private-routing.module";
import { UsersComponent } from "./users/users.component";
import { EventsComponent } from "./events/events.component";
import { ImagesComponent } from "./images/images.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { ImageServices } from "../../services/image.services";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptorService } from "../../services/jwt-interceptor.service";
import { InfobarComponent } from "../../components/infobar/infobar.component";

@NgModule({
    imports: [
        CommonModule,
        PrivateRoutingModule
    ],
    declarations: [
        AdminComponent,
        UsersComponent,
        EventsComponent,
        ImagesComponent,
        SidebarComponent,
        InfobarComponent
    ],
    exports: [
    ],
    providers: [
        ImageServices,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        }
    ]
})

export class PrivateModule {}