> This question is relevant for **any project with a backend** (Chaos, Circles,
> CSElectives, Discord Bot, Freerooms, Notangles, Website).

# Development BE Question - The Round Upper 100

> **YOU DO NOT NEED TO COMPLETE ALL PARTS.** Complete the parts that you think best
> reflect your skills.

The `Super Space Cowboys` run a remote ranch on the outer rim of the universally-famous `Globolbop` galaxy. The `Globolbop` galaxy is inhabited by thousands of `gate-openers`, annoying creatures that like to wander around the galaxy opening gates (science does not yet understand why), and unfortunately for the super space cowboys their ranch was a victim of a `gate-opener` attack last night.

When they awoke they found all their space animals floating around the ranch. Thankfully, Rick remembered to disable the mobility jetpacks for all the animals on the ranch before heading to bed, so now the animals are spread motionless across the entire ranch. (It's not exactly clear how the animals managed to escape their pens in the first place though.)

Rick thinks rounding up the animals should be a pretty easy job so he decides to play a little game, he wants to lasso up several animals in one go with a crack of his lasso. Since this is not the first time this has happened, Rick actually has an old program (2 in fact) that he uses to assist him with this game.

Rick's program allows him to enter the (x, y) coordinates of all the animals in his farm as well as all the `Super Space Cowboys`. Using this information he can query how many space animals a certain space cowboy can capture with a single swoop of their lasso. He's very excited to use this program, again but when he goes searching on his advanced quantum hard-drive he realises that both copies of his program are partially corrupted and all that remains are tiny function stubs :(. Unfortunately for Rick his program(s) are written in two arcane languages which he reasons to be `TypeScript` and `Python`.

## The Task

Since Rick is inexperienced in working in legacy languages like TypeScript and Python, he has asked for your assistance in repairing these programs (I think this is his contrived way of calling you old). You only need to repair one of these programs and you can pick whichever one you want. Back in the day Rick used to interface with these programs via simple HTTP requests and he wishes you to maintain this fact - gracefully, he has also provided you with the implementation spec for the original program.

## Part 1

The program had some mechanism for creating and adding new entities to the system. These entities can either be a super space cowboy or a space animal. The program exposed a **single HTTP POST endpoint** for creating entities. The endpoint took a JSON request body of the form:

```json
{
  "entities": [
    {
      "type": "space_cowboy",
      "metadata": {
        "name": "Jim",
        "lassoLength": 1
      },
      "location": {
        "x": 3,
        "y": 2
      }
    },
    {
      "type": "space_cowboy",
      "metadata": {
        "name": "Bob",
        "lassoLength": 2
      },
      "location": {
        "x": 7,
        "y": 3
      }
    },
    {
      "type": "space_animal",
      "metadata": {
        "type": "flying_burger"
      },
      "location": {
        "x": 7,
        "y": 3
      }
    }
  ]
}
```

The request body is a list of entities to add to the system (note this endpoint can be called multiple times). Entities consist of some type discriminator (the type field), some metadata about the entity (the metadata field) and their location.

Space cowboy metadata takes the form:

```ts
{
    name: string,
    lassoLength: number
}
```

while space animal metadata takes the form:

```ts
{
  type: "pig" | "cow" | "flying_burger";
}
```

Your task for this part is to implement this endpoint. Upon a successful operation you must return a `HTTP 200` status code and an empty response body.

### Requirements

- The endpoint must be able to parse request inputs of the form:

```ts
type location = { x: number; y: number };
type spaceCowboy = { name: string; lassoLength: number };
type spaceAnimal = { type: "pig" | "cow" | "flying_burger" };

type spaceEntity =
  | { type: "space_cowboy"; metadata: spaceCowboy; location: location }
  | { type: "space_animal"; metadata: spaceAnimal; location: location };
```

- The system should store these entities.
  - You are guaranteed that each space cowboy has a unique name.
- Endpoint should return a `HTTP 200` status code on a successful operation.

There are two template folders (python and typescript) each of them with a stub `POST /entity` endpoint that you must implement. The input domain has already been modelled for you as types in the respective language.

## Part 2

The second part of the program is the ability to query which space animals a certain space cowboy can capture with a single swoop of their lasso. Like the previous part, Rick interfaces with this feature via a HTTP endpoint `/lassoable`. The endpoint takes the name of a cowboy that Rick wishes to query and returns a list of all the space animals that the cowboy can lasso.

An animal is lassoable if their distance from the cowboy in question is **less than or equal to the length of the cowboy's lasso**. `/lassoable` takes in one query argument, the cowboy's name itself:

```
/lassoable?cowboy_name=<insert name here>
```

Unfortunately, unlike the first part, the type definition for the input/output model of this endpoint was corrupted so it is up to you to add that to the program. After processing the request, your endpoint should return `HTTP 200` with a **list of ALL space animals** it can capture, and the output should follow the following example format:

```json
{
  "space_animals": [
    {
      "type": "pig",
      "location": {
        "x": 3,
        "y": 3
      }
    },
    {
      "type": "flying_burger",
      "location": {
        "x": 3,
        "y": 6
      }
    }
  ]
}
```

### Requirements

- The endpoint should be able to parse the input format described above.
- The endpoint should return all space animals in the system where the Pythagorean distance between the cowboy in the request and the animal is **less than or equal to** the cowboy's lasso length.
- The endpoint should return a HTTP 200 with an output of the same format described above.

## Getting set up

### Python

A basic Flask application has been set up for you in `py_template/roundupper_100.py`,
including some endpoints. To run it, enter `python roundupper.py` in the Python
folder, and a Flask server should be spun up on port 8080.

### TypeScript

A basic Express application has been set up for you in `ts_template/roundupper_100.ts`,
including some endpoints. To run it, enter `npm run start` in the TypeScript folder,
and an Express server should be spun up on port 8080.

### Testing

We have written some tests for you inside the `autotester` folder, which contains
a suite written in TypeScript. To use these tests on your code:

1. Make sure your backend server is up and running by following the instructions
   above for Python/TypeScript.
2. Go into the `autotester` folder and run `npm run test_part1`.
3. For Part 2, you will need to restart the server (since the server put in some
   dummy data), and then re-run `npm run test_part2`.

The autotester should then show which tests have passed and which have failed. If
you know Jest, feel free to write more tests!
