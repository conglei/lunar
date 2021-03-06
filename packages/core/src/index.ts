import Aesthetic, { FontFace } from 'aesthetic';
import AphroditeAesthetic, { NativeBlock, ParsedBlock } from 'aesthetic-adapter-aphrodite';
import { Settings as LuxonSettings } from 'luxon';
import { Path as EmojiPath } from 'interweave-emoji';
import globalStyles from './themes/global';
import lightTheme from './themes/light';
import darkTheme from './themes/dark';
import getLocaleFromClient from './utils/getLocaleFromClient';
import getTimezoneFromClient from './utils/getTimezoneFromClient';
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from './constants';
import {
  Locale,
  TimeZone,
  Logger,
  Translator,
  TranslateParams,
  TranslateProps,
  Theme,
} from './types';

export type Settings = {
  defaultLocale: Locale;
  defaultTimezone: TimeZone;
  emojiCdn: EmojiPath;
  errorUrl: string;
  fontFaces: { [fontFamily: string]: FontFace[] };
  fontFamily: string;
  logger: Logger | null;
  name: string;
  theme: 'light' | 'dark';
  translator: Translator | null;
  translatorComponent: React.ComponentType<TranslateProps> | null;
};

class Core {
  settings: Settings = {
    defaultLocale: getLocaleFromClient() || DEFAULT_LOCALE,
    defaultTimezone: getTimezoneFromClient() || DEFAULT_TIMEZONE,
    emojiCdn: '',
    errorUrl: '',
    fontFaces: {},
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    logger: null,
    name: 'Lunar',
    theme: 'light',
    translator: null,
    translatorComponent: null,
  };

  protected aesthetic?: Aesthetic<Theme, NativeBlock, ParsedBlock>;

  initialize(settings: Partial<Settings> = {}) {
    this.settings = {
      ...this.settings,
      ...settings,
    };

    this.bootstrapAesthetic();
    this.bootstrapLuxon();
  }

  bootstrapAesthetic() {
    const { theme, fontFamily, fontFaces } = this.settings;
    const globals = globalStyles(fontFaces);

    this.aesthetic = new AphroditeAesthetic<Theme>([], {
      theme,
      passThemeProp: false,
      pure: true,
    })
      .registerTheme('light', lightTheme(fontFamily), globals)
      .registerTheme('dark', darkTheme(fontFamily), globals);
  }

  bootstrapLuxon() {
    LuxonSettings.defaultLocale = this.locale();
    LuxonSettings.defaultZoneName = this.timezone();
    LuxonSettings.throwOnInvalid = true;
  }

  getAesthetic() {
    if (__DEV__) {
      if (!this.aesthetic) {
        throw new Error(
          'Aesthetic has not been initialized. Please call `Core.initialize()` from `@airbnb/lunar`.',
        );
      }
    }

    return this.aesthetic!;
  }

  locale(): Locale {
    return this.settings.defaultLocale || DEFAULT_LOCALE;
  }

  log = (error: Error, extra: object) => {
    const { logger } = this.settings;

    if (logger) {
      logger(error, extra);
    }
  };

  timezone(): TimeZone {
    return this.settings.defaultTimezone || DEFAULT_TIMEZONE;
  }

  translate = (phrase: string, params: TranslateParams, context: string) => {
    const { translator } = this.settings;

    if (translator) {
      return translator(phrase, params, context);
    }

    let message = phrase;

    if (phrase.includes('||||')) {
      const [singular, plural] = phrase.split('||||');
      const count = params.smartCount || 0;

      message = count === 1 ? singular : plural;
    }

    // Low-level token interpolation
    return message.replace(/%\{(\w+)\}/g, (match, key) => String(params[key] || ''));
  };
}

export default new Core();
