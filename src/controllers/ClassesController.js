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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClassesDTO_1 = __importDefault(require("../dto/ClassesDTO"));
const ClassService_1 = __importDefault(require("../services/ClassService"));
const exceljs_1 = __importDefault(require("exceljs"));
const BusinessUtils_1 = __importDefault(require("../utils/BusinessUtils"));
const CompareCaseInsentitive_1 = __importDefault(require("../utils/CompareCaseInsentitive"));
const classService = ClassService_1.default;
class ClassesController {
    constructor() {
        this.getClassesWithCourse = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherID = req.payload.userID;
                let semesterID = req.query.semester;
                const { data, error } = (semesterID) ? yield classService.getClassesInSemesterWithCoursesByTeacherID(teacherID, semesterID) : yield classService.getClassesWithCoursesByTeacherID(teacherID);
                if (error) {
                    return res.status(500).json({ message: error });
                }
                if (data.length == 0) {
                    return res.status(204).json({ message: "Teacher is not in charge of any class" });
                }
                return res.status(200).json(ClassesDTO_1.default.appendRecentLesson(data));
            }
            catch (e) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.getClassesWithCourseWithPagination = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherID = req.payload.userID;
                let semesterID = req.query.semester;
                let archived = req.query.archived;
                archived = (archived == "true") ? true : false;
                let page = req.params.page;
                if (page <= 0) {
                    page = 1;
                }
                let skip = (page - 1) * 9;
                const { data, error } = (semesterID) ? yield classService.getClassesInSemesterWithCoursesByTeacherIDWithPagination(teacherID, semesterID, skip, 9, archived) : yield classService.getClassesWithCoursesByTeacherIDWithPagination(teacherID, skip, 9, archived);
                let total = (semesterID) ? yield classService.getTotalPagesForClassesInSemesterByTeacherID(teacherID, semesterID, 9, archived) : yield classService.getTotalPagesForClassesByTeacherID(teacherID, 9, archived);
                if (error) {
                    return res.status(500).json({ message: error });
                }
                if (data.length == 0) {
                    return res.status(204).json({ message: "Teacher is not in charge of any class" });
                }
                return res.status(200).json({ totalPage: total, classes: ClassesDTO_1.default.appendRecentLesson(data) });
            }
            catch (e) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.editClassInArchivesByClassID = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const teacherID = req.payload.userID;
                let classID = req.params.classid;
                let archive = req.body.archive;
                let successMessage = (archive) ? `Successfully added class ${classID} in archives`
                    : `Successfully restore class ${classID} from archives`;
                let failMessage = (archive) ? `Failed adding class ${classID} in archives`
                    : `Failed resotring class ${classID} from archives`;
                const { data: classes, error: err } = yield classService.getClassByIDWithStudents(classID);
                if (err) {
                    return res.status(503).json({ message: err });
                }
                if (classes == null) {
                    return res.status(204).json({ message: `Class with the id: ${classID} does not exist` });
                }
                if ((0, CompareCaseInsentitive_1.default)(teacherID, classes.teacher.teacherID) == false) {
                    return res.status(422).json({ message: "Teacher is not in charge of this class" });
                }
                return (yield classService.editClassesInArchive(classID, archive)) ?
                    res.status(200).json({ message: successMessage }) :
                    res.status(503).json({ message: failMessage });
            }
            catch (e) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.uploadClasses = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let fileExcel = req.files.file;
                let semesterID = req.body.semesterID;
                const buffer = fileExcel.data;
                const workbook = new exceljs_1.default.Workbook();
                const content = yield workbook.xlsx.load(buffer, { type: "buffer" });
                const worksheet = content.worksheets[0];
                let classes = BusinessUtils_1.default.generateClassesFromExcel(worksheet, semesterID);
                let attendanceForms = classes.flatMap(c => c.attendanceForm);
                let { data, error } = yield ClassService_1.default.uploadClasses(classes, attendanceForms);
                if (error) {
                    return res.status(503).json({ message: error });
                }
                return res.status(200).json(data);
            }
            catch (e) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}
exports.default = new ClassesController();
