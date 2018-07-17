import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ImageModel } from "../models/image.model";

@Injectable()

export class ImageServices {

    images: ImageModel[] = new Array();
    // images: Observable<any>;

    constructor(private http: HttpClient) {}

    getAll(): Observable<any> {
        /* MOCK ASYNC OPERATION */
        // return of(true).delay(1000).do(val => {
        //     console.log('image services getAll() ', val)
        // })

        return this.http.get<any>('/imagesDb')
            // .map(image => {
            //     console.log('returned from image route: ', image);
            // })

    }

    getLatest(): Observable<any> {
        console.log('getting latest in imageServices');
        return this.http.get<any>('/imagesDb/latest')
            .do((x) => {
                this.images = x;
            });

    }
}