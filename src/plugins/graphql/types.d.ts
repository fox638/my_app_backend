import User from "@/model/User";

declare module "mercurius-auth" {
  export interface MercuriusAuthContext {
    user: User;
  }
}
