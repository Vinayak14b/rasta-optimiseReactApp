
export default function LoginBar({ tabData, field, setField }) {
	return (
		<>
			<div className="flex gap-x-5 p-2 mb-3">
				{tabData.map((tab) => (
					<button
						key={tab.id}
						type="submit"
						className={`py-2 px-4 rounded outline  ${
							field === tab.type ? 'bg-orange-500' : 'bg-black'
						} text-white cursor-pointer`}
						onClick={() => setField(tab.type)}>
						<p>{tab.tabName}</p>
					</button>
				))}
			</div>
		</>
	);
}
