export default function Receipt({ user, movieTitle, watchDate}) {
    return (
      <div>
        <svg width="620" height="300">
        <defs>
            <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff0080" />
            <stop offset="25%" stopColor="#ff00ff" />
            <stop offset="50%" stopColor="#00ffff" />
            </linearGradient>

            <clipPath id="circleClip">
                <circle cx="85" cy="70" r="35"/>
            </clipPath>
        </defs>
        <path
            d="M15,5 
            A10,10 0 0 0 5,15 
            L5,112 
            A1,1 0 0 1 5,187
            L5,285 
            A10,10 0 0 0 15,295 
            L605,295 
            A10,10 0 0 0 615,285 
            L615,187 
            A1,1 0 0 1 615,112 
            L615,15 
            A10,10 0 0 0 605,5 
            Z"
            fill="none"
            stroke="url(#shine)"
            strokeWidth="5"
        />

        <line x1="480" y1="10" x2="480" y2="15" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="20" x2="480" y2="25" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="30" x2="480" y2="35" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="40" x2="480" y2="45" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="50" x2="480" y2="55" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="60" x2="480" y2="65" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="70" x2="480" y2="75" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="80" x2="480" y2="85" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="90" x2="480" y2="95" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="100" x2="480" y2="105" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="110" x2="480" y2="115" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="120" x2="480" y2="125" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="130" x2="480" y2="135" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="140" x2="480" y2="145" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="150" x2="480" y2="155" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="160" x2="480" y2="165" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="170" x2="480" y2="175" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="180" x2="480" y2="185" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="190" x2="480" y2="195" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="200" x2="480" y2="205" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="210" x2="480" y2="215" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="220" x2="480" y2="225" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="230" x2="480" y2="235" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="240" x2="480" y2="245" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="250" x2="480" y2="255" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="260" x2="480" y2="265" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="270" x2="480" y2="275" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="280" x2="480" y2="285" stroke="#555555" strokeWidth="1" />
        <line x1="480" y1="290" x2="480" y2="294" stroke="#555555" strokeWidth="1" />

        <image
            href={user.imageUrl}
            x = "50"
            y = "35"
            height = "70"
            clipPath="url(#circleClip)"
            />
        <text x="135" y ="70" fontWeight="bold" fontSize="25" fill= "#ffffff">{user.username}</text>

        <circle cx="60" cy="220" r="30" fill="#43034f"/>
        <ellipse cx="60" cy="220" rx="30" ry="15" fill="#f2f2d2"/>
        <circle cx="68" cy="223" r="9" fill="#1c1b1c"/>
        <text x="32" y ="280" fontSize="30" font-weight="lighter" fill="#515151" opacity={.5}>cine</text>

        <text x="345" y ="240" fontSize="20" font-weight="bold" fill="#ffffff">Watched On</text>
        <text x="380" y ="270" fontSize="20" font-weight="bold" fill="#ffffff">{watchDate}</text>

        <text x="100" y ="160" fontSize="35" font-weight="bolder" fill="none" stroke="#ffffff" strokeWidth="1">{movieTitle}</text>


        </svg>

      </div>
    );
  }
  