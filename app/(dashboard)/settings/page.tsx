
import { getUserById } from '@/data/user';
import SettingsComponent from './page-component';
import { currentUser } from '@/lib/auth';

const Settings = async() => {
  const loggedInUser = await currentUser()
 const dbUser = await getUserById(loggedInUser?.id as string)
 const user = {
   name: dbUser?.name,
   birth: dbUser?.birth,
    number: dbUser?.number
  }
  return (
    <SettingsComponent
    user= {user}
    />
  );
};

export default Settings;
