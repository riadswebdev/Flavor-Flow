
import { getUserSession } from '@/components/lib/core/session';
import UserProfile from './UserProfile';

const ProfilePage = async() => {
    const user = await getUserSession()
    return (
       <UserProfile data={user} />
    );
};

export default ProfilePage;