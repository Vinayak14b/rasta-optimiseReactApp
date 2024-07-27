
const Progress = ({ percentages }) => {
  // Calculate total percentage
  const containerStyle = {
    width: '766px',
    height: '14px',
    backgroundColor: '#ccc',
    borderRadius: '0px',
    overflow: 'hidden',
    marginBottom: '10px',
    position: 'relative', // Necessary for overlapping colored sections
  };

  const barStyles = percentages.map((percentage, index) => {
    let barColor;
    let textColor;
    if (index === 0) {
      barColor = '#32cd32'; // Green
      textColor = 'white';
    } else if (index === 1) {
      barColor = '#ffa500'; // Orange
      textColor = 'white';
    } else {
      barColor = '#ff6347'; // Red
      textColor = 'white';
    }

    return {
      width: `${percentage}%`,
      height: '100%',
      backgroundColor: barColor,
      position: 'absolute',
      left: index === 0 ? '0' : index === 1 ? `${percentages[0]}%` : `${percentages[0] + percentages[1]}%`,
      textAlign: 'center',
      color: textColor,
      lineHeight: '12px',
    };
  });

  return (
    <div>
      <div style={containerStyle}>
        {barStyles.map((style, index) => (
          <div key={index} style={style}>{percentages[index]}%</div>
        ))}
      </div>
    </div>
  );
};

export default Progress;
