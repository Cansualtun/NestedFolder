import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { FaFile } from "react-icons/fa";

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
      {folder.isFolder ? (
        <button onClick={() => handleFolderClick(folder.id, folder.isFolder)}>
          {openFolders.includes(folder.id) ? (
            <AiFillFolderOpen />
          ) : (
            <AiFillFolder />
          )}
        </button>
      ) : (
        <FaFile />
      )}
      {folder.name}
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
