import express from 'express';

// location is the simple (x, y) coordinates of an entity within the system
// spaceCowboy models a cowboy in our super amazing system
// spaceAnimal models a single animal in our amazing system
type location = { x: number, y: number };
type spaceCowboy = { name: string, lassoLength: number };
type spaceAnimal = { type: "pig" | "cow" | "flying_burger" };

// spaceEntity models an entity in the super amazing (ROUND UPPER 100) system
type spaceEntity =
    | { type: "space_cowboy", metadata: spaceCowboy, location: location }
    | { type: "space_animal", metadata: spaceAnimal, location: location };


// === ADD YOUR CODE BELOW :D ===
type entityCowboy = { type: "space_cowboy", metadata: spaceCowboy, location: location };
type entityAnimal = { type: "space_animal", metadata: spaceAnimal, location: location };
// NOTE: With the above added you can change type spaceEntity using these 
// Optionally remove these and use different method in getLassoable (type checking)

type animal = spaceAnimal & { location: location }

// === ExpressJS setup + Server setup ===
const spaceDatabase = [] as spaceEntity[];
const app = express();
app.use(express.json());

// the POST /entity endpoint adds an entity to your global space database
app.post('/entity', (req, res) => {
    const { entities } = req.body;
    spaceDatabase.push(...entities);
    res.json();
});

// lasooable returns all the space animals a space cowboy can lasso given their name
app.get('/lassoable', (req, res) => {
    const cowboyName = req.query.cowboy_name as string;
    res.json(getLassoable(cowboyName));
});

// Helper function to find all space animals within lasso range
const getLassoable = (cowboyName: string): { space_animals: animal[] } => {
    const cowboy = spaceDatabase.find(
        c => c.type === "space_cowboy" && c.metadata.name === cowboyName
    ) as entityCowboy;

    if (!cowboy) return { space_animals: [] };

    const lassoLength = cowboy.metadata.lassoLength;
    const { x, y } = cowboy.location; 
    
    // Outter box optimisation 
    const possibleAnimals = spaceDatabase.filter(
        e => e.type === "space_animal" && 
        e.location.x <= x + lassoLength && e.location.x >= x - lassoLength &&
        e.location.y <= y + lassoLength && e.location.y >= y - lassoLength
    ) as entityAnimal[];

    // Finds animals with Pythagorean distance from animal to cowboy <= lasso length 
    const maxDistance = lassoLength * lassoLength;
    const result = [] as animal[];
    possibleAnimals.forEach(a => {
        const dxSquared = Math.pow(Math.abs(x - a.location.x), 2);
        const dySquared = Math.pow(Math.abs(y - a.location.y), 2);
        if (dxSquared + dySquared <= maxDistance) {
            result.push({ type: a.metadata.type, location: a.location });
        }
    });

    return { space_animals: result };
};

app.listen(8080);
