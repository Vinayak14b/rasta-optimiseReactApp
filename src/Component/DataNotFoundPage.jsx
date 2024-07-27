import styled from "styled-components"

const DataNotFoundPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 1rem;
    box-sizing: border-box;
`;

const PageContent = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 90vh;
`;

const DataNotFoundParagraph = styled.p`
    font-family: poppins;
    font-size: 1rem;
    margin-bottom: 1rem;
`;

const ImageContainer = styled.div`
    width: 100%;
    max-width: 200px;
    margin-bottom: 1rem;
`;

const DataNotFoundPage = () => {
  return (
    <DataNotFoundPageContainer>
      <PageContent>
        <ImageContainer>
          <img
            src="icons/Group 4009.png"
            alt="No data available"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
          />
        </ImageContainer>
        <DataNotFoundParagraph>
          <span className="mb-3 text-center">NO DATA AVAILABLE</span>
        </DataNotFoundParagraph>
      </PageContent>
    </DataNotFoundPageContainer>
  )
}

export default DataNotFoundPage