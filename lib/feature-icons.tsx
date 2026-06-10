import {
  Wifi,
  Coffee,
  Flower2,
  Car,
  Bath,
  PawPrint,
  type LucideIcon,
} from "lucide-react";
import type { RoomFeatureKey } from "./data/rooms";

export const featureIcons: Record<RoomFeatureKey, LucideIcon> = {
  wifi: Wifi,
  breakfast: Coffee,
  garden: Flower2,
  parking: Car,
  jacuzzi: Bath,
  pet: PawPrint,
};
