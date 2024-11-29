
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu flex flex-col gap-5" id="explore-menu">
      <h1 className="text-[#262626] font-bold">Explore our menu</h1>
      <p className="explore-menu-text">Choose from a diverse menu featuring a delecate array of dishes. Our mission is to satisfy your carving and elevate your dinning experience, one delicious meal at a time.</p>
    <div className="explore-menu-list flex justify-between items-center gap-7.5 text-center mx-5 my-0 overflow-x-scroll">
        {menu_list.map((item,index)=>{
            return(
                <div onClick={()=> setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={category===item.menu_name? "active" : ""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        }   )}
    </div>
    <hr/>
    </div>
  );
};

export default ExploreMenu;
