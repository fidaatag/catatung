// Component Imports
import Login from '@views/Login';

// Server Action Imports
import {getServerMode} from '@core/utils/serverHelpers';

function LoginPage() {
  const mode = await getServerMode();

  return <Login mode={mode} />;
}

export default LoginPage;
