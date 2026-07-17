import test from "node:test";
import assert from "node:assert/strict";
import { createDefaultBirthdayCardState, normalizeBirthdayCardState, getThemePalette } from "./cardBuilder";

test("creates a sensible default card state", () => {
  const state = createDefaultBirthdayCardState();

  assert.equal(state.recipient, "Friend");
  assert.equal(state.message, "Hope your day is filled with joy and sparkle!");
  assert.equal(state.theme, "sunset");
});

test("normalizes custom input and sanitizes the message", () => {
  const state = normalizeBirthdayCardState({
    recipient: "  Maya  ",
    message: "  You are amazing!  ",
    theme: "ocean",
    sparkle: 9,
  });

  assert.equal(state.recipient, "Maya");
  assert.equal(state.message, "You are amazing!");
  assert.equal(state.theme, "ocean");
  assert.equal(state.sparkle, 9);
});

test("returns theme colors for a supported palette", () => {
  const palette = getThemePalette("berry");

  assert.equal(palette.primary, "#f472b6");
  assert.equal(palette.secondary, "#7c3aed");
});
