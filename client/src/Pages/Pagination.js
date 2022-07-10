import styled from "styled-components";

const Pagination = ({ pageNum, setPageNum, adsCount }) => {
  // implementing pagination and buttons to handle nextPage,previousPage, go to firstPage and go to lastPage
  const limit = 6;
  const lastPage = Math.ceil(adsCount / limit);

  return (
    <>
      <PaginateWrapper>
        <Container>
          <Button
            onClick={() => {
              setPageNum(1);
            }}
          >
            {"<<"}
          </Button>
          <Button
            onClick={() => {
              if (pageNum > 1) {
                setPageNum(pageNum - 1);
              }
            }}
          >
            previous
          </Button>
          <Button
            onClick={() => {
              if (pageNum < lastPage) {
                setPageNum(pageNum + 1);
              }
            }}
          >
            next
          </Button>

          <Button onClick={() => setPageNum(lastPage)}>{">>"}</Button>
        </Container>
      </PaginateWrapper>
    </>
  );
};

const Button = styled.button`
  cursor: pointer;
  background: none;
  font-family: var(--font-body);
  border: none;

  &:hover {
    color: var(--color-blue);
  }
`;

const Container = styled.div`
  background: var(--color-darkGrey);
  padding: 0px 20px;
  border: 1px solid var(--color-blue);
  border-radius: 16px;
  /* box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  width: 500px;
  height: 50px;
  font-family: var(--font-body);
`;

const PaginateWrapper = styled.footer`
  margin-left: 42.5px;
  margin-right: 40px;
  margin-top: 50px;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

export default Pagination;
