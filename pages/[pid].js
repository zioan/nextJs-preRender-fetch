import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // this check is needed if fallback: true
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h2>{loadedProduct.title}</h2>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

// for generatic static data for static generated pages
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  // this chech is needed if fallback: true,
  // if the page with this params cannot be created
  // then return notFound nextJs component logic
  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// for dynamic generated static pages
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };

  // return {
  //   paths: [
  //     { params: { pid: 'p1' } },
  //     // { params: { pid: 'p2' } },
  //     // { params: { pid: 'p3' } },
  //   ],
  //   // fallback: false -> you need to add paths for every page
  //   // also handle 404

  //   // fallback: true -> you can specify paths for pages but also
  //   // is creating paths on the fly when visited
  //   // accepting any paramether

  //   // fallback: 'blocking' -> work the same as "true" but no checking is needed
  //   // (see ProductDetailPage function)
  //   // is slower than 'fallback: true'

  //   fallback: 'blocking',
  // };
}

export default ProductDetailPage;
