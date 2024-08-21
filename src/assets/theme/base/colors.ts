/**
 * The base colors for the  ALDR Tech Dashboard.
 * You can add new color using this file.
 * You can customized the colors for the entire  ALDR Tech Dashboard using thie file.
 */

// types
interface ColorsTypes {
  main: string;
  focus: string;
}

interface GradientsTypes {
  main: string;
  state: string;
}

interface SocialMediaColorsTypes {
  main: string;
  dark: string;
}

interface BadgeColorsTypes {
  background: string;
  text: string;
}

interface Types {
  background:
    | {
        default: string;
        sidenav?: string;
        card?: string;
      }
    | any;
  white:
    | {
        main: string;
        focus: string;
      }
    | any;
  text:
    | {
        main: string;
        focus: string;
        primary?: string;
        secondary?: string;
        disabled?: string;
      }
    | any;
  transparent:
    | {
        main: string;
      }
    | any;
  black:
    | {
        light: string;
        main: string;
        focus: string;
      }
    | any;
  primary: ColorsTypes | any;
  secondary: ColorsTypes | any;
  info: ColorsTypes | any;
  success: ColorsTypes | any;
  warning: ColorsTypes | any;
  error: ColorsTypes | any;
  light: ColorsTypes | any;
  dark: ColorsTypes | any;
  grey:
    | {
        [key: string | number]: string;
      }
    | any;
  gradients:
    | {
        primary: GradientsTypes;
        secondary: GradientsTypes;
        info: GradientsTypes;
        success: GradientsTypes;
        warning: GradientsTypes;
        error: GradientsTypes;
        light: GradientsTypes;
        dark: GradientsTypes;
      }
    | any;
  socialMediaColors:
    | {
        facebook: SocialMediaColorsTypes;
        twitter: SocialMediaColorsTypes;
        instagram: SocialMediaColorsTypes;
        linkedin: SocialMediaColorsTypes;
        pinterest: SocialMediaColorsTypes;
        youtube: SocialMediaColorsTypes;
        vimeo: SocialMediaColorsTypes;
        slack: SocialMediaColorsTypes;
        dribbble: SocialMediaColorsTypes;
        github: SocialMediaColorsTypes;
        reddit: SocialMediaColorsTypes;
        tumblr: SocialMediaColorsTypes;
      }
    | any;
  badgeColors:
    | {
        primary: BadgeColorsTypes;
        secondary: BadgeColorsTypes;
        info: BadgeColorsTypes;
        success: BadgeColorsTypes;
        warning: BadgeColorsTypes;
        error: BadgeColorsTypes;
        light: BadgeColorsTypes;
        dark: BadgeColorsTypes;
      }
    | any;
  coloredShadows:
    | {
        [key: string]: string;
      }
    | any;
  inputBorderColor: string;
  tabs:
    | {
        indicator:
          | {
              boxShadow: string;
            }
          | any;
      }
    | any;
}

