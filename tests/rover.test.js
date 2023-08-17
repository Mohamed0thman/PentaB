import rover from "../src/utilis/rover";
import { describe, it, expect } from "vitest";

describe("Rover Test Suite", function () {
  it.each`
    startingPos       | startingDir | commands | finalPos          | finalDir
    ${{ x: 1, y: 1 }} | ${"N"}      | ${[]}    | ${{ x: 1, y: 1 }} | ${"N"}
    ${{ x: 1, y: 1 }} | ${"N"}      | ${["f"]} | ${{ x: 1, y: 2 }} | ${"N"}
    ${{ x: 3, y: 3 }} | ${"N"}      | ${["b"]} | ${{ x: 3, y: 2 }} | ${"N"}
    ${{ x: 3, y: 3 }} | ${"N"}      | ${["r"]} | ${{ x: 3, y: 3 }} | ${"E"}
    ${{ x: 3, y: 3 }} | ${"N"}      | ${["l"]} | ${{ x: 3, y: 3 }} | ${"W"}
  `(
    "The rover should move and turn in the correct direction when given one command and facing North",
    function ({ startingPos, startingDir, commands, finalPos, finalDir }) {
      const result = rover(startingPos, startingDir, commands);
      expect(result.finalPosition).toEqual(finalPos);
      expect(result.direction).toEqual(finalDir);
    }
  );

  it.each`
    startingPos       | startingDir | commands | finalPos          | finalDir
    ${{ x: 3, y: 3 }} | ${"W"}      | ${["r"]} | ${{ x: 3, y: 3 }} | ${"N"}
    ${{ x: 3, y: 3 }} | ${"S"}      | ${["r"]} | ${{ x: 3, y: 3 }} | ${"W"}
    ${{ x: 3, y: 3 }} | ${"E"}      | ${["r"]} | ${{ x: 3, y: 3 }} | ${"S"}
    ${{ x: 3, y: 3 }} | ${"W"}      | ${["l"]} | ${{ x: 3, y: 3 }} | ${"S"}
    ${{ x: 3, y: 3 }} | ${"S"}      | ${["l"]} | ${{ x: 3, y: 3 }} | ${"E"}
    ${{ x: 3, y: 3 }} | ${"E"}      | ${["l"]} | ${{ x: 3, y: 3 }} | ${"N"}
  `(
    "The rover should turn in the correct direction when given a single left or right command",
    function ({ startingPos, startingDir, commands, finalPos, finalDir }) {
      const result = rover(startingPos, startingDir, commands);
      expect(result.finalPosition).toEqual(finalPos);
      expect(result.direction).toEqual(finalDir);
    }
  );

  it.each`
    startingPos       | startingDir | commands | finalPos          | finalDir
    ${{ x: 1, y: 1 }} | ${"E"}      | ${["f"]} | ${{ x: 2, y: 1 }} | ${"E"}
    ${{ x: 2, y: 2 }} | ${"W"}      | ${["f"]} | ${{ x: 1, y: 2 }} | ${"W"}
    ${{ x: 2, y: 2 }} | ${"S"}      | ${["f"]} | ${{ x: 2, y: 1 }} | ${"S"}
  `(
    "The rover should move foward in the correct direction when given a single forward command",
    function ({ startingPos, startingDir, commands, finalPos, finalDir }) {
      const result = rover(startingPos, startingDir, commands);
      expect(result.finalPosition).toEqual(finalPos);
      expect(result.direction).toEqual(finalDir);
    }
  );

  it.each`
    startingPos       | startingDir | commands | finalPos          | finalDir
    ${{ x: 3, y: 3 }} | ${"E"}      | ${["b"]} | ${{ x: 2, y: 3 }} | ${"E"}
    ${{ x: 3, y: 3 }} | ${"W"}      | ${["b"]} | ${{ x: 4, y: 3 }} | ${"W"}
    ${{ x: 3, y: 3 }} | ${"S"}      | ${["b"]} | ${{ x: 3, y: 4 }} | ${"S"}
  `(
    "The rover should move backwards in the correct direction when given a single backward command",
    function ({ startingPos, startingDir, commands, finalPos, finalDir }) {
      const result = rover(startingPos, startingDir, commands);
      expect(result.finalPosition).toEqual(finalPos);
      expect(result.direction).toEqual(finalDir);
    }
  );

  it.each`
    startingPos       | startingDir | commands                                    | finalPos          | finalDir
    ${{ x: 3, y: 3 }} | ${"E"}      | ${["f", "l", "f", "l", "f", "l", "f", "l"]} | ${{ x: 3, y: 3 }} | ${"E"}
    ${{ x: 3, y: 3 }} | ${"S"}      | ${["b", "b", "l", "f", "r"]}                | ${{ x: 4, y: 5 }} | ${"S"}
    ${{ x: 3, y: 3 }} | ${"N"}      | ${["r", "b", "r", "f", "r", "b"]}           | ${{ x: 3, y: 2 }} | ${"W"}
    ${{ x: 3, y: 3 }} | ${"W"}      | ${["l", "f", "r", "l", "r", "f", "r"]}      | ${{ x: 2, y: 2 }} | ${"N"}
  `(
    "The rover should move and turn in the correct direction when given a multiple commands are given",
    function ({ startingPos, startingDir, commands, finalPos, finalDir }) {
      const result = rover(startingPos, startingDir, commands);
      expect(result.finalPosition).toEqual(finalPos);
      expect(result.direction).toEqual(finalDir);
    }
  );

  it.each`
    startingPos       | startingDir | commands | finalPos          | finalDir
    ${{ x: 1, y: 5 }} | ${"N"}      | ${["f"]} | ${{ x: 5, y: 5 }} | ${"S"}
    ${{ x: 2, y: 1 }} | ${"S"}      | ${["f"]} | ${{ x: 4, y: 1 }} | ${"N"}
    ${{ x: 3, y: 5 }} | ${"N"}      | ${["f"]} | ${{ x: 3, y: 5 }} | ${"S"}
    ${{ x: 4, y: 1 }} | ${"S"}      | ${["f"]} | ${{ x: 2, y: 1 }} | ${"N"}
    ${{ x: 5, y: 5 }} | ${"N"}      | ${["f"]} | ${{ x: 1, y: 5 }} | ${"S"}
  `(
    "The rover should wrap around the planet as expected when at the edge and facing North or South",
    function ({ startingPos, startingDir, commands, finalPos, finalDir }) {
      const result = rover(startingPos, startingDir, commands);
      expect(result.finalPosition).toEqual(finalPos);
      expect(result.direction).toEqual(finalDir);
    }
  );

  it.each`
    startingPos       | startingDir | commands | finalPos          | finalDir
    ${{ x: 5, y: 5 }} | ${"E"}      | ${["f"]} | ${{ x: 1, y: 5 }} | ${"E"}
    ${{ x: 1, y: 4 }} | ${"E"}      | ${["b"]} | ${{ x: 5, y: 4 }} | ${"E"}
    ${{ x: 1, y: 3 }} | ${"W"}      | ${["f"]} | ${{ x: 5, y: 3 }} | ${"W"}
    ${{ x: 5, y: 2 }} | ${"W"}      | ${["b"]} | ${{ x: 1, y: 2 }} | ${"W"}
  `(
    "The rover should wrap around the planet as expected when at the edge and facing East or West",
    function ({ startingPos, startingDir, commands, finalPos, finalDir }) {
      const result = rover(startingPos, startingDir, commands);
      expect(result.finalPosition).toEqual(finalPos);
      expect(result.direction).toEqual(finalDir);
    }
  );
});
