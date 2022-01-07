import styled from "styled-components";
import Location from "../pages/Location";




function LocationList({bathrooms}) {
  const bathroomLocationList = bathrooms.map((bathroom) => (
    <Location key={bathroom.id} bathroom={bathroom} />
  ));
  
 




  return (
    <Wrapper>
 
    <div>{bathroomLocationList}</div>
    

    </Wrapper> 
           
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

export default LocationList;
