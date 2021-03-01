import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercept request', req);

        /** добавляет кснществующему реквесту новый header */
        const cloned = req.clone({
            headers: req.headers.append('Auth', 'SOME RANDOM TOKEN')
        });
        return next.handle(cloned)
            .pipe(
                tap( event => {
                    if (event.type === HttpEventType.Response) {
                        /** перехватывает все responses приходящие с сервера */
                        console.log('Interceptor response ', event);
                    }
                })
            );
    }
}
