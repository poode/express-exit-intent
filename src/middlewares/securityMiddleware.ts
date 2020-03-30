import { NextFunction as ExpressNext, Response as ExpressResponse,
         Request as ExpressRequest } from 'express';
import { Req, Middleware, Next, Res, IMiddleware } from '@tsed/common';
import * as lusca from 'lusca';

/**
 * Web application security middleware.
 */
@Middleware()
export class SecurityMiddleware implements IMiddleware {

  // noinspection JSMethodCanBeStatic
  /**
   * @param res
   * @param req
   * @param next
   */
  use(@Req() req: ExpressRequest,
      @Res() res: ExpressResponse,
      @Next() next: ExpressNext) {

    res.json = (data: any) => {
      // Default `Content-Type` for `res.send()` is `text/html` so we need to reset it
      res.set('Content-Type', 'application/json');

      if (typeof data !== 'object' ) {
        return res.send(data);
      }

      let strData = JSON.stringify(data);

      // Handle JSON vulnerability to protect against JSON/JSONP attacks.
      strData = `)]}',\n${strData}`;

      return res.send(strData);
    };

    // Workaround to let support fetching CSRF token from the cookies.
    req.headers['x-xsrf-token'] = req.cookies['XSRF-TOKEN'];

    lusca({
      csrf: {
        angular: true,
      },
      csp: {
        policy: {
          'default-src': '\'self\' \'unsafe-eval\' \'unsafe-inline\'; font-src \'self\' data:;',
        },
      },

      // Adding the HTTP X-XSS-Protection response header (Useful for old browsers)
      xssProtection: true,
    })(req, res, next);
  }
}
