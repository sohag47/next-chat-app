import { TLibraryList } from "@/app/library/(directories)/settings/libraries/type.library";


export type TAuth = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  library: TLibraryList
}