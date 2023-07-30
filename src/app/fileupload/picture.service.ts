import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {IPicture} from './Picture'

@Injectable({
    providedIn: 'root'
})
export class PictureService{
    private pictures:IPicture[]=[];
    private picturesUpdates = new Subject<IPicture[]>();
    url = 'http://localhost:3000/api/pictures';
    constructor(private http:HttpClient){
        // 
    }

    addPicture(title:string, content:string, image:File){
        const pictureData = new FormData();
        console.log(title + " " + content + "img " +image);
        pictureData.append("title", title);
        pictureData.append("content", content);
        // pictureData.append("image", image, title);
        pictureData.append("image", image);


        console.log(JSON.stringify(pictureData) + ' <== PIcture data');
        this.http.post<{message:string, picture:IPicture}>(
            "http://localhost:3000/api/pictures", 
            pictureData)
        .subscribe(responseData => {
            const pic:IPicture = {
                id:responseData.picture.id,
                title:title,
                content:content,
                imagePath:responseData.picture?.imagePath
            };
            console.log("Response Data :Id Obtained",pic['id']);
            this.pictures.push(pic);
            this.picturesUpdates.next([...this.pictures]);
        })
        
    }
}