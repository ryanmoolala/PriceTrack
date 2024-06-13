import React, { FC } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

/*
Why FC?: FC is a shorthand for FunctionComponent and is a generic type provided by React. 
It allows you to specify the type of props that your functional component accepts. 
For example, if your component accepts props of type IndexProps, 
you would define it as const Index: FC<IndexProps> = ....

Using FC ensures consistency (alw use it)
*/

const Index: FC = () => {
  return (
    <div className="flex flex-row">
      <div className="flex h-screen w-1/2 items-center justify-end">
        <h1 className="h-1/2 text-8xl font-bold font-mono">PriceTrack</h1>
      </div>

      <div className="flex items-end justify-center text-5xl font-bold w-1/4">
        <div className="h-1/2 translate-x-7 translate-y-7">
          <NavLink to="/home" >
            <FaArrowRightLong className="border-2 rounded-full border-white p-3 transition-transform hover:scale-110" size={72} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Index;
