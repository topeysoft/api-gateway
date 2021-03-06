import { Policy } from "./policy.model";
import { Target } from "./target.model";
import { Origin } from "./origin.model";

export class Host {
  name: string;
  origins: [Origin];
  target: Target | any;
  policies: [Policy];
  options: Object;
}
