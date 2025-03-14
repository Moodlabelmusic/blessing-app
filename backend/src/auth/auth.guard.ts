import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      await this.verifyToken(token);
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private verifyToken(token) {
    const authConfig = this.configService.get("authConfig");
    return new Promise((resolve, reject) => {
      jwt.verify(token, authConfig.privateKey, (err, _) => {
        if (err) {
          return reject(err);
        }
        resolve(true);
      })
    })
  }
}