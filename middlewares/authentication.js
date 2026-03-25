import jwt from "jsonwebtoken";

export default function authenticateUser(req,res,next){

        const header = req.header("authorization");


        if (header!= null) {

            const token = header.replace("Bearer ", "");
            
            jwt.verify(token, "i-computers" ,
                (error,decoded)=> {

                    if (decoded ==null) {
                        res.json({message: "Invalid token"});
                    }else {
                        req.user = decoded;
                        next();
                    }
                }
            )

        } else {

            next();

        }
    }