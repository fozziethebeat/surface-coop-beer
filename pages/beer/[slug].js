import axios from 'axios';
import Head from '../../components/head';
import Nav from '../../components/nav';

export default function Beer({beer}) {
  return (
<div>
  <Head title={beer.name} />
  <Nav />
  <div>
    <h1>
      {beer.name}
    </h1>
  </div>

  <div>
    <h2>Ingredients</h2>

    <div>
      <h3>Malts</h3>
      <ul>
        {beer.beer_recipes.malts.map(({malt, amount_ratio}) => (
          <li key={malt.slug}>
            {malt.name} @ {amount_ratio}%
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3>Hops</h3>
      <ul>
        {beer.beer_recipes.hops.map(({hop, amount_ratio}) => (
          <li key={hop.slug}>
            {hop.hops} @ {amount_ratio}%
          </li>
        ))}
      </ul>
    </div>


    <div>
      <h3>Yeast</h3>
      <ul>
        {beer.beer_recipes.yeasts.map(({yeast}) => (
          <li key={yeast.slug}>
            {yeast.name}
          </li>
        ))}
      </ul>
    </div>
  </div>

  <div>
    <h2>Process</h2>

    <div>
      <h3>Liquids</h3>
      <ul>
        {beer.liquids.map((liquid) => (
          <li key={liquid.type}>
            {liquid.type}: {liquid.amount_liters} liters
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3>Hops</h3>
      <ul>
        {beer.hop_additions.map(({hop, stage, time, amount_ratio}) => (
          <li key={hop.slug}>
            {amount_ratio} % {hop.hops} @
            {time} {stage}
          </li>
        ))}
      </ul>
    </div>

    <div>
      <h3>Timeline</h3>
      <ul>
        {beer.timeline.map((timeline) => (
          <li key={timeline.stage}>
            {timeline.stage}: Done on {timeline.date}
          </li>
        ))}
      </ul>
    </div>

  </div>

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
