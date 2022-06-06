import { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const AdDetails = () => {
  const [ad, setAd] = useState(ad);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetch(`/api/ad/${id}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setAd(response);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, [ad]);

  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }
  return <>AdDetails</>;
};
export default AdDetails;
