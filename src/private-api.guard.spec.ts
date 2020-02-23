import { Reflector } from '@nestjs/core';
import { PrivateApiGuard } from './private-api.guard';

describe('PrivateApiGuard', () => {
  it('should be defined', () => {
    expect(new PrivateApiGuard(new Reflector())).toBeDefined();
  });
});
