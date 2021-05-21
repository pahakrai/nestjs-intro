import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    console.log("wat wat");
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    console.log(request.headers, "request here");
    const authHeader = request.headers['authorization'];
    console.log(authHeader, this.configService.get('API_KEY'));
    return authHeader === this.configService.get('API_KEY');
  }
}
