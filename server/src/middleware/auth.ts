import { Request, Response, NextFunction } from 'express';  // express types
import jwt from 'jsonwebtoken';

/* interface IRequestAuth extends Request {
    userId: any;
}; */

interface IRequestAuth<ReqBody = { userId: any }> extends Request{ };

interface UserPayload{
    id: any;
};

// middleware for authentication
export const auth = async (req: IRequestAuth, res: Response, next: NextFunction) => {
    try {
        // get auth token
        const token = req.headers.authorization?.split(" ")[1];
        // if token exists
        if(token){
            // check if is a google auth token or our own
            const isCustomToken = token.length < 500;

            let decodedData;

            // if it's our custom token (not google's)
            if(isCustomToken){
                // decodedData = jwt.verify(token, secret key)
                decodedData = jwt.verify(token, 'secretword') as UserPayload;
                // set userId on request = decodedData.id
                // req.userId = decodedData.id;
                res.locals.userId = decodedData.id;
            } else {    // if it's google auth token 
                // decodedData = jwt.decode(token)
                decodedData = jwt.decode(token);
                // set userId on request = decodedData.sub
                // req.userId = decodedData?.sub;
                res.locals.userId = decodedData?.sub;
            }
        }
        // move on to next middleware
        next();
    } catch (error: unknown) {
        console.log(error);
    }
};