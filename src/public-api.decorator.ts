import { SetMetadata } from '@nestjs/common';

export const api_keyword: string = 'public-api'

export const PublicApi = (...args: string[]) => SetMetadata(api_keyword, true);
