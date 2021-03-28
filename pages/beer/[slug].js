import axios from 'axios';
import Head from '../../components/head';
import Nav from '../../components/nav';

export default function Beer({beer}) {
  return (
<div>

  <Head title={beer.name} />

  <Nav />

  <div className="text-center text-2xl">
    <h1>
      {beer.name}
    </h1>
  </div>

  <section className="px-4 py-3">
    <div>
      <div className="text-xl">Ingredients</div>

      <div className="py-2">
        <div className="text-lg">Malts</div>
        <div className="grid grid-flow-col grid-cols-3 gap-4">
          {beer.beer_recipes.malts.map(({malt, amount_ratio}) => (
            <div key={malt.slug} className="hover:bg-blue-100 group block rounded-lg p-4 text-base text-center h-26 border border-gray-200">
              {malt.name} @ {amount_ratio}%
            </div>
          ))}
        </div>
      </div>

      <div className="py-2">
        <div className="text-xl">Hops</div>
        <div className="grid grid-flow-col grid-cols-3 gap-4">
          {beer.beer_recipes.hops.map(({hop, amount_ratio}) => (
            <div key={hop.slug} className="hover:bg-blue-100 group block rounded-lg p-4 text-base text-center h-26 border border-gray-200">
              {hop.hops} @ {amount_ratio}%
            </div>
          ))}
        </div>
      </div>

      <div className="py-2">
        <div className="text-xl">Yeasts</div>
        <div className="grid grid-flow-col grid-cols-3 gap-4">
          {beer.beer_recipes.yeasts.map(({yeast}) => (
            <div key={yeast.slug} className="hover:bg-blue-100 group block rounded-lg p-4 text-base text-center h-26 border border-gray-200">
              {yeast.name}
            </div>
          ))}
        </div>
      </div>
    </div>

    <div>
      <div className="text-xl">Process</div>

      <div className="py-2">
        <div className="text-lg">Liquids</div>
        <div>
          {beer.liquids.map((liquid) => (
            <div key={liquid.type} className="flex-none w-full mt-0.5 font-normal">
              <dt className="inline">{liquid.type}</dt>{': '}
              <dd className="inline text-black">{liquid.amount_liters} liters</dd>
            </div>
          ))}
        </div>
      </div>

      <div className="py-2">
        <div className="text-lg">Hops</div>
        <div>
          {beer.hop_additions.map(({hop, stage, time, amount_ratio}) => (
            <div key={time} className="flex-none w-full mt-0.5 font-normal">
              <dt className="inline">{time} {stage}</dt>{': '}
              <dd className="inline text-black">{amount_ratio} % {hop.hops}</dd>
            </div>
          ))}
        </div>
      </div>

      <div className="py-2">
        <div className="text-lg">Timeline</div>
        <div>
          {beer.timeline.map((timeline) => (
            <div key={timeline.stage} className="flex-none w-full mt-0.5 font-normal">
              <dt className="inline">{timeline.stage}</dt>{': '}
              <dd className="inline text-black">Done on {timeline.date}</dd>
            </div>
          ))}
        </div>
      </div>

    </div>

  </section>

</div>
);}

export async function getStaticPaths() {
  const {data : beers} = await axios.get(
    `${process.env.DATABASE_ENDPOINT}/beers`);
  return {
    paths : beers.map((beer) => ({
                        params : {
                          slug : beer.slug,
                        },
                      })),
    fallback : false,
  };
}

export async function getStaticProps({params}) {
  const {data: beer} = await axios.get(
    `${process.env.DATABASE_ENDPOINT}/beers?slug=${params.slug}`);
  return {props : {beer : beer[0]}};
}
