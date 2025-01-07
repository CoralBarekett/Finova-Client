const NetworkIcon = ({ className = '' }) => (
  <svg 
    viewBox="0 0 300 300" 
    className={`network-icon ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(150,150)">
      {/* Main central node */}
      <circle cx="0" cy="0" r="6" fill="#7c3aed" />
      
      {/* First layer nodes */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x = Math.cos(angle) * 50;
        const y = Math.sin(angle) * 50;
        
        return (
          <g key={`layer1-${i}`}>
            <line 
              x1="0" 
              y1="0" 
              x2={x} 
              y2={y} 
              stroke="#7c3aed" 
              strokeWidth="3" 
              opacity="0.7" 
            />
            <circle cx={x} cy={y} r="4" fill="#7c3aed" />
          </g>
        );
      })}
      
      {/* Outer layer nodes */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 12;
        const x = Math.cos(angle) * 100;
        const y = Math.sin(angle) * 100;
        
        return (
          <g key={`layer2-${i}`}>
            {/* Connect to nearest inner layer nodes */}
            {Array.from({ length: 2 }).map((_, j) => {
              const innerAngle = (Math.floor(i * 8 / 12) + j) % 8;
              const innerX = Math.cos(innerAngle * Math.PI * 2 / 8) * 50;
              const innerY = Math.sin(innerAngle * Math.PI * 2 / 8) * 50;
              
              return (
                <line
                  key={`connection-${i}-${j}`}
                  x1={innerX}
                  y1={innerY}
                  x2={x}
                  y2={y}
                  stroke="#7c3aed"
                  strokeWidth="2" 
                  opacity="0.5"
                />
              );
            })}
            <circle cx={x} cy={y} r="3" fill="#7c3aed" />
          </g>
        );
      })}
      
      {/* Additional smaller nodes scattered around */}
      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 15 + Math.random() * 0.5;
        const radius = 120 + Math.random() * 20;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <circle
            key={`scatter-${i}`}
            cx={x}
            cy={y}
            r="2"
            fill="#7c3aed"
            opacity="0.7"
          />
        );
      })}
    </g>
  </svg>
);

export default NetworkIcon;