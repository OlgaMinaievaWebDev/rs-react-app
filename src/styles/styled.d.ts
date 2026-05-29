import 'styled-components';

import type { AppTheme } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: AppTheme['background'];
    text: AppTheme['text'];
    surface: AppTheme['surface'];
    border: AppTheme['border'];
    mutedText: AppTheme['mutedText'];
    hoverSurface: AppTheme['hoverSurface'];
    primary: AppTheme['primary'];
    primaryText: AppTheme['primaryText'];
    focus: AppTheme['focus'];
    shadow: AppTheme['shadow'];
    link: AppTheme['link'];
    error: AppTheme['error'];
    errorSurface: AppTheme['errorSurface'];
    errorBorder: AppTheme['errorBorder'];
    errorText: AppTheme['errorText'];
  }
}
