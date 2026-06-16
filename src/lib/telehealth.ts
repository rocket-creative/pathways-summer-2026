import type { Condition, Metro } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// The licensure fence. A state page exists only when the practice is licensed
// in that state (NY, NJ, NC, FL). Everything else 404s.
export async function loadLicensedState(slug: string) {
  const state = await prisma.geoState.findUnique({ where: { slug } });
  if (!state || !state.licensed) return null;
  return state;
}

// A segment under /online-therapy/[state]/ is either a condition (state x
// condition) or a metro (state x metro). Conditions resolve first; metro slugs
// must not collide with condition slugs. Metros are scoped to their state.
export type StateSegment =
  | { kind: "condition"; condition: Condition }
  | { kind: "metro"; metro: Metro };

export async function resolveStateSegment(
  stateId: string,
  slug: string,
): Promise<StateSegment | null> {
  const condition = await prisma.condition.findUnique({ where: { slug } });
  if (condition) return { kind: "condition", condition };

  const metro = await prisma.metro.findUnique({ where: { slug } });
  if (metro && metro.stateId === stateId) return { kind: "metro", metro };

  return null;
}
