/*
 ! This file is for adding custom types to the MUI theme, components and props.
 ! Please do not remove anything from this file as it may break the application.
 ! You can add your own custom types to the MUI theme, components and props in this file
 ! but you must be aware about the MUI theme structure along with MUI CSS Variables.
 ! MUI Theme: https://mui.com/material-ui/customization/default-theme/
 ! MUI CSS Variables: https://mui.com/material-ui/experimental-api/css-theme-variables/overview/
 */

// MUI Imports
import {} from '@mui/material/styles';

declare module '@mui/material/styles' {
  // Theme
  type Theme = {
    shape: {
      borderRadius: number;
      customBorderRadius: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
    customShadows: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    mainColorChannels: {
      light: string;
      dark: string;
      lightShadow: string;
      darkShadow: string;
    };
  };
  type ThemeOptions = {
    shape?: {
      borderRadius?: number;
      customBorderRadius?: {
        xs?: number;
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
    };
    customShadows?: {
      xs?: string;
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    };
    mainColorChannels?: {
      light?: string;
      dark?: string;
      lightShadow?: string;
      darkShadow?: string;
    };
  };

  // Palette Color
  type PaletteColor = {
    lighterOpacity?: string;
    lightOpacity?: string;
    mainOpacity?: string;
    darkOpacity?: string;
    darkerOpacity?: string;
  };
  type SimplePaletteColorOptions = {
    lighterOpacity?: string;
    lightOpacity?: string;
    mainOpacity?: string;
    darkOpacity?: string;
    darkerOpacity?: string;
  };

  // Palette
  type Palette = {
    customColors: {
      bodyBg: string;
      chatBg: string;
      greyLightBg: string;
      inputBorder: string;
      tableHeaderBg: string;
      tooltipText: string;
      trackBg: string;
    };
  };
  type PaletteOptions = {
    customColors?: {
      bodyBg?: string;
      chatBg?: string;
      greyLightBg?: string;
      inputBorder?: string;
      tableHeaderBg?: string;
      tooltipText?: string;
      trackBg?: string;
    };
  };
}

declare module '@mui/material/Chip' {
  type ChipPropsVariantOverrides = {
    tonal: true;
  };
}

declare module '@mui/material/Pagination' {
  type PaginationPropsVariantOverrides = {
    tonal: true;
  };
}

declare module '@mui/lab/TimelineDot' {
  type TimelineDotPropsVariantOverrides = {
    tonal: true;
  };
}
