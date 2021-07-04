import fs from "fs";
import path from "path";

export default function getbeers() {
  const postsDirectory = path.join(process.cwd(), "data/recipes");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .filter((filename) => path.extname(filename) == ".json")
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      const beerJson = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const recipe = beerJson.beerjson.recipes[0];
      recipe.slug = filename.replace(".json", "");
      return recipe;
    });
}
