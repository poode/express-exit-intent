import * as jquery from 'jquery';
import * as jsCookie from 'js-cookie';
import { Logger } from 'winston';

import { LoggerFactory } from './logger';
import { ERROR_MESSAGES } from '../../../src/constants/errorMessages';

interface ExitPopupOptions {
  cookieExpInDays: number;
}

export class ExitPopup {
  // Cached Elements
  private $documentEl: JQuery<Document>;
  private $popupEl: JQuery<HTMLElement>;
  private $popupFormEl: JQuery<HTMLElement>;
  private $exitPopupCloseBtnEl: JQuery<HTMLElement>;
  private $exitPopupEmailEl: JQuery<HTMLElement>;

  // Other class members
  private isPopupOpened = false;
  private cookieExpInDays: number;

  constructor(private readonly cookieObj: jsCookie.CookiesStatic,
              private readonly $: typeof jquery,
              private readonly logger: Logger,
              private readonly errorMessages: typeof ERROR_MESSAGES) {

    // Caching DOM elements for better DOM manipulation
    this.$documentEl = this.$(document);
    this.$popupEl = this.$('.exit-popup');
    this.$popupFormEl = this.$('.popup-form');
    this.$exitPopupCloseBtnEl = this.$('.exit-popup-close-btn');
    this.$exitPopupEmailEl = this.$('.exit-popup-email');
  }

  /**
   * Initialization of the popup and passing the needed options
   *
   * @param cookieExpInDays
   */
  init({ cookieExpInDays}: ExitPopupOptions) {
    if (typeof cookieExpInDays !== 'number' || cookieExpInDays < 0) {
      throw new Error(`${this.constructor.name}.${this.init.name}: Bad options!`);
    }

    this.cookieExpInDays = cookieExpInDays;

    this.logger.debug(`${this.init.name}: cookieExpiration = ${cookieExpInDays}`);

    this.removeExpiredCookie();

    if (this.shouldIgnorePopup()) {
      this.logger.info(`${this.init.name}: Ignoring the popup for current session`);

      return this;
    }

    // Load events
    this.setupEvents();

    this.logger.debug(`${this.init.name}: Instantiated successfully!`);

    return this;
  }

  /**
   * Handle cookie expiration.
   */
  private removeExpiredCookie() {
    // If cookie expired, remove it
    if (this.cookieExpInDays !== 0) {
      return;
    }

    this.logger.debug(`${this.removeExpiredCookie.name}: Cookie expired so it's removed!`);
    this.cookieObj.remove('isExitPopupShown');
  }

  /**
   * Use this method to save the popup cookie.
   */
  private savePopupCookie() {
    this.logger.debug(`${this.savePopupCookie.name}: First time appearance. Save the cookie`);
    this.cookieObj.set('isExitPopupShown', 'true', {expires: this.cookieExpInDays});
  }

  /**
   * Use this method to check if the popup has been shown before.
   */
  private shouldIgnorePopup() {
    return this.cookieObj.get('isExitPopupShown') === 'true';
  }

  /**
   * Setup all needed events
   */
  private setupEvents() {
    this.$documentEl.mouseout(this.onDocumentMouseout.bind(this));
    this.$exitPopupCloseBtnEl.click(this.hidePopup.bind(this));
    this.$popupFormEl.submit(this.submitPopupForm.bind(this));

    this.logger.debug(`${this.setupEvents.name}: Events setup success!`);
  }

  /**
   * Detect if the mouse is exiting the window and show the popup
   *
   * @param ev
   */
  private onDocumentMouseout(ev: Event) {
    const target = (<any>ev).relatedTarget || (<any>ev).toElement;

    this.logger.silly(`${this.onDocumentMouseout.name}: Target = ${target}`);

    if (!target || target.nodeName === 'HTML') {
      this.showPopup();
    }
  }

  /**
   * Display the popup and set `isPopupOpened` flag to avoid opening again at the current session
   */
  private showPopup() {
    if (this.isPopupOpened) {
      this.logger.debug(`${this.showPopup.name}: Popup won't appear as it has appeared before!`);

      return;
    }

    this.savePopupCookie();
    this.$popupEl.addClass('exit-popup-shown');
    this.isPopupOpened = true;
    this.logger.debug(`${this.showPopup.name}: Popup appeared!`);
  }

  /**
   * Hide the popup after clicking the close button
   */
  private hidePopup() {
    this.$popupEl.removeClass('exit-popup-shown');
    this.logger.debug(`${this.showPopup.name}: Popup disappeared!`);
  }

  /**
   * Submit the popup form and acknowledge the user
   */
  private submitPopupForm() {
    this.$popupFormEl.text('Waiting...');
    this.logger.debug(`${this.submitPopupForm.name}: Submitting...`);

    const success = () => {
      this.logger.debug(`${this.submitPopupForm.name}: Submitted successfully!`);
      this.$popupFormEl.text('Thanks for your subscription.');
    };

    this.$.ajax({
      type: 'POST',
      url: `${window.location.origin}/api/subscriptions`,
      crossDomain: true,
      data: {
        email: this.$exitPopupEmailEl.val(),
      },
      converters: {
        'text json': responseBody => {
          // Handle JSON vulnerability response that protect against JSON/JSONP attacks.
          return JSON.parse(responseBody.replace(`)]}',\n`, ''));
        },
      },
      success,
      error: ({ responseText, status, responseJSON: { code } = {} }) => {
        const errCode = this.errorMessages.SUBSCRIPTION_EMAIL_DUPLICATE.code;
        this.logger.debug(`${this.submitPopupForm.name}: Failed to submit! responseText: ${responseText}, status: ${status}, code: ${code}`);
        if (code && code === errCode) {
          success();

          return;
        }

        this.$popupFormEl.text('Something went wrong.');
      },
    });

    return false;
  }
}

/**
 * Use this method to set the dependencies of ExitPopup class.
 */
export function getExitPopupInstance(cookieLib: jsCookie.CookiesStatic,
                                     $: typeof jquery,
                                     LogFactory: typeof LoggerFactory,
                                     errMsg: typeof ERROR_MESSAGES) {

  return new ExitPopup(cookieLib, $, LogFactory.getLoggerIns(ExitPopup.name), errMsg);
}
