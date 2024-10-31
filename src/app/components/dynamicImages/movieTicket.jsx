export default function MovieTicket({ movieTitle, watchedTime }) {
  return (
      <svg
          width="300"
          height="150"
          viewBox="0 0 300 150"
          xmlns="http://www.w3.org/2000/svg"
          style={{ borderRadius: '10px', border: '2px solid #333', backgroundColor: '#f5e1c4' }}
      >
          <rect x="0" y="0" width="10" height="150" fill="#e3c09d" />
          <circle cx="5" cy="20" r="2" fill="#333" />
          <circle cx="5" cy="50" r="2" fill="#333" />
          <circle cx="5" cy="80" r="2" fill="#333" />
          <circle cx="5" cy="110" r="2" fill="#333" />
          <circle cx="5" cy="140" r="2" fill="#333" />

          <rect x="290" y="0" width="10" height="150" fill="#e3c09d" />
          <circle cx="295" cy="20" r="2" fill="#333" />
          <circle cx="295" cy="50" r="2" fill="#333" />
          <circle cx="295" cy="80" r="2" fill="#333" />
          <circle cx="295" cy="110" r="2" fill="#333" />
          <circle cx="295" cy="140" r="2" fill="#333" />

          <text
              x="50%"
              y="30%"
              textAnchor="middle"
              fill="#333"
              fontFamily="Arial, sans-serif"
              fontSize="18"
              fontWeight="bold"
          >
              ADMIT ONE
          </text>

          <text
              x="50%"
              y="55%"
              textAnchor="middle"
              fill="#333"
              fontFamily="Arial, sans-serif"
              fontSize="14"
          >
              {movieTitle}
          </text>

          <text
              x="50%"
              y="70%"
              textAnchor="middle"
              fill="#333"
              fontFamily="Arial, sans-serif"
              fontSize="12"
          >
              Watched at: {watchedTime}
          </text>
      </svg>
  );
}
