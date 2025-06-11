'use client';

// Third-party Imports
import classnames from 'classnames';

// Type Imports
import type {ChildrenType} from '@core/types';

// Util Imports
import {verticalLayoutClasses} from '@layouts/utils/layoutClasses';

// Styled Component Imports
import StyledMain from '@layouts/styles/shared/StyledMain';

function LayoutContent({children}: ChildrenType) {
  return (
    <StyledMain
      isContentCompact
      className={classnames(verticalLayoutClasses.content, verticalLayoutClasses.contentCompact, 'flex-auto is-full')}
    >
      {children}
    </StyledMain>
  );
}

export default LayoutContent;
