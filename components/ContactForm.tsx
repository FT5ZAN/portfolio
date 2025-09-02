
"use client";

export default function ContactForm() {
  const action = `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`;
  
  return (
    <form action={action} method="POST" style={{ 
    //   backgroundColor: '#1e3a8a', 
      padding: '20px', 
      borderRadius: '8px', 
      display: 'grid', 
      gap: '10px', 
      width: '445px', 
      height: '100%',
      fontFamily: 'Montserrat, serif'
    
    }}>
      <h2 style={{ color: 'black', textAlign: 'center', marginBottom: '15px' }}>Get in Touch</h2>
      <input 
        type="text" 
        name="name" 
        placeholder="Name" 
        required 
        style={{ 
          padding: '10px', 
          border: 'none', 
          borderRadius: '4px', 
          color: 'white' ,
          backgroundColor: '#041118', 
          fontFamily: 'Montserrat, serif'
        }} 
      />
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        required 
        style={{ 
          padding: '10px',  
          border: 'none', 
          borderRadius: '4px', 
          color: 'white',
          backgroundColor: '#041118', 
          fontFamily: 'Montserrat, serif' 
        }} 
      />
      <textarea 
        name="message" 
        placeholder="Say Hello" 
        required 
        style={{ 
          padding: '10px', 
          border: 'none', 
          borderRadius: '4px', 
          color: 'white', 
          height: '100px',
          backgroundColor: '#041118', 
          fontFamily: 'Montserrat, serif' 
        }} 
      />
      <button 
        type="submit" 
        style={{ 
          padding: '5px', 
          backgroundColor: '#24dee6', 
          border: 'none', 
          borderRadius: '4px', 
          color: '#000000ff', 
          cursor: 'pointer', 
          fontWeight: 'bold',
          fontFamily: 'Montserrat, serif'  
        }}
      >
        Send
      </button>
    </form>
  );
}