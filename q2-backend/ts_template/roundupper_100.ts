// sandeep das
import express, {json, Request, Response} from "express";

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
type capturableAnimal = { type: "pig" | "cow" | "flying_burger", location: location}

// === ExpressJS setup + Server setup ===
const spaceDatabase = [] as spaceEntity[];
const app = express();
app.use(json()); //middleware

// the POST /entity endpoint adds an entity to your global space database
app.post("/entity", (req: Request, res: Response) => {
  const entities = req.body.entities;
  for (const entity of entities) spaceDatabase.push(entity);
  res.json({});
});

// /lassoable returns all the space animals a space cowboy can lasso given their name
app.get("/lassoable", (req: Request, res: Response) => {
  const cowboyName = req.query.cowboy_name as string;
  const [lassoLength, location] = findCowboyInfo(cowboyName);
  res.json({
    "space_animals": getCapturableAnimalList(lassoLength as number, location as location)
  });
});

// -------------------------- Helper Functions ---------------------------------

// Finds cowboy's lasso length, otherwise throws error
// possible to do this with .filter and .find, but this is more readable imo
const findCowboyInfo = (cowboyName: string) => {
  for (const entity of spaceDatabase) {
    if (entity.type === "space_cowboy" && entity.metadata.name == cowboyName) {
      return [entity.metadata.lassoLength, entity.location];
    } 
  }
  throw Error("Cowboy couldn't be found");
}

// Return list of animals that can be captured by the given cowboy
const getCapturableAnimalList = (lassoLength: number , cowboyLocation: location) => {
  const animalsCouldCapture = [] as capturableAnimal[];
  const animals = spaceDatabase.filter(entity => entity.type === "space_animal");
  for (const animal of animals) {
    // Calculate distance of animal from cowboy
    const distance = calculateDistance(animal.location, cowboyLocation);
    // Add to list if distance < lassoLength
    if (distance <= lassoLength) {
      const spaceAnimalMetaData = animal.metadata as spaceAnimal;
      animalsCouldCapture.push({
        type: spaceAnimalMetaData.type,
        location: animal.location
      });
    }
  }
  return animalsCouldCapture;
}


// Calculates distance between two points
const calculateDistance = (point1: location, point2: location) => {
  let x = point1.x - point2.x;
  let y = point1.y - point2.y;
  return Math.sqrt(x * x + y * y);
}

app.listen(8080);