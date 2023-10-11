interface Portfolio {
  name: string;
  id: string;
  userCanAccess: boolean;
}

interface UserIdData {
  id: string;
  userName: string;
  fullName: string;
  avatarUrl: string;
  title: string;
}

interface Child {
  id: string;
  objectType: "folder" | "document";
  parentId: string;
  name: string;
  description: string;
  updatedAt: string;
  clientStoreId: string;
  size: number;
  parentList: string[];
  childDocuments: number;
  isFavorite: boolean;
  extension: string;
  isFolder: boolean;
  userId?: string;
  versionNumber?: string;
  lastVersionDate?: string;
  dddCompleted?: boolean;
  userIdData?: UserIdData;
  portfolios?: Portfolio[];
  portfolioList?: Portfolio[];
}

interface BreadCrumb {
  id: string;
  name: string;
}

interface MainObject {
  id: string;
  name: string;
  clientStoreId: string;
  breadCrumb: BreadCrumb[];
  childsCount: number;
  docsCount: number;
  awaitingDocsCount: number;
  size: number;
  isFolder: boolean;
  totalPages: number;
  totalCount: number;
  pageNumber: string;
  countPerPage: string;
  childs: Child[];
}
