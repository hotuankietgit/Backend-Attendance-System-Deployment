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
class ExtensionValidator {
    constructor() {
        this.isFileValid = (files, allowedExtensions, numberOfFilesAllowed) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!files)
                    return "File is empty";
                let checkFiles = [];
                if (!Array.isArray(files))
                    checkFiles = [files];
                if (checkFiles.length > numberOfFilesAllowed)
                    return `Number of files cannot exceed ${numberOfFilesAllowed}`;
                for (let i = 0; i < checkFiles.length; i++) {
                    if (!this.checkFileExtensionAllowed(checkFiles[i].mimetype, allowedExtensions))
                        return "File extension not allowed";
                }
                return null;
            }
            catch (e) {
                return "Failed handling files";
            }
        });
    }
    checkFileExtensionAllowed(fileExt, allowedExtensions) {
        if (!fileExt)
            return false;
        if (!allowedExtensions)
            return true;
        if (!Array.isArray(allowedExtensions))
            return false;
        return allowedExtensions.includes(fileExt);
    }
}
exports.default = new ExtensionValidator();
