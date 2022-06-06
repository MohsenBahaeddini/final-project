import { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const AdDetails = () => {
  const [ad, setAd] = useState({});
  const [loading, setLoading] = useState("loading");
  const [error, setError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/ad/${id}`)
      .then((res) => res.json())
      .then((response) => {
        setAd(response.ad);
        setLoading("idle");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  }, []);
  console.log(ad);
  if (error) {
    return (
      <>
        <ErrorPage />
      </>
    );
  }
  return (
    <>
      <h1>{ad.type}</h1>
      <h2>{ad.make}</h2>
      <h3>{ad.model}</h3>
    </>
  );
};
export default AdDetails;
