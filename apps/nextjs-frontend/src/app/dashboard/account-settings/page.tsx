// React Imports
import type {ReactElement} from 'react';

// Next Imports
import dynamic from 'next/dynamic';

// Component Imports
import AccountSettings from '@views/account-settings';

const AccountTab = dynamic(async () => import('@views/account-settings/account'));
const NotificationsTab = dynamic(async () => import('@views/account-settings/notifications'));
const ConnectionsTab = dynamic(async () => import('@views/account-settings/connections'));

// Vars
const tabContentList = (): Record<string, ReactElement> => ({
  account: <AccountTab />,
  notifications: <NotificationsTab />,
  connections: <ConnectionsTab />,
});

function AccountSettingsPage() {
  return <AccountSettings tabContentList={tabContentList()} />;
}

export default AccountSettingsPage;
