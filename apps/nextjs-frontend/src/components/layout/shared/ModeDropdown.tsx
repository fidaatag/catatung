'use client';

// React Imports
import {useRef, useState} from 'react';

// MUI Imports
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

// Hook Imports
import {useSettings} from '@core/hooks/useSettings';

function ModeDropdown() {
  // States
  const [tooltipOpen, setTooltipOpen] = useState(false);

  // Refs
  const anchorRef = useRef<HTMLButtonElement>(null);

  // Hooks
  const {settings, updateSettings} = useSettings();

  const handleToggle = () => {
    if (settings.mode === 'dark') {
      updateSettings({mode: 'light'});
    }

    if (settings.mode === 'light') {
      updateSettings({mode: 'dark'});
    }
  };

  const getModeIcon = () => {
    if (settings.mode === 'dark') {
      return 'ri-moon-clear-line';
    }

    return 'ri-sun-line';
  };

  return (
    <Tooltip
      title={settings.mode + ' Mode'}
      open={tooltipOpen}
      PopperProps={{className: 'capitalize'}}
      onOpen={() => {
        setTooltipOpen(true);
      }}
      onClose={() => {
        setTooltipOpen(false);
      }}
    >
      <IconButton ref={anchorRef} className="text-textPrimary" onClick={handleToggle}>
        <i className={getModeIcon()} />
      </IconButton>
    </Tooltip>
  );
}

export default ModeDropdown;
