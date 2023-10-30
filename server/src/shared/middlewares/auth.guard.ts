import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload, verify } from 'jsonwebtoken';
import { User } from 'src/user/user.entity';

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
      const authorization =
        ctx?.req?.connectionParams?.Authorization ||
        ctx?.req?.headers?.authorization;

      if (!authorization) {
        return false;
      }

      ctx.user = await this.validateToken(authorization);
      return true;
    }
  }

  private async validateToken(
    authorization: string,
  ): Promise<string | JwtPayload> {
    const [type, rest] = authorization.split(' ') ?? [];
    const token = type === 'Bearer' ? rest : undefined;

    try {
      const { email, provider } = await verify(token, process.env.JWT_TOKEN);
      const authUser = await User.findOneOrFail({
        where: {
          email,
          provider,
        },
      });

      return authUser;
    } catch (err) {
      const message = 'Token error: ' + err.message;
      throw new ForbiddenException(message);
    }
  }
}
