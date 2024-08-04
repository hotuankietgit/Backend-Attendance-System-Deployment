"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../config/db.config");
const Semester_1 = require("../models/Semester");
const semesterRepository = db_config_1.AppDataSource.getRepository(Semester_1.Semester);
class SemesterService {
    constructor() {
        this.addSemester = (semesterName, semesterDescription, startDate, endDate) => __awaiter(this, void 0, void 0, function* () {
            try {
                let semester = new Semester_1.Semester();
                semester.semesterName = semesterName;
                semester.semesterDescription = semesterDescription;
                semester.startDate = startDate;
                semester.endDate = endDate;
                yield semesterRepository.save(semester);
                let data = yield semesterRepository.find();
                return { data: data, error: null };
            }
            catch (e) {
                return { data: null, error: "Failed adding semester" };
            }
        });
        this.editSemester = (semesterID, semesterName, semesterDescription, startDate, endDate) => __awaiter(this, void 0, void 0, function* () {
            try {
                if ((yield semesterRepository.findOneBy({ semesterID: semesterID })) == null) {
                    return { data: null, error: `Semester ${semesterID} does not exist` };
                }
                let semester = new Semester_1.Semester();
                semester.semesterID = semesterID;
                semester.semesterName = semesterName;
                semester.semesterDescription = semesterDescription;
                semester.startDate = startDate;
                semester.endDate = endDate;
                yield semesterRepository.update({ semesterID: semesterID }, { semesterName: semesterName, semesterDescription: semesterDescription, startDate: startDate, endDate: endDate });
                let data = yield semesterRepository.find();
                return { data: data, error: null };
            }
            catch (e) {
                console.log(e);
                return { data: null, error: "Failed editing semester" };
            }
        });
        this.deleteSemester = (semesterID) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield semesterRepository.delete({
                    semesterID: semesterID
                });
                return true;
            }
            catch (e) {
                return false;
            }
        });
        this.deleteAllSemester = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let { data, error } = yield this.getAllSemester();
                if (error)
                    return false;
                yield semesterRepository.remove(data);
                return true;
            }
            catch (e) {
                return false;
            }
        });
        this.getAllSemester = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield semesterRepository.find();
                return { data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed getting semesters" };
            }
        });
    }
}
exports.default = new SemesterService();
