// Component Imports
import Providers from '@components/Providers';
import BlankLayout from '@layouts/BlankLayout';
import NotFound from '@views/NotFound';

// Util Imports
import {getServerMode} from '@core/utils/serverHelpers';

function NotFoundPage() {
  // Vars
  const direction = 'ltr';
  const mode = await getServerMode();

  return (
    <Providers direction={direction}>
      <BlankLayout>
        <NotFound mode={mode} />
      </BlankLayout>
    </Providers>
  );
}

export default NotFoundPage;
