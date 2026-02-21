import React, { useEffect, useState, useRef } from "react";

const RootScrollbar = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const rootProgressRef = useRef(null);
  const rootTipRef = useRef(null);
  const branchesRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = Math.min(scrollTop / docHeight, 1);
      setScrollPercent(scrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (rootProgressRef.current) {
      const pathLength = rootProgressRef.current.getTotalLength();
      const drawLength = pathLength * scrollPercent;
      
      // Update main root growth
      rootProgressRef.current.style.strokeDashoffset = pathLength - drawLength;
      
      // Update root tip position
      if (scrollPercent > 0.02 && scrollPercent < 0.98) {
        const point = rootProgressRef.current.getPointAtLength(drawLength);
        if (rootTipRef.current) {
          rootTipRef.current.setAttribute('cx', point.x);
          rootTipRef.current.setAttribute('cy', point.y);
          rootTipRef.current.style.opacity = '0.8';
        }
      } else if (rootTipRef.current) {
        rootTipRef.current.style.opacity = '0';
      }
      
      // Update branches
      branchesRef.current.forEach((branch, index) => {
        if (branch) {
          const branchStart = (index + 1) / branchesRef.current.length * 0.8;
          const branchProgress = Math.max(0, (scrollPercent - branchStart) / 0.2);
          
          if (branchProgress > 0) {
            const branchLength = branch.getTotalLength();
            const branchDraw = Math.min(branchLength * branchProgress * 2, branchLength);
            
            branch.style.strokeDashoffset = branchLength - branchDraw;
            branch.style.opacity = Math.min(branchProgress * 3, 1);
          }
        }
      });
    }
  }, [scrollPercent]);

  return (
    <div className="root-scrollbar">
      <svg className="root-svg" viewBox="0 0 20 800" preserveAspectRatio="xMidYMin meet">
        <defs>
          {/* Main root gradient */}
          <linearGradient id="rootGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
            <stop offset="40%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: '#8BC34A', stopOpacity: 1 }} />
            <stop offset="90%" style={{ stopColor: '#FF9800', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
          </linearGradient>

          {/* Branch gradient */}
          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#8BC34A', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4CAF50', stopOpacity: 0.6 }} />
          </linearGradient>

          {/* Tip gradient */}
          <radialGradient id="tipGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: '#4CAF50', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: '#8BC34A', stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: '#4CAF50', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* Background root (static) */}
        <path 
          className="root-path" 
          d="M10,0 Q8,40 10,80 Q12,120 8,160 Q10,200 12,240 Q8,280 10,320 Q12,360 9,400 Q11,440 10,480 Q8,520 12,560 Q10,600 8,640 Q12,680 10,720 Q9,760 10,800" 
        />

        {/* Animated growing root */}
        <path 
          ref={rootProgressRef}
          className="root-progress" 
          d="M10,0 Q8,40 10,80 Q12,120 8,160 Q10,200 12,240 Q8,280 10,320 Q12,360 9,400 Q11,440 10,480 Q8,520 12,560 Q10,600 8,640 Q12,680 10,720 Q9,760 10,800" 
        />

        {/* Side branches */}
        <path ref={el => branchesRef.current[0] = el} className="branch-path" d="M10,60 Q6,55 2,50" />
        <path ref={el => branchesRef.current[1] = el} className="branch-path" d="M10,100 Q14,95 18,90" />
        <path ref={el => branchesRef.current[2] = el} className="branch-path" d="M8,140 Q4,138 1,135" />
        <path ref={el => branchesRef.current[3] = el} className="branch-path" d="M12,180 Q16,175 19,170" />
        <path ref={el => branchesRef.current[4] = el} className="branch-path" d="M10,220 Q6,218 3,215" />
        <path ref={el => branchesRef.current[5] = el} className="branch-path" d="M8,260 Q12,258 15,255" />
        <path ref={el => branchesRef.current[6] = el} className="branch-path" d="M10,300 Q6,298 3,295" />
        <path ref={el => branchesRef.current[7] = el} className="branch-path" d="M12,340 Q15,338 18,335" />
        <path ref={el => branchesRef.current[8] = el} className="branch-path" d="M9,380 Q5,378 2,375" />
        <path ref={el => branchesRef.current[9] = el} className="branch-path" d="M11,420 Q14,418 17,415" />
        <path ref={el => branchesRef.current[10] = el} className="branch-path" d="M10,460 Q6,458 3,455" />
        <path ref={el => branchesRef.current[11] = el} className="branch-path" d="M8,500 Q12,498 15,495" />
        <path ref={el => branchesRef.current[12] = el} className="branch-path" d="M12,540 Q8,538 5,535" />
        <path ref={el => branchesRef.current[13] = el} className="branch-path" d="M10,580 Q13,578 16,575" />
        <path ref={el => branchesRef.current[14] = el} className="branch-path" d="M8,620 Q4,618 1,615" />
        <path ref={el => branchesRef.current[15] = el} className="branch-path" d="M10,660 Q14,658 17,655" />
        <path ref={el => branchesRef.current[16] = el} className="branch-path" d="M12,700 Q8,698 5,695" />
        <path ref={el => branchesRef.current[17] = el} className="branch-path" d="M9,740 Q12,738 15,735" />

        {/* Growing tip */}
        <circle ref={rootTipRef} className="root-tip" cx="10" cy="0" />
      </svg>
    </div>
  );
};

export default RootScrollbar;
