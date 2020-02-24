import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { api_keyword } from './public-api.decorator';
import { allowed_consumer_groups_keyword } from './consumer-groups.decorator';

@Injectable()
export class PrivateApiGuard implements CanActivate {
    /**
     *
     */
    constructor(private readonly reflector: Reflector, private readonly header: string = 'X-Public-Api') {
        
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        if (context.getType() === 'http') {
            const request = context.switchToHttp().getRequest();
            const handler = context.getHandler();
            return this.isPublicCall(handler, request) && this.isAllowedConsumerGroup(handler, request);
        }
        
        return true;
    }

    private isPublicCall(handler: Function, request: any) {
        const isPublic = this.reflector.get<boolean>(api_keyword, handler);
        return !(request.headers[this.header.toLowerCase()] === "true") || isPublic;
    }

    private isAllowedConsumerGroup(handler: Function, request: any) {
        const headerConsumerGroupsStr = request.headers['x-consumer-groups'];
        const headerConsumerGroups = headerConsumerGroupsStr.split(', ');
        const allowedConsumerGroups = this.reflector.get<string[]>(allowed_consumer_groups_keyword, handler);
        if (!!allowedConsumerGroups) {
            // check if header groups are contained in the allowed groups
            allowedConsumerGroups.some(g => headerConsumerGroups.indexOf(g) !== -1);
            return allowedConsumerGroups.some(g => headerConsumerGroups.indexOf(g) !== -1);
        }
        
        return true;
    }
}
