import {
  Wifi,
  Snowflake,
  Bath,
  Tv,
  Coffee,
  Utensils,
  Flower2,
  Building2,
  Armchair,
  type LucideIcon,
} from "lucide-react";
import type { RoomFeatureKey } from "./data/rooms";

export const featureIcons: Record<RoomFeatureKey, LucideIcon> = {
  wifi: Wifi,
  ac: Snowflake,
  privateBathroom: Bath,
  tv: Tv,
  kettle: Coffee,
  outdoorDining: Utensils,
  gardenView: Flower2,
  courtyardView: Building2,
  terrace: Armchair,
};
