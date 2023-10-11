import React, { useState } from "react";

const ChildComponent: React.FC<any> = ({ child }) => {
  const [showPortfolios, setShowPortfolios] = useState(false);

  return (
    <div>
      {child.name}
      <button onClick={() => setShowPortfolios(!showPortfolios)}>
        {showPortfolios ? "Portföyleri Gizle" : "Portföyleri Göster"}
      </button>
      {showPortfolios &&
        child.portfolioList &&
        child.portfolioList.length > 0 && (
          <ul>
            {child.portfolioList.map((portfolio: any) => (
              <li key={portfolio.id}>{portfolio.name}</li>
            ))}
          </ul>
        )}
    </div>
  );
};

export default ChildComponent;
