import Layout from "../components/Layout";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import Link from "next/link";
import PostCard from "../components/PostCard";
import {useRouter} from "next/router";
import FriendInfo from "../components/FriendInfo";
import {useEffect, useState} from "react";
import {useSession, useSupabaseClient} from "@supabase/auth-helpers-react";
import Cover from "../components/Cover";
import ProfileTabs from "../components/ProfileTabs";
import ProfileContent from "../components/ProfileContent";
import {UserContextProvider} from "../contexts/UserContext";

export default function ProfilePage() {
  const [profile,setProfile] = useState(null);
  const [editMode,setEditMode] = useState(false);
  const [name,setName] = useState('');
  const [place,setPlace] = useState('');
  const router = useRouter();
  const tab = router?.query?.tab?.[0] || 'posts';
  const session = useSession();
  const userId = router.query.id;

  const supabase = useSupabaseClient();

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetchUser();
  }, [userId]);

  function fetchUser() {
    supabase.from('profiles')
      .select()
      .eq('id', userId)
      .then(result => {
        if (result.error) {
          throw result.error;
        }
        if (result.data) {
          setProfile(result.data[0]);
        }
      });
  }

  function saveProfile() {
    supabase.from('profiles')
      .update({
        name,
        place,
      })
      .eq('id', session.user.id)
      .then(result => {
        if (!result.error) {
          setProfile(prev => ({...prev,name,place}));
        }
        setEditMode(false);
      });
  }


  const isMyUser = userId === session?.user?.id;

  return (
    <Layout>
      <UserContextProvider>
        <Card noPadding={true}>
          <div className="relative overflow-hidden rounded-md">
            <Cover url={profile?.cover} editable={isMyUser} onChange={fetchUser} />
            <div className="absolute top-24 left-4 z-20">
              {profile && (
                <Avatar url={profile.avatar} size={'lg'} editable={isMyUser} onChange={fetchUser} />
              )}
            </div>
            <div className="p-4 pt-0 md:pt-4 pb-0">
              <div className="ml-24 md:ml-40 flex justify-between">
                <div>
                  {editMode && (
                    <div>
                      <input type="text"
                             className="border py-2 px-3 rounded-md"
                             placeholder={'Your name'}
                             onChange={ev => setName(ev.target.value)}
                             value={name}/>
                    </div>
                  )}
                  {!editMode && (
                    <h1 className="text-3xl font-bold">
                      {profile?.name}
                    </h1>
                  )}
                  {!editMode && (
                    <div className="text-gray-500 leading-4">
                      {profile?.place || 'Internet'}
                    </div>
                  )}
                  {editMode && (
                    <div>
                      <input type="text"
                             className="border py-2 px-3 rounded-md mt-1"
                             placeholder={'Your location'}
                             onChange={ev => setPlace(ev.target.value)}
                             value={place}/>
                    </div>
                  )}
                </div>
                <div className="grow">
                  <div className="text-right">
                    {isMyUser && !editMode && (
                      <button
                        onClick={() => {
                          setEditMode(true);
                          setName(profile.name);
                          setPlace(profile.place);
                        }}
                        className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit profile
                      </button>
                    )}
                    {isMyUser && editMode && (
                      <button onClick={saveProfile} className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2">
                        Save profile
                      </button>
                    )}
                    {isMyUser && editMode && (
                      <button onClick={() => setEditMode(false)} className="inline-flex mx-1 gap-1 bg-white rounded-md shadow-sm shadow-gray-500 py-1 px-2">
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <ProfileTabs active={tab} userId={profile?.id} />
            </div>
          </div>
        </Card>
        <ProfileContent activeTab={tab} userId={userId} />
      </UserContextProvider>
    </Layout>
  );
}