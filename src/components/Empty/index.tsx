import "./styles.scss";

import emptyFolder from "@/assets/images/emptyFolder.png";
import group from "@/assets/images/group2.png";
import search from "@/assets/images/search.png";


const images = {
  emptyFolder,
  group,
  search
};

type ImageKey = keyof typeof images;

interface IEmptyState {
  title: string;
  description: string;
  image: ImageKey;
  maxWidth?: string;
  contain?: boolean;
}

export default function EmptyState({
  title,
  description,
  image,
  maxWidth,
  contain,
}: IEmptyState) {
  return (
    <div className="empty-state" style={{maxWidth :maxWidth ?? "360px"}}>
      <img
        src={images[image]}
        alt="Ícone empty state"
        className={contain ? "contain" : ""}
      />
      <span className="empty-state__title">{title}</span>
      <span className="empty-state__description">{description}</span>
    </div>
  );
}
