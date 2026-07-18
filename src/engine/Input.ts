import type { InputState } from "./types";

export class InputManager {
  private state: InputState = {
    keys: {},
    pointer: { x: 0, y: 0, down: false },
    touches: [],
    gamepads: [],
  };

  private keyDown = (e: KeyboardEvent) => {
    this.state.keys[e.code] = true;
  };

  private keyUp = (e: KeyboardEvent) => {
    this.state.keys[e.code] = false;
  };

  private pointerMove = (e: PointerEvent) => {
    this.state.pointer.x = e.clientX;
    this.state.pointer.y = e.clientY;
  };

  private pointerDown = (e: PointerEvent) => {
    this.state.pointer.down = true;
    this.pointerMove(e);
  };

  private pointerUp = (_e: PointerEvent) => {
    this.state.pointer.down = false;
  };

  private touchStart = (e: TouchEvent) => {
    this.syncTouches(e.touches);
  };

  private touchMove = (e: TouchEvent) => {
    this.syncTouches(e.touches);
  };

  private touchEnd = (e: TouchEvent) => {
    this.syncTouches(e.touches);
  };

  constructor() {
    window.addEventListener("keydown", this.keyDown);
    window.addEventListener("keyup", this.keyUp);
    window.addEventListener("pointermove", this.pointerMove);
    window.addEventListener("pointerdown", this.pointerDown);
    window.addEventListener("pointerup", this.pointerUp);
    window.addEventListener("touchstart", this.touchStart, { passive: true });
    window.addEventListener("touchmove", this.touchMove, { passive: true });
    window.addEventListener("touchend", this.touchEnd, { passive: true });
  }

  private syncTouches(touches: TouchList) {
    const list: Array<{ id: number; x: number; y: number }> = [];
    for (let i = 0; i < touches.length; i++) {
      const t = touches.item(i);
      if (!t) continue;
      list.push({ id: t.identifier, x: t.clientX, y: t.clientY });
    }
    this.state.touches = list;
    if (list.length > 0) {
      this.state.pointer.x = list[0].x;
      this.state.pointer.y = list[0].y;
      this.state.pointer.down = true;
    } else {
      this.state.pointer.down = false;
    }
  }

  // Poll gamepads and update snapshot
  update(): void {
    const gps = navigator.getGamepads ? navigator.getGamepads() : [];
    const pads: Array<{ axes: number[]; buttons: boolean[] }> = [];
    for (let i = 0; i < (gps?.length || 0); i++) {
      const g = gps[i];
      if (!g) continue;
      pads.push({ axes: Array.from(g.axes), buttons: g.buttons.map((b) => !!b.pressed) });
    }
    this.state.gamepads = pads;
  }

  getState(): InputState {
    // Return a shallow copy to avoid accidental mutation by games
    return {
      keys: { ...this.state.keys },
      pointer: { ...this.state.pointer },
      touches: this.state.touches.map((t) => ({ ...t })),
      gamepads: this.state.gamepads.map((g) => ({ axes: [...g.axes], buttons: [...g.buttons] })),
    };
  }

  dispose(): void {
    window.removeEventListener("keydown", this.keyDown);
    window.removeEventListener("keyup", this.keyUp);
    window.removeEventListener("pointermove", this.pointerMove);
    window.removeEventListener("pointerdown", this.pointerDown);
    window.removeEventListener("pointerup", this.pointerUp);
    window.removeEventListener("touchstart", this.touchStart);
    window.removeEventListener("touchmove", this.touchMove);
    window.removeEventListener("touchend", this.touchEnd);
  }
}
