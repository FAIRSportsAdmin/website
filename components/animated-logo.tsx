"use client"

export default function AnimatedLogo() {
  return (
    <div className="flex justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1080 480"
        className="w-[25.9rem] h-auto md:w-[32.4rem] lg:w-[38.9rem]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left arrows - animate in from left */}
        <g className="animate-[slideInLeft_0.8s_ease-out_0.2s_both]">
          <path d="M300 120L330 90L330 105L360 105L360 135L330 135L330 150L300 120Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.2s" fill="freeze" />
          </path>
          <path d="M300 180L330 150L330 165L360 165L360 195L330 195L330 210L300 180Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.3s" fill="freeze" />
          </path>
          <path d="M300 240L330 210L330 225L360 225L360 255L330 255L330 270L300 240Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.4s" fill="freeze" />
          </path>
          <path d="M300 300L330 270L330 285L360 285L360 315L330 315L330 330L300 300Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.5s" fill="freeze" />
          </path>
          <path d="M300 360L330 330L330 345L360 345L360 375L330 375L330 390L300 360Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.6s" fill="freeze" />
          </path>
        </g>

        {/* FAIR text - draw in with stroke animation */}
        <g>
          <path
            d="M390 168V312H450V252H510V312H570V168H510V210H450V168H390Z"
            fill="none"
            stroke="#f5f5f9"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          >
            <animate attributeName="stroke-dashoffset" values="1000;0" dur="1.2s" begin="0.8s" fill="freeze" />
            <animate attributeName="fill" values="none;#f5f5f9" dur="0.3s" begin="1.8s" fill="freeze" />
          </path>
          <path
            d="M600 168L600 312L660 312L660 252L720 252L720 210L660 210L660 210L720 210L720 168L600 168Z"
            fill="none"
            stroke="#f5f5f9"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          >
            <animate attributeName="stroke-dashoffset" values="1000;0" dur="1.2s" begin="0.9s" fill="freeze" />
            <animate attributeName="fill" values="none;#f5f5f9" dur="0.3s" begin="1.9s" fill="freeze" />
          </path>
          <path
            d="M750 168V312H810V168H750Z"
            fill="none"
            stroke="#f5f5f9"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          >
            <animate attributeName="stroke-dashoffset" values="1000;0" dur="1.2s" begin="1.0s" fill="freeze" />
            <animate attributeName="fill" values="none;#f5f5f9" dur="0.3s" begin="2.0s" fill="freeze" />
          </path>
          <path
            d="M840 168V312H900V252H960L900 210V168H960V210H1020V168H840Z"
            fill="none"
            stroke="#f5f5f9"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          >
            <animate attributeName="stroke-dashoffset" values="1000;0" dur="1.2s" begin="1.1s" fill="freeze" />
            <animate attributeName="fill" values="none;#f5f5f9" dur="0.3s" begin="2.1s" fill="freeze" />
          </path>
        </g>

        {/* SPORTS text - draw in with stroke animation */}
        <g>
          <path
            d="M390 342V402H570V342H390Z"
            fill="none"
            stroke="#f5f5f9"
            strokeWidth="4"
            strokeDasharray="1000"
            strokeDashoffset="1000"
          >
            <animate attributeName="stroke-dashoffset" values="1000;0" dur="1.0s" begin="1.4s" fill="freeze" />
            <animate attributeName="fill" values="none;#f5f5f9" dur="0.3s" begin="2.2s" fill="freeze" />
          </path>
        </g>

        {/* Right arrows - animate in from right */}
        <g className="animate-[slideInRight_0.8s_ease-out_0.2s_both]">
          <path d="M780 120L750 90L750 105L720 105L720 135L750 135L750 150L780 120Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.2s" fill="freeze" />
          </path>
          <path d="M780 180L750 150L750 165L720 165L720 195L750 195L750 210L780 180Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.3s" fill="freeze" />
          </path>
          <path d="M780 240L750 210L750 225L720 225L720 255L750 255L750 270L780 240Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.4s" fill="freeze" />
          </path>
          <path d="M780 300L750 270L750 285L720 285L720 315L750 315L750 330L780 300Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.5s" fill="freeze" />
          </path>
          <path d="M780 360L750 330L750 345L720 345L720 375L750 375L750 390L780 360Z" fill="#f5f5f9">
            <animate attributeName="opacity" values="0;1" dur="0.3s" begin="0.6s" fill="freeze" />
          </path>
        </g>

        <style jsx>{`
          @keyframes slideInLeft {
            from {
              transform: translateX(-50px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes slideInRight {
            from {
              transform: translateX(50px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}</style>
      </svg>
    </div>
  )
}
