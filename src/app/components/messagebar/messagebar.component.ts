import { Component, OnInit, DoCheck, ViewEncapsulation } from "@angular/core";
import { ImageServices } from "../../services/image.services";
import { UserServices } from "../../services/user.services";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "app-messagebar",
    template: require('./messagebar.component.pug'),
    encapsulation: ViewEncapsulation.None
})

export class MessagebarComponent implements OnInit {

    error: any;
    private route: string;

    constructor(private images: ImageServices, private users: UserServices, private activatedRoute: ActivatedRoute){}

    ngOnInit(): void {
        console.log('messagebar comp init', this.activatedRoute.snapshot.url[0].path);
        this.route = this.activatedRoute.snapshot.url[0].path;
    }

}