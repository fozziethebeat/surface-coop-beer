import fs from "fs";
import path from "path";

import Head from "../../components/head";
import Nav from "../../components/nav";
import getbeers from "../../lib/getbeers";

export default function Beer({ beer }) {
  return (
    <div>
      <Head title={beer.name} />

      <Nav />

      <div className="text-center text-2xl">
        <section className="px-4 py-3">
          <div className="text-xxl">{beer.name}</div>
          <div>
            <div className="text-xl">Ingredients</div>

            <div className="py-2">
              <div className="text-lg">Malts</div>
              <div className="grid grid-flow-col grid-cols-3 gap-4">
                {beer.ingredients.fermentable_additions.map((malt) => (
                  <div
                    key={malt.name}
                    className="hover:bg-blue-100 group block rounded-lg p-4 text-base text-center h-26 border border-gray-200"
                  >
                    {malt.name} {malt.amount.value} {malt.amount.unit}
                  </div>
                ))}
              </div>
            </div>

            <div className="py-2">
              <div className="text-xl">Hops</div>
              <div className="grid grid-flow-col grid-cols-3 gap-4">
                {beer.ingredients.hop_additions.map((hop) => (
                  <div
                    key={hop.name}
                    className="hover:bg-blue-100 group block rounded-lg p-4 text-base text-center h-26 border border-gray-200"
                  >
                    {hop.name} {hop.amount.value} {hop.amount.unit} @{" "}
                    {hop.timing.time.value} {hop.timing.time.unit}
                  </div>
                ))}
              </div>
            </div>

            <div className="py-2">
              <div className="text-xl">Yeasts</div>
              <div className="grid grid-flow-col grid-cols-3 gap-4">
                {beer.ingredients.culture_additions.map((yeast) => (
                  <div
                    key={yeast.name}
                    className="hover:bg-blue-100 group block rounded-lg p-4 text-base text-center h-26 border border-gray-200"
                  >
                    {yeast.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const beers = getbeers();
  return {
    paths: beers.map((beer) => ({
      params: {
        slug: beer.slug,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(
    process.cwd(),
    "data/recipes",
    params.slug + ".json"
  );
  const beerJson = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const recipe = beerJson.beerjson.recipes[0];
  recipe.slug = params.slug;
  return { props: { beer: recipe } };
}
