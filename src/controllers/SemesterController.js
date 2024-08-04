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
const SemesterService_1 = __importDefault(require("../services/SemesterService"));
class SemesterController {
    constructor() {
        this.addSemester = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let semesterName = req.body.semesterName;
                let semesterDescription = req.body.semesterDescription;
                let startDate = req.body.startDate;
                let endDate = req.body.endDate;
                let { data, error } = yield SemesterService_1.default.addSemester(semesterName, semesterDescription, startDate, endDate);
                if (error) {
                    return res.status(503).json({ message: error });
                }
                return res.status(200).json(data);
            }
            catch (e) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.editSemester = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let semesterID = req.params.id;
                let semesterName = req.body.semesterName;
                let semesterDescription = req.body.semesterDescription;
                let startDate = req.body.startDate;
                let endDate = req.body.endDate;
                let { data, error } = yield SemesterService_1.default.editSemester(semesterID, semesterName, semesterDescription, startDate, endDate);
                if (error) {
                    return res.status(503).json({ message: error });
                }
                return res.status(200).json(data);
            }
            catch (e) {
                console.log(e);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.deleteSemester = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let semesterID = req.params.id;
                if (yield SemesterService_1.default.deleteSemester(semesterID)) {
                    return res.status(200).json({ message: `Successfully deleting semester ${semesterID}` });
                }
                return res.status(503).json({ message: `Failed deleting semester ${semesterID}` });
            }
            catch (e) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.deleteAllSemester = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield SemesterService_1.default.deleteAllSemester()) {
                    return res.status(200).json({ message: "Successfully deleting all semesters" });
                }
                return res.status(503).json({ message: "Failed deleting all semesters" });
            }
            catch (e) {
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
        this.getAllSemester = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { data, error } = yield SemesterService_1.default.getAllSemester();
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
exports.default = new SemesterController();
