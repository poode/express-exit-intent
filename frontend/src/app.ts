// CSS
import './styles/exitPopup.scss';

// JavaScript
import * as $ from 'jquery';
import * as jsCookie from 'js-cookie';

import { getExitPopupInstance } from './js/exitPopup';
import { LoggerFactory } from './js/logger';
import { ERROR_MESSAGES } from '../../src/constants/errorMessages';

// Once the DOM has fully loaded
$(document).ready(() => {
  getExitPopupInstance(jsCookie, $, LoggerFactory, ERROR_MESSAGES).init({
    cookieExpInDays: Number(process.env.COOKIE_EXP_IN_DAYS),
  });
});
