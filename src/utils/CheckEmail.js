"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkEmailStudent(email) {
    const regex = /^([a-zA-Z0-9]+)@student\.tdtu\.edu\.vn$/;
    return regex.test(email);
}
function checkEmailTeacher(email) {
    const regex = /^([a-zA-Z0-9]+)\.tdtu\.edu\.vn$/;
    return regex.test(email);
}
exports.default = checkEmailStudent;
