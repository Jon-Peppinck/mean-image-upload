import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

import { Profile } from "../../models/Profile";
import { ProfileService } from "src/app/services/profile.service";

@Component({
  selector: "app-create-profile",
  templateUrl: "./create-profile.component.html",
  styleUrls: ["./create-profile.component.css"],
})
export class CreateProfileComponent implements OnInit {
  form: FormGroup;
  profile: Profile;
  imageData: string;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    this.profileService.addProfile(this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData = null;
  }
}
