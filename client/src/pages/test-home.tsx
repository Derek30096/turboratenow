export default function TestHome() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)', 
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      {/* Red urgency header */}
      <div style={{
        background: 'linear-gradient(135deg, #dc3545, #c82333)',
        color: 'white',
        padding: '8px 16px',
        margin: '-40px -20px 40px -20px',
        fontSize: '14px',
        fontWeight: 'bold'
      }}>
        ⚡ LIMITED TIME: Insurance Rates Going Up - Compare NOW!
      </div>

      {/* Main content */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold', 
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Most Drivers Overpay $437/Year on Auto Insurance
        </h1>
        
        <p style={{ 
          fontSize: '24px', 
          marginBottom: '40px',
          opacity: '0.9'
        }}>
          Compare Top Providers & Save Big in Under 60 Seconds
        </p>

        {/* Orange CTA button */}
        <button 
          onClick={() => {
            console.log('CTA clicked - redirecting to MaxBounty');
            window.location.href = 'https://afflat3e1.com/trk/lnk/E9FE846C-D650-4A23-A71F-1A020485FDAD/?o=22134&c=918277&a=713051&k=BD87E19173921A7698931850BC9E82E2&l=22980';
          }}
          style={{
            background: '#FF6B35',
            color: 'white',
            padding: '20px 40px',
            fontSize: '20px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 8px 20px rgba(255,107,53,0.3)',
            margin: '20px'
          }}
        >
          🚨 Get My Free Quote - Save $437+ Now!
        </button>

        <p style={{ fontSize: '14px', opacity: '0.8', marginTop: '20px' }}>
          ✓ Free • ✓ No Obligation • ✓ Instant Results • ✓ 100% Secure
        </p>
      </div>
    </div>
  );
}