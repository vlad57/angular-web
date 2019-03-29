import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

export class Interceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    /*console.log('---');
    console.log('Operation:', req.body.operationName);
    console.log('Accept:', req.headers.get('accept'));
    console.log('Authorization:', req.headers.get('Authorization'));*/
    return next.handle(req);
  }
}
