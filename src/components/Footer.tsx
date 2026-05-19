const Footer = () => {
  return (
    <footer className="py-10 mt-auto" style={{ background: 'linear-gradient(135deg, #7a4d6a 0%, #9c6b8a 100%)' }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">
        <span className="font-display text-xl font-semibold text-white">
          Uphar The Gift Shop
        </span>
        <div className="flex gap-5 mt-2">
          <a
            href="https://www.instagram.com/upharthegiftshop?igsh=MTRndTRzMHpwbHBrMA=="
            aria-label="Instagram"
            target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white text-lg hover:bg-white/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <i className="fab fa-instagram" />
          </a>
          <a
            href="https://wa.me/917700083353"
            aria-label="WhatsApp"
            target="_blank"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 text-white text-lg hover:bg-white/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <i className="fab fa-whatsapp" />
          </a>
        </div>
        <p className="text-sm text-white/70 mt-2">Made with 💜 by <a href="https://chandanimourya.netlify.app/" target="_blank" className="text-white hover:underline">ChandaniMourya</a></p>
      </div>
    </footer>
  );
};

export default Footer;
