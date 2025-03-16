import { getUserById } from "@/data/user"
import SettingsComponent from "./page-component"
import { currentUser } from "@/lib/auth"

const Settings = async () => {
  const loggedInUser = await currentUser()


  if (!loggedInUser?.id) {
    console.log("No user ID found in current user")
    return <SettingsComponent user={{ name: null, birth: null, number: null }} />
  }

  const dbUser = await getUserById(loggedInUser?.id as string)


  const user = {
    name: dbUser?.name,
    birth: dbUser?.birth,
    number: dbUser?.number,
  }
  return <SettingsComponent user={user} />
}

export default Settings

