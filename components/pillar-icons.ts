import {
  FileDiffIcon,
  type LucideIcon,
  MessagesSquareIcon,
  RocketIcon,
  WavesIcon,
} from "lucide-react";

import type { PillarSlug } from "@/lib/pillars";

/**
 * One icon per pillar, kept apart from `lib/pillars.ts` so that registry stays
 * importable from code that must not pull React components in.
 */
export const PILLAR_ICONS: Record<PillarSlug, LucideIcon> = {
  deploy: RocketIcon,
  diff: FileDiffIcon,
  review: MessagesSquareIcon,
  stabilize: WavesIcon,
};
