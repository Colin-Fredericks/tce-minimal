// Behold, the data structure for everything the author sets in the CMS. 
// ALL data must be specified here, though you 
// don't need to specify everything that might be recorded.
// (e.g. you can put new properties into author_data
// without adding them here.)
export interface ElementData {
  author_data: { [key: string]: unknown };
  display_name: string;
}

export interface Element {
  id: number;
  uid: string;
  activityId: number;
  repositoryId: number;
  contentId: string;
  contentSignature: string;
  type: string;
  position: number;
  data: ElementData;
  meta: { [key: string]: unknown };
  refs: { [key: string]: unknown };
  linked: boolean;
  detached: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export type DataInitializer = () => ElementData;

export interface ElementManifest {
  type: string;
  version: string;
  name: string;
  ssr: boolean;
  initState: DataInitializer;
  Edit?: object;
  TopToolbar?: object;
  SideToolbar?: object;
  Display?: object;
  ui: {
    icon: string;
    forceFullWidth: boolean;
  };
  mocks?: {
    displayContexts: Array<{ name: string; data: any }>;
  };
}
