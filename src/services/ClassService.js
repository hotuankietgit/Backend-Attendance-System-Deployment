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
const AttendanceForm_1 = require("../models/AttendanceForm");
const Classes_1 = require("../models/Classes");
const Course_1 = require("../models/Course");
const Teacher_1 = require("../models/Teacher");
const classRepository = db_config_1.AppDataSource.getRepository(Classes_1.Classes);
class ClassService {
    constructor() {
        //oke check if teacher enrolled in this class
        this.getClassByID = (classID) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield classRepository.findOne({
                    where: {
                        classID: classID
                    }, relations: {
                        teacher: true
                    }
                });
            }
            catch (e) {
                return null;
            }
        });
        //oke used in attendance controller
        this.getClassByIDWithStudents = (classID) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield classRepository.findOne({
                    where: { classID: classID },
                    relations: { studentClass: true, course: true, teacher: true, attendanceForm: true }
                });
                return { data, error: null };
            }
            catch (e) {
                return { data: null, error: "Failed fecthing data" };
            }
        });
        this.getAllStudentsByClassID = (classID) => __awaiter(this, void 0, void 0, function* () {
            try {
                return null;
            }
            catch (e) {
                return null;
            }
        });
        this.getAllFormByClassID = (classID) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield classRepository.findOne({
                    where: {
                        classID: classID
                    },
                    relations: {
                        attendanceForm: true
                    }
                });
            }
            catch (e) {
                return null;
            }
        });
        this.getClassesByTeacherID = (teacherID) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield classRepository.createQueryBuilder("classes").
                    where("classes.teacherID = :teacherID", { teacherID: teacherID }).
                    getMany();
            }
            catch (e) {
                console.log(e);
                return null;
            }
        });
        ////Oke used in ClassesController
        this.getClassesWithCoursesByTeacherID = (teacherID) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield classRepository.find({ where: {
                        teacher: {
                            teacherID: teacherID
                        },
                    }, relations: { course: true, attendanceForm: true } });
                return { data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed fetching data" };
            }
        });
        //migration
        this.getClassesInSemesterWithCoursesByTeacherID = (teacherID, semesterID) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield classRepository.find({ where: {
                        semester: {
                            semesterID: semesterID
                        },
                        teacher: {
                            teacherID: teacherID
                        },
                    }, relations: { course: true, semester: true, attendanceForm: true } });
                return { data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed fetching data" };
            }
        });
        this.getClassesWithCoursesByTeacherIDWithPagination = (teacherID, skip, take, isArchived) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = (isArchived) ?
                    yield classRepository.find({ where: {
                            isArchived: isArchived,
                            teacher: {
                                teacherID: teacherID
                            },
                        }, relations: { course: true, attendanceForm: true }, skip: skip, take: take })
                    :
                        yield classRepository.find({ where: {
                                isArchived: false,
                                teacher: {
                                    teacherID: teacherID
                                },
                            }, relations: { course: true, attendanceForm: true }, skip: skip, take: take });
                return { data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed fetching data" };
            }
        });
        //migration
        this.getClassesInSemesterWithCoursesByTeacherIDWithPagination = (teacherID, semesterID, skip, take, isArchived) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = (isArchived) ?
                    yield classRepository.find({ where: {
                            isArchived: isArchived,
                            semester: {
                                semesterID: semesterID
                            },
                            teacher: {
                                teacherID: teacherID
                            },
                        }, relations: { course: true, semester: true, attendanceForm: true }, skip: skip, take: take })
                    :
                        yield classRepository.find({ where: {
                                isArchived: false,
                                semester: {
                                    semesterID: semesterID
                                },
                                teacher: {
                                    teacherID: teacherID
                                },
                            }, relations: { course: true, semester: true, attendanceForm: true }, skip: skip, take: take });
                return { data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed fetching data" };
            }
        });
        ////Oke used in StudentClassController
        this.getClassesWithStudentsCourseTeacher = (classID) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield classRepository.findOne({
                    where: {
                        classID: classID
                    },
                    select: {
                        teacher: {
                            teacherID: true,
                            teacherEmail: true,
                            teacherName: true
                        },
                    },
                    relations: {
                        teacher: true,
                        course: true,
                        attendanceForm: true
                    }
                });
                return { data, error: null };
            }
            catch (e) {
                return { data: null, error: "Failed fetching data" };
            }
        });
        //testable
        this.getClassesWithCourseAndTeacherByCourseID = (courseID) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield classRepository.find({
                    where: {
                        course: {
                            courseID: courseID
                        }
                    },
                    select: {
                        teacher: {
                            teacherID: true,
                            teacherEmail: true,
                            teacherName: true
                        },
                    },
                    relations: {
                        teacher: true,
                        course: true
                    }
                });
                return { data: data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed getting classes" };
            }
        });
        //testable
        this.getClasses = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield classRepository.find({
                    select: {
                        teacher: {
                            teacherID: true,
                            teacherEmail: true,
                            teacherName: true
                        }
                    },
                    relations: {
                        teacher: true,
                        course: true,
                        attendanceForm: true
                    }
                });
                return { data: data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed getting classes" };
            }
        });
        //migration
        this.getClassesBySemester = (semesterID) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield classRepository.find({
                    where: {
                        semester: {
                            semesterID: semesterID
                        }
                    },
                    select: {
                        teacher: {
                            teacherID: true,
                            teacherEmail: true,
                            teacherName: true
                        }
                    },
                    relations: {
                        teacher: true,
                        course: true,
                        semester: true,
                        attendanceForm: true
                    }
                });
                return { data: data, error: null };
            }
            catch (e) {
                console.log(e);
                return { data: [], error: "Failed getting classes" };
            }
        });
        //testable
        this.getClassesByID = (classID) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield classRepository.find({
                    where: {
                        classID: classID,
                    },
                    select: {
                        teacher: {
                            teacherID: true,
                            teacherEmail: true,
                            teacherName: true
                        }
                    },
                    relations: {
                        teacher: true,
                        course: true
                    }
                });
                return { data: data, error: null };
            }
            catch (e) {
                return { data: null, error: "Failed getting classes" };
            }
        });
        //must test
        this.editClass = (classID, roomNumber, shiftNumber, startTime, endTime, classType, group, subGroup, courseID, teacherID) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield classRepository.update({ classID: classID }, { roomNumber: roomNumber, shiftNumber: shiftNumber, startTime: startTime, endTime: endTime,
                    classType: classType, group: group, subGroup: subGroup, course: courseID, teacher: teacherID });
                return true;
            }
            catch (e) {
                return false;
            }
        });
        //must test
        this.getClassesWithPagination = (page) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (page <= 0) {
                    page = 1;
                }
                let skip = (page - 1) * 6;
                let data = yield classRepository.find({
                    select: {
                        teacher: {
                            teacherID: true,
                            teacherEmail: true,
                            teacherName: true
                        }
                    },
                    relations: {
                        teacher: true,
                        course: true,
                        attendanceForm: true
                    },
                    skip: skip,
                    take: 6
                });
                return { data: data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed getting classes" };
            }
        });
        //migration
        this.getClassesWithPaginationAndSemester = (page, semester) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (page <= 0) {
                    page = 1;
                }
                let skip = (page - 1) * 6;
                let data = yield classRepository.find({
                    where: {
                        semester: {
                            semesterID: semester
                        }
                    },
                    select: {
                        teacher: {
                            teacherID: true,
                            teacherEmail: true,
                            teacherName: true
                        }
                    },
                    relations: {
                        teacher: true,
                        course: true,
                        semester: true,
                        attendanceForm: true
                    },
                    skip: skip,
                    take: 6
                });
                return { data: data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed getting classes" };
            }
        });
        //must test
        this.getClassesWithCourseAndTeacherByCourseIDWithPagination = (courseID, page) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (page <= 0) {
                    page = 1;
                }
                let skip = (page - 1) * 6;
                let data = yield classRepository.find({
                    select: {
                        teacher: {
                            teacherID: true,
                            teacherEmail: true,
                            teacherName: true
                        },
                    },
                    relations: {
                        teacher: true,
                        course: true
                    },
                    where: {
                        course: {
                            courseID: courseID
                        }
                    },
                    skip: skip,
                    take: 6
                });
                return { data: data, error: null };
            }
            catch (e) {
                return { data: [], error: "Failed getting classes" };
            }
        });
        //must test
        this.deleteClass = (classID) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield classRepository.delete({
                    classID: classID,
                });
                return true;
            }
            catch (e) {
                return false;
            }
        });
        this.getTotalPagesForClasses = (offset) => __awaiter(this, void 0, void 0, function* () {
            try {
                let total = yield classRepository.count();
                if (total == 0 || offset <= 0)
                    return 0;
                return Math.ceil(total / offset);
            }
            catch (e) {
                return 0;
            }
        });
        this.getTotalPagesForClassesByTeacherID = (teacherID, offset, isArchived) => __awaiter(this, void 0, void 0, function* () {
            try {
                let total = (isArchived) ?
                    yield classRepository.findAndCount({ where: {
                            isArchived: isArchived,
                            teacher: {
                                teacherID: teacherID
                            },
                        } })
                    :
                        yield classRepository.findAndCount({ where: {
                                isArchived: false,
                                teacher: {
                                    teacherID: teacherID
                                },
                            } });
                if (total[1] == 0 || offset <= 0)
                    return 0;
                return Math.ceil(total[1] / offset);
            }
            catch (e) {
                return 0;
            }
        });
        //migration
        this.getTotalPagesForClassesInSemesterByTeacherID = (teacherID, semesterID, offset, isArchived) => __awaiter(this, void 0, void 0, function* () {
            try {
                let total = (isArchived) ?
                    yield classRepository.findAndCount({ where: {
                            isArchived: isArchived,
                            teacher: {
                                teacherID: teacherID
                            }, semester: {
                                semesterID: semesterID
                            }
                        } })
                    :
                        yield classRepository.findAndCount({ where: {
                                isArchived: false,
                                teacher: {
                                    teacherID: teacherID
                                }, semester: {
                                    semesterID: semesterID
                                }
                            } });
                if (total[1] == 0 || offset <= 0)
                    return 0;
                return Math.ceil(total[1] / offset);
            }
            catch (e) {
                return 0;
            }
        });
        this.getTotalClasses = () => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield classRepository.count();
            }
            catch (e) {
                return 0;
            }
        });
        this.uploadClasses = (classes, attendanceForms) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_config_1.AppDataSource.transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                    yield transactionalEntityManager.save(classes);
                    yield transactionalEntityManager.save(attendanceForms);
                }));
                return { data: classes, error: null };
            }
            catch (e) {
                console.log(e);
                return { data: null, error: "Failed creating classes" };
            }
        });
        this.editClassesInArchive = (classID, archived) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield classRepository.update({ classID: classID }, { isArchived: archived });
                return true;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.default = new ClassService();
