import styled from "styled-components";
import { years, types, makes } from "../data";
import { useState, useEffect } from "react";

const Filters = () => {
  const [filters, setFilters] = useState({});
  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };
  console.log(filters);
  return (
    <>
      <div>
        <Filter>
          <h4>Filter Products:</h4>
          <label for="type">Type: </label>
          <select name="type" onChange={handleFilters}>
            {types.map((el) => {
              return <option value={el}>{el}</option>;
            })}
          </select>
          <label for="make">Make: </label>
          <select name="make" onChange={handleFilters}>
            {makes.map((make) => {
              return (
                <>
                  <option value={make}>{make}</option>
                </>
              );
            })}
          </select>
          <label for="year">Year: </label>
          <select name="year" onChange={handleFilters}>
            {years.map((year) => {
              return <option value={year}>{year}</option>;
            })}
          </select>
          
          {/* <label for="model">Model: </label>
          <select onChange={handleFilters}>
            {cars.length &&
              cars.map((car) => {
                return <option value={car.model}>{car.model}</option>;
              })}
          </select> */}
        </Filter>
      </div>
    </>
  );
};
const Filter = styled.div``;
export default Filters;
