from dataclasses import dataclass
from enum import Enum
from typing import Union, NamedTuple, List
from flask import Flask, request
from error import InvalidType, InvalidName
from math import sqrt, pow

# SpaceCowboy models a cowboy in our super amazing system
@dataclass
class SpaceCowboy:
    name: str
    lassoLength: int

# SpaceAnimal models a single animal in our amazing system
@dataclass
class SpaceAnimal:
    # SpaceAnimalType is an enum of all possible space animals we may encounter
    class SpaceAnimalType(Enum):
        PIG = "pig"
        COW = "cow"
        FLYING_BURGER = "flying_burger"

    type: SpaceAnimalType

# SpaceEntity models an entity in the super amazing (ROUND UPPER 100) system
@dataclass
class SpaceEntity:
    class Location(NamedTuple):
        x: int
        y: int

    metadata: Union[SpaceCowboy, SpaceAnimal]
    location: Location

# ==== HTTP Endpoint Stubs ====
app = Flask(__name__)
space_database: List[SpaceEntity] = []

# the POST /entity endpoint adds an entity to your global space database
@app.route('/entity', methods=['POST'])
def create_entity():
    entities = request.get_json()['entities']
    for entity in entities:
        metadata = entity['metadata']
        coordinate = entity['location']
        if entity['type'] == 'space_cowboy':
            data = SpaceCowboy(metadata['name'], metadata['lassoLength'])
        elif entity['type'] == 'space_animal':
            data = SpaceAnimal(metadata['type'])
        else:
            raise InvalidType
        location = SpaceEntity.Location(coordinate['x'], coordinate['y'])
        space_database.append(SpaceEntity(data, location))
    return {}

# lasooable returns all the space animals a space cowboy can lasso given their name
@app.route('/lassoable', methods=['GET'])
def lassoable():
    canLasso = []
    name = request.get_json()['cowboy_name'][0]
    cowboy = getCowboy(name)
    for animal in space_database:
        if type(animal.metadata) == SpaceAnimal and inRange(cowboy, animal):
            canLasso.append({
                'type': animal.metadata.type,
                'location': {
                    'x': animal.location.x,
                    'y': animal.location.y
                }
            })
    return {"space_animals": canLasso}

# Helper Functions
def PythagoreanDistance(locA, locB):
    return sqrt(pow(locA.x - locB.x, 2) + pow(locA.y - locB.y, 2))

def inRange(cowboy, animal):
    lasso = cowboy.metadata.lassoLength
    return lasso >= PythagoreanDistance(cowboy.location, animal.location)

def getCowboy(name):
    for entity in space_database:
        if type(entity.metadata) == SpaceCowboy and entity.metadata.name == name:
            return entity
        else:
            raise InvalidName
    

# DO NOT TOUCH ME, thanks :D
if __name__ == '__main__':
    app.run(debug=True, port=8080)