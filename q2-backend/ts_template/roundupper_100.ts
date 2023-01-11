import express from "express";

// location is the simple (x, y) coordinates of an entity within the system
// spaceCowboy models a cowboy in our super amazing system
// spaceAnimal models a single animal in our amazing system
type location = { x: number; y: number };
type spaceCowboy = { name: string; lassoLength: number };
type spaceAnimal = { type: "pig" | "cow" | "flying_burger" };

// spaceEntity models an entity in the super amazing (ROUND UPPER 100) system
type spaceEntity =
  | { type: "space_cowboy"; metadata: spaceCowboy; location: location }
  | { type: "space_animal"; metadata: spaceAnimal; location: location };

// === ADD YOUR CODE BELOW :D ===

// === ExpressJS setup + Server setup ===
const spaceDatabase = [] as spaceEntity[];
const app = express();
app.use(express.json());

// the POST /entity endpoint adds an entity to your global space database
app.post("/entity", (req, res) => {
  const { entities } = req.body;
  entities.forEach((entity: spaceEntity) => {
    spaceDatabase.push(entity);
  });
  res.json({});
});

// lasooable returns all the space animals a space cowboy can lasso given their name
app.get("/lassoable", (req, res) => {
  const { cowboy_name } = req.body;
  let lassoLength: number;
  let cowboyLocation: location;

  // Loops through database to find lassoLength and
  // location for requested cowboy
  spaceDatabase.forEach((entity: spaceEntity) => {
    if (
      entity.type === "space_cowboy" &&
      entity.metadata.name === cowboy_name
    ) {
      lassoLength = entity.metadata.lassoLength;
      cowboyLocation = entity.location;
    }
  });

  const space_animals = [] as spaceEntity[];

  // Loop through space animals and add the appropriate ones
  // to array which will be sent back
  spaceDatabase.forEach((entity: spaceEntity) => {
    if (entity.type === "space_animal") {
      let animalLocation = entity.location;
      let equation =
        Math.pow(cowboyLocation.x - animalLocation.x, 2) +
        Math.pow(cowboyLocation.y - animalLocation.y, 2);

      const distance = Math.sqrt(equation);

      // Add entity to result array if it lies in the cowboys reach
      if (distance <= lassoLength) space_animals.push(entity);
    }
  });

  res.json({ space_animals });
});

app.listen(8080);