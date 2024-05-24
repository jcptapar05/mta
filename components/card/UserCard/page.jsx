import UserCard from "@/components/card/UserCard/partial/UserCard";
import React from "react";
const cardsData = [
  {
   description: "I'm an Artist",
   img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
  },
  {
    description: "I'm an buyer",
    img: "https://img.freepik.com/free-vector/sunset-sunrise-ocean-nature-landscape_33099-2244.jpg",
   },
];
const UserCardComponent = () => {
 return (
    <div className="grid grid-cols-2">
      {cardsData.map((card, index) => (
        <UserCard 
          key={index} 
          imageSrc={card.img} 
          description={card.description} 
        />
      ))}
    </div>
 );
};

export default UserCardComponent;
