function UserProfilePage(props) {
  return (
    <>
      <h2>{props.username}</h2>
    </>
  );
}

export default UserProfilePage;

export async function getServerSideProps(context) {
  const { params, req, res } = context;

  console.log('Server side code');

  return {
    props: {
      username: 'Ioan',
    },
  };
}
