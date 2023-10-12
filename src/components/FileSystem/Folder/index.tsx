import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { GrDocumentPdf } from "react-icons/gr";

type FolderType = {
  id: string;
  isFolder: boolean;
  name: string;
  childs?: FolderType[];
};

type FolderItemProps = {
  folder: FolderType;
  handleFolderClick: (id: string, isFolder: boolean) => void;
  openFolders: string[];
};

const FolderItem: React.FC<FolderItemProps> = ({
  folder,
  handleFolderClick,
  openFolders,
}) => {
  return (
    <li key={folder.id}>
      <div className="flex items-center mb-4">
        {folder.isFolder ? (
          <button onClick={() => handleFolderClick(folder.id, folder.isFolder)}>
            {openFolders.includes(folder.id) ? (
              <AiFillFolderOpen className="text-primary-folder w-8 h-8" />
            ) : (
              <AiFillFolder className="text-primary-folder w-8 h-8" />
            )}
          </button>
        ) : (
          <div className="bg-primary-file rounded">
            <GrDocumentPdf className="text-white w-6 h-6" />
          </div>
        )}
        <span className="ml-2">{folder.name}</span>
      </div>
      {openFolders.includes(folder.id) && folder.childs && (
        <ul className="pl-10">
          {folder.childs.map((child: any) => (
            <FolderItem
              key={child.id}
              folder={child}
              handleFolderClick={handleFolderClick}
              openFolders={openFolders}
            />
          ))}
        </ul>
      )}
    </li>
  );
};
export default FolderItem;
