import { GetServerSidePropsContext ,InferGetServerSidePropsType,NextPage } from 'next';

const BusinessPage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) =>  {
  return (
    <div>
      <h1>Business page</h1>
      <p>{props.slug}</p>
    </div>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const { query: { slug } } = ctx;
  return {
    props: {
      slug
    }
  }
}

export default BusinessPage;
