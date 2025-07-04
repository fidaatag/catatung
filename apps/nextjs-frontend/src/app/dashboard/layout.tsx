// Type Imports
import type {ChildrenType} from '@core/types';

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper';
import VerticalLayout from '@layouts/VerticalLayout';

// Component Imports
import Providers from '@components/Providers';
import Navigation from '@components/layout/vertical/Navigation';
import Navbar from '@components/layout/vertical/Navbar';
// import VerticalFooter from '@components/layout/vertical/Footer'

function Layout({children}: ChildrenType) {
  // Vars
  const direction = 'ltr';

  return (
    <Providers direction={direction}>
      <LayoutWrapper
        verticalLayout={
          <VerticalLayout navigation={<Navigation />} navbar={<Navbar />}>
            {children}
          </VerticalLayout>
        }
      />
    </Providers>
  );
}

export default Layout;
