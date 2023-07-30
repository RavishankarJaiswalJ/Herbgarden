import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mimeType } from './mime-type.validator';
import { PictureService } from './picture.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {

  form!: FormGroup
  imagePreview: any;
  constructor(private picService: PictureService, private router: Router) { }


  ngOnInit(): void {
    this.form = new FormGroup({
      'title': new FormControl(null),
      'content': new FormControl(null),
      'image': new FormControl(
        null,
        {
          // validator: [Validators.required] 
          // asyncValidators:mimeType
        }
      )
    });

  }
  onImagePicked(event: Event) {

    console.log('------------------------');
    let file = (event?.target as HTMLInputElement).files![0];
    // console.log(file);  
    this.form.patchValue({ image: file });
    this.form.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  onSavePicture() {
    console.log('Form Submitted');
    if (this.form.invalid) {
      this.router.navigate(['/error']);
    }

    console.log('this.form.value');
    console.log(this.form.value);
    console.log('this.form.value.end');
    this.picService.addPicture(
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
    );
    this.form.reset();
    this.router.navigate(['/upload']);
  }

}
