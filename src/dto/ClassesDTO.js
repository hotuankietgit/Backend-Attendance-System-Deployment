"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AttendanceForm_1 = require("../models/AttendanceForm");
const Classes_1 = require("../models/Classes");
const TimeConvert_1 = require("../utils/TimeConvert");
class ClassesDTO {
    constructor() {
        this.appendRecentLesson = (classes) => {
            for (let i = 0; i < classes.length; i++) {
                let classObject = classes[i];
                let closetLesson = this.getClosestLesson(classObject.attendanceForm);
                if (closetLesson != null) {
                    classObject.shiftNumber = closetLesson.shiftNumber;
                    classObject.roomNumber = closetLesson.roomNumber;
                    classObject.weekday = (0, TimeConvert_1.getWeekday)(closetLesson.periodDateTime);
                }
                delete classObject.attendanceForm;
            }
            return classes;
        };
        this.getClosestLesson = (attendanceForms) => {
            let closestLessons = null;
            let minDiff = Infinity;
            let today = (0, TimeConvert_1.JSDatetimeToMySQLDatetime)(new Date());
            for (let i = 0; i < attendanceForms.length; i++) {
                let attendanceForm = attendanceForms[i];
                let lessonDate = (0, TimeConvert_1.MySQLDatetimeToJSDatetime)(attendanceForm.periodDateTime);
                let diffInMs = Math.abs(new Date(today) - new Date(lessonDate));
                if (diffInMs < minDiff) {
                    minDiff = diffInMs;
                    closestLessons = attendanceForm;
                }
            }
            return closestLessons;
        };
        this.getFormByFormID = (attendanceForms, formID) => {
            return attendanceForms.find(attendanceForm => attendanceForm.formID === formID);
        };
    }
}
exports.default = new ClassesDTO();
