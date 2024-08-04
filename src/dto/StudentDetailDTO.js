"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StudentDetailDTO {
    constructor() {
        this.studentDetail = (studentModel) => {
            return {
                studentDetail: {
                    studentID: studentModel.studentID,
                    studentName: studentModel.studentName,
                    studentEmail: studentModel.studentEmail,
                }
            };
        };
    }
}
exports.default = new StudentDetailDTO();
