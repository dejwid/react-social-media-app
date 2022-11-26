import Layout from "../components/Layout";
import Card from "../components/Card";
import Avatar from "../components/Avatar";
import Link from "next/link";

export default function NotificationsPage() {
  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-300">Notifications</h1>
      <Card noPadding={true}>
        <div className="">
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Link href={'/profile'}>
              <Avatar />
            </Link>
            <div>
              <Link href={'/profile'} className={'font-semibold mr-1 hover:underline'}>John Doe</Link>
              liked
              <Link href={''} className={'ml-1 text-socialBlue hover:underline'}>your photo</Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Link href={'/profile'}>
              <Avatar />
            </Link>
            <div>
              <Link href={'/profile'} className={'font-semibold mr-1 hover:underline'}>John Doe</Link>
              liked
              <Link href={''} className={'ml-1 text-socialBlue hover:underline'}>your photo</Link>
            </div>
          </div>
          <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
            <Link href={'/profile'}>
              <Avatar />
            </Link>
            <div>
              <Link href={'/profile'} className={'font-semibold mr-1 hover:underline'}>John Doe</Link>
              liked
              <Link href={''} className={'ml-1 text-socialBlue hover:underline'}>your photo</Link>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
}