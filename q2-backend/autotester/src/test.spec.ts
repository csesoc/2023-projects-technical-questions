import request from "supertest";

type Location = { x: number; y: number };
type SpaceCowboy = { name: string; lassoLength: number };
type SpaceAnimal = { type: "pig" | "cow" | "flying_burger" };

type SpaceEntity =
  | { type: "space_cowboy"; metadata: SpaceCowboy; location: Location }
  | { type: "space_animal"; metadata: SpaceAnimal; location: Location };

describe("Part 1", () => {
  describe("POST /entity", () => {
    const createEntities = async (entities: SpaceEntity[]) => {
      return await request("http://localhost:8080")
        .post("/entity")
        .send({ entities });
    };

    it("creates new entities", async () => {
      const entities: SpaceEntity[] = [
        {
          type: "space_cowboy",
          metadata: { name: "Buckaroo Banzai", lassoLength: 10 },
          location: { x: 1, y: 2 },
        },
        {
          type: "space_animal",
          metadata: { type: "flying_burger" },
          location: { x: 3, y: 4 },
        },
      ];
      const response = await createEntities(entities);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Entities created" });
    });

    it("creates new entities with valid input", async () => {
      const entities: SpaceEntity[] = [
        {
          type: "space_animal",
          metadata: { type: "pig" },
          location: { x: -200, y: 4 },
        },
        {
          type: "space_cowboy",
          metadata: { name: "Buckaroo Banzai", lassoLength: 10 },
          location: { x: 100, y: 2 },
        },
      ];
      const response = await createEntities(entities);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Entities created" });
    });

    it("creates new entities with valid input", async () => {
      const entities: SpaceEntity[] = [
        {
          type: "space_animal",
          metadata: { type: "cow" },
          location: { x: 1, y: 2 },
        },
        {
          type: "space_animal",
          metadata: { type: "flying_burger" },
          location: { x: 3, y: 4 },
        },
      ];
      const response = await createEntities(entities);
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Entities created" });
    });
  });
});

describe("Part 2", () => {
  const mockData: SpaceEntity[] = [
    // Can reach the pig and cow
    {
      type: "space_cowboy",
      metadata: { name: "Buckaroo Banzai", lassoLength: 3 },
      location: { x: 1, y: 2 },
    },
    // Can reach only the flying_burger
    {
      type: "space_cowboy",
      metadata: { name: "Eliot Ness", lassoLength: 2 },
      location: { x: 3, y: 4 },
    },
    {
      type: "space_animal",
      metadata: { type: "pig" },
      location: { x: 4, y: 2 },
    },
    {
      type: "space_animal",
      metadata: { type: "cow" },
      location: { x: 2, y: 2 },
    },
    {
      type: "space_animal",
      metadata: { type: "flying_burger" },
      location: { x: 3, y: 5 },
    },
  ];
  describe("GET /lassoable", () => {
    it("shoi", () => {});
  });
});