import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ReturnType } from '@/types';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // console.log(' context.getHandler()', context.getHandler());

    const returnType = this.reflector.get<ReturnType>(
      'returnType',
      context.getHandler(),
    );
    // console.log('returnType',returnType);

    return next.handle().pipe(
      map((data) => {
        switch (returnType) {
          case 'primitive':
            return data;
          default:
            return {
              code: 200,
              message: 'OK',
              data,
            };
        }
      }),
    );
  }
}
