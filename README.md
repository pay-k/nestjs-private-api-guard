<h1 align="center">
@payk/nestjs-private-api-guard
</h1>
<p align="center">
  <a href="http://nestjs.com"><img src="https://nestjs.com/img/logo_text.svg" width="320" /></a>
</p>

<p align="center">
 API Protection for <a href="https://github.com/nestjs/nest">NestJS</a>
  <br /><br />

  [![Build Status](https://dev.azure.com/payk/PayK%20Public/_apis/build/status/pay-k.nestjs-response-utils?branchName=master)](https://dev.azure.com/payk/PayK%20Public/_build/latest?definitionId=12&branchName=master)

## Installation
```
npm install @payk/nestjs-private-api-guard
```


## What does it do?

## Quick Start
Add a Global Guard
in the `main.ts` after the `app` creation
```ts
  app.useGlobalGuards(new PrivateApiGuard(app.get(Reflector)));
```

### Public End-Point
Each call coming from outside the internal network will carry a header stating it came from the public.
Add a decorator on top of your api end point you wish to expose through the Gateway
```ts
@PublicApi()
@Get()
getAllUsers() {
  return [];
}
```

Any end-point without the `@PublicApi` decorator won't be accessible through the gateway.

The header being used is by default `X-Public-Api` and is `true` when coming from the public domain.

You can choose a different header key name by passing the `PrivateApiGuard` another parameter:
```ts
  app.useGlobalGuards(new PrivateApiGuard(app.get(Reflector), 'X-My-Cool-Public'));
```

### Consumer Group End-Point (ACL)
Each OAuth2 consumer has groups defined on him. We can use those groups in order to define access to specific end-point - for example, only the BackOffice can access that end-point, not the mobile (it's not per user, it's per consumer)
Add a decorator on top of your api end point you wish to expose through the Gateway to a list of groups
```ts
@AllowedConsumerGroups('backoffice', 'admins')
@Get()
getAllUsers() {
  return [];
}
```