const colors: Types = {
  background: {
    default: process.env.REACT_APP_BACKGROUND_DEFAULT,
    sidenav: process.env.REACT_APP_BACKGROUND_SIDENAV,
    card: process.env.REACT_APP_BACKGROUND_CARD,
  },

  text: {
    main: process.env.REACT_APP_TEXT_MAIN,
    focus: process.env.REACT_APP_TEXT_FOCUS,
    primary: process.env.REACT_APP_TEXT_PRIMARY,
    secondary: process.env.REACT_APP_TEXT_SECONDARY,
    disabled: process.env.REACT_APP_TEXT_DISABLED,
  },

  transparent: {
    main: process.env.REACT_APP_TRANSPARENT_MAIN,
  },

  white: {
    main: process.env.REACT_APP_WHITE_MAIN,
    focus: process.env.REACT_APP_WHITE_FOCUS,
  },

  black: {
    light: process.env.REACT_APP_BLACK_LIGHT,
    main: process.env.REACT_APP_BLACK_MAIN,
    focus: process.env.REACT_APP_BLACK_FOCUS,
  },

  primary: {
    main: process.env.REACT_APP_PRIMARY_MAIN,
    focus: process.env.REACT_APP_PRIMARY_FOCUS,
  },

  secondary: {
    main: process.env.REACT_APP_SECONDARY_MAIN,
    focus: process.env.REACT_APP_SECONDARY_FOCUS,
  },

  info: {
    main: process.env.REACT_APP_INFO_MAIN,
    focus: process.env.REACT_APP_INFO_FOCUS,
  },

  success: {
    main: process.env.REACT_APP_SUCCESS_MAIN,
    focus: process.env.REACT_APP_SUCCESS_FOCUS,
  },

  warning: {
    main: process.env.REACT_APP_WARNING_MAIN,
    focus: process.env.REACT_APP_WARNING_FOCUS,
  },

  error: {
    main: process.env.REACT_APP_ERROR_MAIN,
    focus: process.env.REACT_APP_ERROR_FOCUS,
  },

  light: {
    main: process.env.REACT_APP_LIGHT_MAIN,
    focus: process.env.REACT_APP_LIGHT_FOCUS,
  },

  dark: {
    main: process.env.REACT_APP_DARK_MAIN,
    focus: process.env.REACT_APP_DARK_FOCUS,
  },

  grey: {
    100: process.env.REACT_APP_GREY_100,
    200: process.env.REACT_APP_GREY_200,
    300: process.env.REACT_APP_GREY_300,
    400: process.env.REACT_APP_GREY_400,
    500: process.env.REACT_APP_GREY_500,
    600: process.env.REACT_APP_GREY_600,
    700: process.env.REACT_APP_GREY_700,
    800: process.env.REACT_APP_GREY_800,
    900: process.env.REACT_APP_GREY_900,
  },

  gradients: {
    primary: {
      main: process.env.REACT_APP_GRADIENT_PRIMARY_MAIN,
      state: process.env.REACT_APP_GRADIENT_PRIMARY_STATE,
    },

    secondary: {
      main: process.env.REACT_APP_GRADIENT_SCONDARY_MAIN,
      state: process.env.REACT_APP_GRADIENT_SCONDARY_STATE,
    },

    info: {
      main: process.env.REACT_APP_GRADIENT_INFO_MAIN,
      state: process.env.REACT_APP_GRADIENT_INFO_STATE,
    },

    success: {
      main: process.env.REACT_APP_GRADIENT_SUCCESS_MAIN,
      state: process.env.REACT_APP_GRADIENT_SUCCESS_STATE,
    },

    warning: {
      main: process.env.REACT_APP_GRADIENT_WARNING_MAIN,
      state: process.env.REACT_APP_GRADIENT_WARNING_STATE,
    },

    error: {
      main: process.env.REACT_APP_GRADIENT_ERROR_MAIN,
      state: process.env.REACT_APP_GRADIENT_ERROR_STATE,
    },

    light: {
      main: process.env.REACT_APP_GRADIENT_LIGHT_MAIN,
      state: process.env.REACT_APP_GRADIENT_LIGHT_STATE,
    },

    dark: {
      main: process.env.REACT_APP_GRADIENT_DARK_MAIN,
      state: process.env.REACT_APP_GRADIENT_DARK_STATE,
    },
  },

  socialMediaColors: {
    facebook: {
      main: process.env.REACT_APP_SOCIAL_FACEBOOK_MAIN,
      dark: process.env.REACT_APP_SOCIAL_FACEBOOK_DARK,
    },

    twitter: {
      main: process.env.REACT_APP_SOCIAL_TWITTER_MAIN,
      dark: process.env.REACT_APP_SOCIAL_TWITTER_DARK,
    },

    instagram: {
      main: process.env.REACT_APP_SOCIAL_INSTAGRAM_MAIN,
      dark: process.env.REACT_APP_SOCIAL_INSTAGRAM_DARK,
    },

    linkedin: {
      main: process.env.REACT_APP_SOCIAL_LINKEDIN_MAIN,
      dark: process.env.REACT_APP_SOCIAL_LINKEDIN_DARK,
    },

    pinterest: {
      main: process.env.REACT_APP_SOCIAL_PINTREST_MAIN,
      dark: process.env.REACT_APP_SOCIAL_PINTREST_DARK,
    },

    youtube: {
      main: process.env.REACT_APP_SOCIAL_YOUTUBE_MAIN,
      dark: process.env.REACT_APP_SOCIAL_YOUTUBE_DARK,
    },

    vimeo: {
      main: process.env.REACT_APP_SOCIAL_VIMEO_MAIN,
      dark: process.env.REACT_APP_SOCIAL_VIMEO_DARK,
    },

    slack: {
      main: process.env.REACT_APP_SOCIAL_SLACK_MAIN,
      dark: process.env.REACT_APP_SOCIAL_SLACK_DARK,
    },

    dribbble: {
      main: process.env.REACT_APP_SOCIAL_DRIBBBLE_MAIN,
      dark: process.env.REACT_APP_SOCIAL_DRIBBBLE_DARK,
    },

    github: {
      main: process.env.REACT_APP_SOCIAL_GITHUB_MAIN,
      dark: process.env.REACT_APP_SOCIAL_GITHUB_DARK,
    },

    reddit: {
      main: process.env.REACT_APP_SOCIAL_REDDIT_MAIN,
      dark: process.env.REACT_APP_SOCIAL_REDDIT_DARK,
    },

    tumblr: {
      main: process.env.REACT_APP_SOCIAL_TUMBLR_MAIN,
      dark: process.env.REACT_APP_SOCIAL_TUMBLR_DARK,
    },
  },

  badgeColors: {
    primary: {
      background: process.env.REACT_APP_BADGE_PRIMARY_BACKGROUND,
      text: process.env.REACT_APP_BADGE_PRIMARY_TEXT,
    },

    secondary: {
      background: process.env.REACT_APP_BADGE_SECONDARY_BACKGROUND,
      text: process.env.REACT_APP_BADGE_SECONDARY_TEXT,
    },

    info: {
      background: process.env.REACT_APP_BADGE_INFO_BACKGROUND,
      text: process.env.REACT_APP_BADGE_INFO_TEXT,
    },

    success: {
      background: process.env.REACT_APP_BADGE_SUCCESS_BACKGROUND,
      text: process.env.REACT_APP_BADGE_SUCCESS_TEXT,
    },

    warning: {
      background: process.env.REACT_APP_BADGE_WARNING_BACKGROUND,
      text: process.env.REACT_APP_BADGE_WARNING_TEXT,
    },

    error: {
      background: process.env.REACT_APP_BADGE_ERROR_BACKGROUND,
      text: process.env.REACT_APP_BADGE_ERROR_TEXT,
    },

    light: {
      background: process.env.REACT_APP_BADGE_LIGHT_BACKGROUND,
      text: process.env.REACT_APP_BADGE_LIGHT_TEXT,
    },

    dark: {
      background: process.env.REACT_APP_BADGE_DARK_BACKGROUND,
      text: process.env.REACT_APP_BADGE_DARK_TEXT,
    },
  },

  coloredShadows: {
    primary: process.env.REACT_APP_COLORED_SHADOW_PRIMARY,
    secondary: process.env.REACT_APP_COLORED_SHADOW_SECONDARY,
    info: process.env.REACT_APP_COLORED_SHADOW_INFO,
    success: process.env.REACT_APP_COLORED_SHADOW_SUCCESS,
    warning: process.env.REACT_APP_COLORED_SHADOW_WARNING,
    error: process.env.REACT_APP_COLORED_SHADOW_ERROR,
    light: process.env.REACT_APP_COLORED_SHADOW_LIGHT,
    dark: process.env.REACT_APP_COLORED_SHADOW_DARK,
  },

  inputBorderColor: process.env.REACT_APP_INPUT_BORDER_COLOR,

  tabs: {
    indicator: {
      boxShadow: process.env.REACT_APP_TABS_INDICATOR_BOXSHADOW,
    },
  },
};

export default colors;
