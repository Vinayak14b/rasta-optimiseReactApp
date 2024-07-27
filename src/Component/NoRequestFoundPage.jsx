import styled from 'styled-components';

const NoRequestFoundPageContainer = styled.div`
	text-align: center;
`;

const PageContent = styled.section`
	font-size: 1.2em;
	margintop: '3px';
`;
const NoRequestParagraph = styled.p`
	font-weight: bold;
	font-size: 1.2em;
	marginbottom: '10px';
`;

function NoRequestFoundPage() {
	return (
		<NoRequestFoundPageContainer>
			<PageContent>
				<div className="mt-4">
					<img
						src="icons/Group 4009.png" // Replace with the actual path to your image
						alt=""
						className="mx-auto"
						style={{
							display: 'block',
							maxWidth: '35%',
							maxHeight: '35%',
						}}
					/>
				</div>
			</PageContent>
			<NoRequestParagraph>
				<p className="mb-3 text-center">No Request Found!</p>
			</NoRequestParagraph>
		</NoRequestFoundPageContainer>
	);
}

export default NoRequestFoundPage;
