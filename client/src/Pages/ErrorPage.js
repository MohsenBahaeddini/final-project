import styled from "styled-components";
const ErrorPage = () => {
  // This will be displayed if an error happens while loading the page
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
  flex-direction: column;
  align-items: center;
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
  color: #ddd;
`;
export default ErrorPage;
