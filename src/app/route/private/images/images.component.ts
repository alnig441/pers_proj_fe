import { Component, OnInit, ViewEncapsulation} from "@angular/core";
import { ImageServices } from "../../../services/image.services";
import { ImageModel } from "../../../models/image.model";

@Component({
    selector: 'app-images',
    template: require('./images.component.pug'),
    styleUrls: ['./images.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ImagesComponent implements OnInit {

    images: ImageModel[] = new Array();

    constructor(private imageService: ImageServices){}

    ngOnInit(): void {
        console.log('images comp init');

        this.getAllImages();

    }

    getAllImages() {
        this.imageService.getAll()
            .subscribe(images => {
                console.log('image comp getting all images from image services: ', images);

                this.images.push(images);

                console.log('iamges: ', typeof this.images, this.images)
            })
    }

}