/* @Protocal() decorator FINAL CODE */
import {
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

export const Protocol = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
      // data can be passed from param decorator
    const request = ctx.switchToHttp().getRequest();
    return request.protocol;
  },
);