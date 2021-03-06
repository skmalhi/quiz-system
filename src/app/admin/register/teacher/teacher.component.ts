import { AddTeacherSubjectComponent } from "./../../../shared/add-teacher-subject/add-teacher-subject.component";
import { TeacherService } from "../../../core/services/teacher.service";
import { PopupService } from "../../../core/services/popup.service";
import { RegisterTeacherComponent } from "../../../shared/register-teacher/register-teacher.component";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.css"]
})
export class TeacherComponent implements OnInit {
  teachers = [];

  constructor(
    private popupService: PopupService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.teacherService.getTeachers().subscribe(teachers => {
      console.log(teachers);
      this.teachers = teachers;
    });
  }

  openRegisterTeacherPopup() {
    const registerPopup = this.popupService.openPopup(
      RegisterTeacherComponent,
      null,
      {
        size: "lg"
      }
    );

    registerPopup.result.then(
      result => {
        this.teachers.push(result);
      },
      () => {}
    );
  }

  editTeacherPopup(teacher) {
    this.popupService.openPopup(RegisterTeacherComponent, teacher, {
      size: "lg"
    });
  }

  openAddTeacherSubjectPopup(teacher) {
    const teacherSubjectPopup = this.popupService.openPopup(
      AddTeacherSubjectComponent,
      teacher,
      {
        size: "lg"
      }
    );

    teacherSubjectPopup.result.then(
      result => {
        console.log(result);
      },
      () => {}
    );
  }
}
