const WelcomeIllustration = () => {
  return (
    <div className="relative w-60 h-60 lg:w-72 lg:h-72 mx-auto animate-float">
      <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="256" cy="256" r="256" fill="#5D3891" fillOpacity="0.4" />
        <path d="M256 400C335.529 400 400 335.529 400 256C400 176.471 335.529 112 256 112C176.471 112 112 176.471 112 256C112 335.529 176.471 400 256 400Z" fill="#432B79" fillOpacity="0.6" />
      
        {/* <text x="274" y="194" fontFamily="Arial" fontSize="18" fill="#5D3891" fontWeight="bold">WELCOME</text> */}
        <image href="/logo.svg" x="129" y="126" height="256" width="256" />
      </svg>
    </div>
  );
};

export default WelcomeIllustration;
