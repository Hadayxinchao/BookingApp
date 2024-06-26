import {useContext} from "react";
import {Link} from "react-router-dom";
import Image from "../components/Image";
import Spinner from "../components/Spinner";
import { PlaceContext } from "../providers/PlaceContext";
export default function HomePage() {
  const { places, loading } = useContext(PlaceContext);

  if(loading) {
    return <Spinner />;
  }

  return (
    <div className="mt-20 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {places?.length > 0 && places.map(place => (
        <Link to={'/place/'+place._id} key={place._id}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {place.photos?.[0] && (
              <Image className="rounded-2xl w-75 h-79 object-cover aspect-square w-full	" src={place.photos?.[0]} alt=""/>
            )}
          </div>
          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-500">{place.title}</h3>
          <div className="mt-1">
            <span className="font-bold">${place.price}</span>/ night
          </div>
        </Link>
      ))}
    </div>
  );
}
