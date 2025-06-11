// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css';

// Type Imports
import type {ChildrenType} from '@core/types';

// Style Imports
import '@/app/globals.css';

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css';
import type {Metadata} from 'next';
import {ConfirmDialog} from 'primereact/confirmdialog';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import {ReactQueryProvider} from '@/providers/react-query/react-query.provider';
import {ToastProvider} from '@/providers/toast/toast.provider';
import {UserProvider} from '@/providers/user/user.provider';

export const metadata: Metadata = {
  title: 'Next.js Frontend',
  description: 'Frontend powered by Next.js',
};

function RootLayout({children}: ChildrenType) {
  const direction = 'ltr';

  return (
    <html lang="en" id="__next" dir={direction}>
      <body>
        <ToastProvider>
          <ConfirmDialog />
          <UserProvider>
            <ReactQueryProvider>
              <div className="flex is-full min-bs-full flex-auto flex-col">{children}</div>
            </ReactQueryProvider>
          </UserProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

export default RootLayout;
