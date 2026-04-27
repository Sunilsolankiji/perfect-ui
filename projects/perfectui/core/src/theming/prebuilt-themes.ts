import type { PerfectUITheme, PerfectUIColorShades } from './theme.models';

/**
 * Helper function to create color shades
 */
function createColorShades(
  shades: Omit<PerfectUIColorShades, 'contrast'>,
  contrast: PerfectUIColorShades['contrast']
): PerfectUIColorShades {
  return { ...shades, contrast };
}

// ============================================================
// INDIGO-PINK THEME (Default)
// ============================================================
const INDIGO: PerfectUIColorShades = createColorShades(
  {
    50: '#e8eaf6',
    100: '#c5cae9',
    200: '#9fa8da',
    300: '#7986cb',
    400: '#5c6bc0',
    500: '#3f51b5',
    600: '#3949ab',
    700: '#303f9f',
    800: '#283593',
    900: '#1a237e',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#ffffff',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

const PINK: PerfectUIColorShades = createColorShades(
  {
    50: '#fce4ec',
    100: '#f8bbd9',
    200: '#f48fb1',
    300: '#f06292',
    400: '#ec407a',
    500: '#e91e63',
    600: '#d81b60',
    700: '#c2185b',
    800: '#ad1457',
    900: '#880e4f',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

const RED: PerfectUIColorShades = createColorShades(
  {
    50: '#ffebee',
    100: '#ffcdd2',
    200: '#ef9a9a',
    300: '#e57373',
    400: '#ef5350',
    500: '#f44336',
    600: '#e53935',
    700: '#d32f2f',
    800: '#c62828',
    900: '#b71c1c',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

const GREEN: PerfectUIColorShades = createColorShades(
  {
    50: '#e8f5e9',
    100: '#c8e6c9',
    200: '#a5d6a7',
    300: '#81c784',
    400: '#66bb6a',
    500: '#4caf50',
    600: '#43a047',
    700: '#388e3c',
    800: '#2e7d32',
    900: '#1b5e20',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#000000',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

const BLUE: PerfectUIColorShades = createColorShades(
  {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565c0',
    900: '#0d47a1',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#000000',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

export const INDIGO_PINK_THEME: PerfectUITheme = {
  name: 'indigo-pink',
  palette: {
    primary: INDIGO,
    accent: PINK,
    warn: RED,
    success: GREEN,
    info: BLUE,
  },
};

// ============================================================
// DEEP-PURPLE-AMBER THEME
// ============================================================
const DEEP_PURPLE: PerfectUIColorShades = createColorShades(
  {
    50: '#ede7f6',
    100: '#d1c4e9',
    200: '#b39ddb',
    300: '#9575cd',
    400: '#7e57c2',
    500: '#673ab7',
    600: '#5e35b1',
    700: '#512da8',
    800: '#4527a0',
    900: '#311b92',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#ffffff',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

const AMBER: PerfectUIColorShades = createColorShades(
  {
    50: '#fff8e1',
    100: '#ffecb3',
    200: '#ffe082',
    300: '#ffd54f',
    400: '#ffca28',
    500: '#ffc107',
    600: '#ffb300',
    700: '#ffa000',
    800: '#ff8f00',
    900: '#ff6f00',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#000000',
    500: '#000000',
    600: '#000000',
    700: '#000000',
    800: '#000000',
    900: '#000000',
  }
);

export const DEEP_PURPLE_AMBER_THEME: PerfectUITheme = {
  name: 'deep-purple-amber',
  palette: {
    primary: DEEP_PURPLE,
    accent: AMBER,
    warn: RED,
    success: GREEN,
    info: BLUE,
  },
};

// ============================================================
// PINK-BLUE-GREY THEME
// ============================================================
const BLUE_GREY: PerfectUIColorShades = createColorShades(
  {
    50: '#eceff1',
    100: '#cfd8dc',
    200: '#b0bec5',
    300: '#90a4ae',
    400: '#78909c',
    500: '#607d8b',
    600: '#546e7a',
    700: '#455a64',
    800: '#37474f',
    900: '#263238',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

export const PINK_BLUE_GREY_THEME: PerfectUITheme = {
  name: 'pink-blue-grey',
  palette: {
    primary: PINK,
    accent: BLUE_GREY,
    warn: RED,
    success: GREEN,
    info: BLUE,
  },
};

// ============================================================
// PURPLE-GREEN THEME
// ============================================================
const PURPLE: PerfectUIColorShades = createColorShades(
  {
    50: '#f3e5f5',
    100: '#e1bee7',
    200: '#ce93d8',
    300: '#ba68c8',
    400: '#ab47bc',
    500: '#9c27b0',
    600: '#8e24aa',
    700: '#7b1fa2',
    800: '#6a1b9a',
    900: '#4a148c',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#ffffff',
    400: '#ffffff',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

export const PURPLE_GREEN_THEME: PerfectUITheme = {
  name: 'purple-green',
  palette: {
    primary: PURPLE,
    accent: GREEN,
    warn: RED,
    success: GREEN,
    info: BLUE,
  },
};

// ============================================================
// CYAN-ORANGE THEME
// ============================================================
const CYAN: PerfectUIColorShades = createColorShades(
  {
    50: '#e0f7fa',
    100: '#b2ebf2',
    200: '#80deea',
    300: '#4dd0e1',
    400: '#26c6da',
    500: '#00bcd4',
    600: '#00acc1',
    700: '#0097a7',
    800: '#00838f',
    900: '#006064',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#000000',
    500: '#ffffff',
    600: '#ffffff',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

const ORANGE: PerfectUIColorShades = createColorShades(
  {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
  },
  {
    50: '#000000',
    100: '#000000',
    200: '#000000',
    300: '#000000',
    400: '#000000',
    500: '#000000',
    600: '#000000',
    700: '#ffffff',
    800: '#ffffff',
    900: '#ffffff',
  }
);

export const CYAN_ORANGE_THEME: PerfectUITheme = {
  name: 'cyan-orange',
  palette: {
    primary: CYAN,
    accent: ORANGE,
    warn: RED,
    success: GREEN,
    info: BLUE,
  },
};

// ============================================================
// THEME MAP
// ============================================================
export const PREBUILT_THEMES: Record<string, PerfectUITheme> = {
  'indigo-pink': INDIGO_PINK_THEME,
  'deep-purple-amber': DEEP_PURPLE_AMBER_THEME,
  'pink-blue-grey': PINK_BLUE_GREY_THEME,
  'purple-green': PURPLE_GREEN_THEME,
  'cyan-orange': CYAN_ORANGE_THEME,
};
