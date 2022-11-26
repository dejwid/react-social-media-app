import Layout from "../components/Layout";
import PostFormCard from "../components/PostFormCard";
import PostCard from "../components/PostCard";

export default function Home() {
  return (
    <Layout>
      <PostFormCard />
      <PostCard />
    </Layout>
  )
}
