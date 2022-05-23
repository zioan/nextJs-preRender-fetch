function UserIdPage(props) {
  return (
    <>
      <h2>{props.id}</h2>
    </>
  );
}

export default UserIdPage;

// run on server on every request
// does not pre-generate pages
// it generate pages on the fly
// does not need the getStaticPaths()
export async function getServerSideProps(context) {
  const { params } = context;
  const userId = params.uid;

  return {
    props: {
      id: 'userID-' + userId,
    },
  };
}
