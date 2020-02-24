import { SetMetadata } from '@nestjs/common';

export const allowed_consumer_groups_keyword: string = 'x-consumer-groups'

export const AllowedConsumerGroups = (...groups: string[]) => SetMetadata(allowed_consumer_groups_keyword, groups);
