import React from "react";
import { useParams, Link } from "react-router-dom";
import useMyContext from "../components/funcUseMyContext";
import type { Item } from "../components/interfaces";

interface ItemDisplayProps {
  item: Item;
  category: string | undefined;
}

const ItemDisplay: React.FC<ItemDisplayProps> = ({ item, category }) => (
  <div className="grid-item">
    <Link to={`/${category}/${item.id}`} className="dataItem">
      <div className="single-item">
        <img src={item.image} alt={item.title} width={100} height={100} />
        <div className="underPhoto">
          <div className="title">{item.title}</div>
          <div className="price">{`${item.price} $`}</div>
        </div>
      </div>
    </Link>
  </div>
);

const DisplayItems: React.FC = () => {
  const { category } = useParams();
  const { fetchedData: data } = useMyContext();

  const filteredData = category
    ? data.filter((item) => item.category === category)
    : data;

  if (filteredData.length === 0) {
    return <div>There is no category like {category}</div>;
  }

  return (
    <div className="itemCont">
      {filteredData.map((item) => (
        <ItemDisplay key={item.id} item={item} category={category} />
      ))}
    </div>
  );
};

export default DisplayItems;
