'use client';

// MUI Imports
import {useTheme} from '@mui/material/styles';

// Third-party Imports
import classnames from 'classnames';

type Props = {
  readonly ltrIconClass: string;
  readonly rtlIconClass: string;
  readonly className?: string;
};

function DirectionalIcon(props: Props) {
  // Props
  const {ltrIconClass, rtlIconClass, className} = props;

  // Hooks
  const theme = useTheme();

  return (
    <i
      className={classnames(
        {
          [ltrIconClass]: theme.direction === 'ltr',
          [rtlIconClass]: theme.direction === 'rtl',
        },
        className,
      )}
    />
  );
}

export default DirectionalIcon;
