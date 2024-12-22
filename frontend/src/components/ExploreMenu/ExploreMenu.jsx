import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const ExploreMenu = ({ category, setCategory }) => {
  const { categoryList } = useContext(StoreContext);

  return (
    <div className="explore-menu flex flex-col gap-5" id="explore-menu">
      <h1 className="text-[#262626] font-bold">Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delecate array of dishes. Our
        mission is to satisfy your carving and elevate your dinning experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list flex justify-between items-center gap-7.5 text-center mx-5 my-0 overflow-x-scroll">
        {categoryList.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev) => (prev === item ? "All" : item))
            }
            className="explore-menu-list-item"
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
