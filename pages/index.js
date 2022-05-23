import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// for generatic static data for static generated pages
export async function getStaticProps(context) {
  console.log('(Re-)Generating...');
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: '/no-data', // redirect to url (page)
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true }; // 404 page
  }

  return {
    props: {
      products: data.products,
    },
    // rebuild the static page in production every eg. 10 seconds
    revalidate: 10,
  };
}

export default HomePage;
