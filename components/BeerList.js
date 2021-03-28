import BeerItem from './BeerItem';

export default function BeerList({ beers }) {
  return (
<section className="px-4 sm:px-6 lg:px-4 xl:px-6 pt-4 pb-4 sm:pb-6 lg:pb-4 xl:pb-6 space-y-4">
  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
    {
      beers.map(beer => (
        <BeerItem key={beer.slug} beer={beer} />
      ))
    }
  </ul>
</section>
  );
}
