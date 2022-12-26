# Development BE Question - The Round Upper 100

The super space cowboys run a remote ranch on the outer rim of the universally-famous globolbop galaxy. The globolbop galaxy is inhabited by thousands of "gate-openers", annoying creatures that like to wander around the galaxy opening gates (science does not yet understand why) and unfortunately for the super space cowboys their ranch was a victim of a "gate-opener" attack last night. When they awoke they found all their space animals floating around the ranch, thankfully Rick (the older of the super space cowboys) remembered to disable the mobility jetpacks for all the animals on the ranch before heading to bed so now the animals are spread motionless across the entire ranch. (It's not exactly clear how the animals managed to escape their pens in the first place though)

Rick thinks rounding up the animals should be a pretty easy job so he decides to play a little game, he wants to lasso up several animals in one go with a crack of his lasso. Since this is not the first time this has happened Rick actually has an old program (2 in fact) that he uses to assist him with this game. 

Rick's program allows him to enter the (x, y) coordinates of all the animals in his farm as well as all the super space cowboys, using this information he can query how many space animals a certain space cowboy can capture with a single swoop of their lasso. He's very excited to use this program again but when he goes searching on his advanced quantum hard-drive he realises that both copies of his program are partially corrupted and all that remains are tiny function stubs :(. Unfortunately for Rick his program(s) are written 2 old arcane languages which he reasons to be `typescript` and `python`. 

## The Task
Since Rick is inexperienced in working in legacy languages like `Typescript` and `Python` he has asked for your assistance in repairing these programs (I think this is his contrived way of calling you old). You only need to repair one of these programs and you can pick whichever one you want. Back in the day Rick used to interface with these programs via simple HTTP requests and he wishes you to maintain this fact, gracefully he has also provided you with the implementation spec for the original program.

### The Task - Part One
The program had some mechanism for creating and adding new entities to the system, these entities can either be a super space cowboy or a space animal. The program exposed a **single HTTP POST endpoint** for creating entities. The endpoint took a JSON request body of the form:
```json
{
    entities: [
        {
            type: "space_cowboy",
            metadata: {
                name: "Jim",
                lassoSize: 1 
            },
            location: {
                x: 3,
                y: 2
            }
        },
        {
            type: "space_cowboy",
            metadata: {
                name: "Bob",
                lassoSize: 2 
            },
            location: {
                x: 7,
                y: 3
            }
        },
        {
            type: "space_animal",
            metadata: {
                type: "flying_burger",
            },
            location: {
                x: 7,
                y: 3
            }
        }
    ]
}
```
The request body is a list of entities to add to the system (note this endpoint can be called multiple times). Entities consist of some type discriminator (the type field), some metadata about the entity (the metadata field) and their location. 

Super space cowboy metadata takes the form:
```json
{ 
    name: string, 
    lassoSize: number 
}
```
while space animal metadata takes the form:
```json
{ 
    type: "pig" | "cow" | "flying_burger" 
}
```
`flying_burgers` are actually an extinct species but for nostalgia's sake Rick is adamant that your program still supports them. Your task for this part is to implement this endpoint, upon a successful operation you must return a `HTTP 200` status code and an empty response body.

**Summarised Spec**
 - Endpoint must be able to parse request inputs of the form
 ```ts
type location = { x: number, y: number };
type spaceCowboy = { name: string, lassoSize: number };
type spaceAnimal = { type: "pig" | "cow" | "flying_burger" };

type spaceEntity =
    | { type: "space_cowboy", metadata: spaceCowboy, location: location }
    | { type: "space_animal", metadata: spaceAnimal, location: location };
 ```
  - System should store these entities
    - You are guaranteed that each space cowboy has a unique name
  - Endpoint should return a `HTTP 200` status code on a successful operation.

**Implementation**

There are two template folders (python and typescript) each of them with a stub `/createEntity` endpoint that you must implement, the input domain has already been modelled for you as types in the respective language.

### The Task - Part Two
The second part of the program is the ability to query which space animals a certain space cowboy can capture with a single swoop of their lasso. Like the previous part Rick interfaces with this feature via a HTTP endpoint `/lassoable`. The endpoint takes the name of a cowboy that Rick wishes to query and returns a list of all the space animals that that the cowboy can lasso.

An animal is lassoable if their distance from the cowboy in question is **less than or equal to the length of the cowboy's lasso**. The endpoint input looks something like:
```json
{
    cowboy_name: "rick" 
}
```
Unfortunately unlike the first part the type definition for the input/output model of this endpoint was corrupted so it is up to you to add that to the program. After processing the request your endpoint should return `HTTP 200` with a **list of ALL space animals** it can capture, the output should follow the following example format
```json
{
    space_animals: [
        {
            type: "pig",
            location: {
                x: 3,
                y: 3
            } 
        },
        {
            type: "flying_burger",
            location: {
                x: 3,
                y: 6
            } 
        }
    ]
}
```

**Summarised Spec**
 - Endpoint should be able to parse the input format described above
 - Endpoint should return all space animals in the system where the pythagorean distance between the cowboy in the request and the animal is **less than or equal to** the cowboy's lasso length. 
 - Endpoint should return a HTTP 200 with an output of the same format described above