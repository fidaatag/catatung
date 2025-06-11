// Type Imports
import type {ChildrenType} from '@core/types';

// Component Imports
import Providers from '@components/Providers';
import BlankLayout from '@layouts/BlankLayout';

// Library Imports
import {Suspense} from 'react';

function Layout({children}: ChildrenType) {
  const direction = 'ltr';

  return (
    <Providers direction={direction}>
      <BlankLayout>
        <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 md:p-8">
          <Suspense fallback={<div className="w-full max-w-2xl">Loading...</div>}>{children}</Suspense>
        </div>
      </BlankLayout>
    </Providers>
  );
}

export default Layout;
