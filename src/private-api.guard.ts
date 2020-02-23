import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { api_keyword } from './public-api.decorator';

@Injectable()
export class PrivateApiGuard implements CanActivate {
  /**
   *
   */
  constructor(private readonly reflector: Reflector) {
    
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest();
      const isPublic = this.reflector.get<boolean>(api_keyword, context.getHandler());
      return !(request.headers.public === "true") || isPublic;
    }
    else {
      return true;
    }
    
  }
}
