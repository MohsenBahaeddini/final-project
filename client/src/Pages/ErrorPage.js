import styled from "styled-components";
const ErrorPage = () => {
  return (
    <Wrapper>
      <Div>
        <h1>An unknown error has occured.</h1>
        <P>Please try refreshing the page.</P>
      </Div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  margin: auto;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: sans-serif;
`;

const P = styled.p`
  font-size: 20px;
`;
export default ErrorPage;
