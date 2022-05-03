var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from 'jsonwebtoken';
;
;
// middleware for authentication
export const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // get auth token
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        // if token exists
        if (token) {
            // check if is a google auth token or our own
            const isCustomToken = token.length < 500;
            let decodedData;
            // if it's our custom token (not google's)
            if (isCustomToken) {
                // decodedData = jwt.verify(token, secret key)
                decodedData = jwt.verify(token, 'secretword');
                // set userId on request = decodedData.id
                // req.userId = decodedData.id;
                res.locals.userId = decodedData.id;
            }
            else { // if it's google auth token 
                // decodedData = jwt.decode(token)
                decodedData = jwt.decode(token);
                // set userId on request = decodedData.sub
                // req.userId = decodedData?.sub;
                res.locals.userId = decodedData === null || decodedData === void 0 ? void 0 : decodedData.sub;
            }
        }
        // move on to next middleware
        next();
    }
    catch (error) {
        console.log(error);
    }
});
