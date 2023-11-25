import { Users } from "@/generate/db";

declare module "mercurius-auth" {
  export interface MercuriusAuthContext {
    user: Users;
  }
}
