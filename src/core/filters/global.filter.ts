import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class GlobalFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        console.log({
            url: req.url,
            body: req.body,
            headers: req.headers,
        });

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Internal server error";

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const response = exception.getResponse();

            message =
                typeof response === "string"
                    ? response
                    : (response as any)?.message || message;
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        res.status(status).json({
            status,
            message,
        });
    }
}
// import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
// import { Request,Response } from "express";
//
// @Catch()
// export class GlobalFilter implements ExceptionFilter{
//     catch(exception: any, host: ArgumentsHost) {
//         const req=host.switchToHttp().getRequest<Request>();
//         const res=host.switchToHttp().getResponse<Response>();
//         console.log({
//             url:req.url,
//             body:req.body,
//             headers:req.headers
//         });
//         res.status(exception.status).json({message:exception.message,status:exception.status})
//
//     }
// }