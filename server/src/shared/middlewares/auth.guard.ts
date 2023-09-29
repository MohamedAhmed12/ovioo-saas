import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload, verify } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext & { user: string | JwtPayload },
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (request) {
      if (!request.headers.authorization) {
        return false;
      }
      request.user = await this.validateToken(request.headers.authorization);
      return true;
    } else {
      const ctx: any = GqlExecutionContext.create(context).getContext();
      if (!ctx?.req?.headers?.authorization) {
        return false;
      }

      ctx.user = await this.validateToken(ctx.req.headers.authorization);
      return true;
    }
  }

  private async validateToken(
    authorization: string,
  ): Promise<string | JwtPayload> {
    const [type, rest] = authorization.split(' ') ?? [];
    const token = type === 'Bearer' ? rest : undefined;

    try {
      const decodedToken = await verify(token, process.env.JWT_TOKEN);
      return decodedToken;
    } catch (err) {
      const message = 'Token error:' + err.message;
      throw new ForbiddenException(message);
    }
  }
}
