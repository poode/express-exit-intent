/// <reference types="jest" />
import * as fs from 'fs';
import * as $ from 'jquery';
import * as jsCookie from 'js-cookie';

import { LoggerFactory } from './logger';
import { ExitPopup, getExitPopupInstance } from './exitPopup';
import { ERROR_MESSAGES } from '../../../src/constants/errorMessages';

describe('Exit Popup Unit Tests', () => {
  let exitPopup: ExitPopup;

  beforeEach(() => {
    jest.restoreAllMocks();
    exitPopup = getExitPopupInstance(jsCookie, $, LoggerFactory, ERROR_MESSAGES);
  });

  describe('ExitPopup.init()', () => {

    it('should validate cookieExpInDays option existence', () => {
      expect(exitPopup.init.bind(exitPopup)).toThrowError();
    });

    it('should validate cookieExpInDays option is more than or eq zero', () => {
      expect(() => exitPopup.init({ cookieExpInDays: -1 })).toThrowError();
    });

    it('should setup cookies properly', () => {
      const jsCookieSpy = jest.spyOn(jsCookie, 'remove');
      exitPopup.init({ cookieExpInDays: 0 });
      expect(jsCookieSpy).toHaveBeenCalledTimes(1);
    });

    it('should setup cookies properly: Remove cookies if expired', () => {
      const jsCookieRemoveSpy = jest.spyOn(jsCookie, 'remove');
      exitPopup.init({ cookieExpInDays: 0 });
      expect(jsCookieRemoveSpy).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Exit Popup Integration Tests', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should show the popup if the mouse is exiting the window', () => {
    document.body.innerHTML = <string> <unknown> fs.readFileSync('./index.html');
    const exitPopup = getExitPopupInstance(jsCookie, $, LoggerFactory, ERROR_MESSAGES);
    exitPopup.init({ cookieExpInDays: 0 });
    $(document).trigger('mouseout');
    expect($('.exit-popup').hasClass('exit-popup-shown')).toBeTruthy();
  });

  it('should close the popup if clicked the "x"', () => {
    document.body.innerHTML = <string> <unknown> fs.readFileSync('./index.html');
    const exitPopup = getExitPopupInstance(jsCookie, $, LoggerFactory, ERROR_MESSAGES);
    exitPopup.init({ cookieExpInDays: 0 });
    $(document).trigger('mouseout');
    $('.exit-popup-close-btn').click();
    expect($('.exit-popup').hasClass('exit-popup-shown')).toBeFalsy();
  });

  it('should submit the email', () => {
    document.body.innerHTML = <string> <unknown> fs.readFileSync('./index.html');
    const exitPopup = getExitPopupInstance(jsCookie, $, LoggerFactory, ERROR_MESSAGES);
    exitPopup.init({ cookieExpInDays: 0 });
    $(document).trigger('mouseout');
    $('.exit-popup-email').val('test@example.com');
    const $ajaxSpy = jest.spyOn($, 'ajax');
    $('.form-submit').click();
    expect($ajaxSpy).toBeCalled();
  });
});
