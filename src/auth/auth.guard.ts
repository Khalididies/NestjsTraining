import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const reqest = context.switchToHttp().getRequest();

    // validate request
    // const typeAdmin = reqest.user.auth.includes('admin')

    // return typeAdmin;
    return false;
  }
}
