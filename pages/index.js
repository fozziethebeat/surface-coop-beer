import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import BeerList from '../components/BeerList';
import Head from '../components/head';
import Nav from '../components/nav';

export default function IndexPage({beers}) {
  return (
<div>
  <Head title="Home" />

  <Nav />

  <div className="w-full">

    <div className="flex justify-center">
      <Image src="/static/Surface.svg" height={360} width={360} />
    </div>

    <div className="w-full text-xl text-center">
      Surface Beer
    </div>
    <p className="text-center">
      Checkout the beers so far
    </p>
  </div>

  <BeerList beers={beers} />
</div>
  );
}

export async function getServerSideProps(context) {
  try {
    const {data : beers} = await axios.get(process.env.DATABASE_ENDPOINT + '/beers');
    return {props : {beers : beers}};
  } catch (error) {
    return {props : {beers : []}};
  }
}
