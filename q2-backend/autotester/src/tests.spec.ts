import request from "supertest";

type Location = { x: number; y: number };
type SpaceCowboy = { name: string; lassoLength: number };
type SpaceAnimal = { type: "pig" | "cow" | "flying_burger" };

type SpaceEntity =
  | { type: "space_cowboy"; metadata: SpaceCowboy; location: Location }
  | { type: "space_animal"; metadata: SpaceAnimal; location: Location };

describe("Part 1", () => {
  describe("POST /entity", () => {
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
      const response = await request("http://localhost:8080")
        .post("/entity")
        .send({ entities });
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
      const response = await request("http://localhost:8080")
        .post("/entity")
        .send({ entities });
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
      const response = await request("http://localhost:8080")
        .post("/entity")
        .send({ entities });
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Entities created" });
    });
  });
});
