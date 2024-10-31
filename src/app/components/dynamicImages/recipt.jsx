export default function Receipt({ itemsString, total, date }) {
    return (
        <svg
            width="300"
            height="200"
            viewBox="0 0 300 200"
            xmlns="http://www.w3.org/2000/svg"
            style={{ backgroundColor: '#ffffff', border: '1px solid #000', borderRadius: '5px' }}
        >
            {/* Receipt Header */}
            <text
                x="50%"
                y="30"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="16"
                fontWeight="bold"
                fill="#000"
            >
                Store Receipt
            </text>

            {/* Date */}
            <text
                x="50%"
                y="60"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fill="#555"
            >
                Date: {date}
            </text>

            {/* Separator Line */}
            <line x1="20" y1="80" x2="280" y2="80" stroke="#000" strokeWidth="0.5" />

            {/* Items as a Single String */}
            <text
                x="20"
                y="110"
                fontFamily="Arial, sans-serif"
                fontSize="12"
                fill="#000"
            >
                Items: {itemsString}
            </text>

            {/* Separator Line */}
            <line x1="20" y1="130" x2="280" y2="130" stroke="#000" strokeWidth="0.5" />

            {/* Total */}
            <text
                x="20"
                y="160"
                fontFamily="Arial, sans-serif"
                fontSize="14"
                fontWeight="bold"
                fill="#000"
            >
                Total: ${total.toFixed(2)}
            </text>
        </svg>
    );
}
