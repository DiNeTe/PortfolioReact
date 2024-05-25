
const Home = () => {
    return (
        
            <section id="desktop">
      <img src="./images/wallpaper1.webp" id="wallpaper" />
      <section id="taskbar">
        <div className="taskbar-left">
          <img src="./images/logoW11.png" id="logo-win" />
          <div id="start-menu">
            <ul>
              <img src="./images/avatar.png" id="avatar" />
              <li>Projet 1</li>
              <li>Projet 2</li>
              <li>Projet 3</li>
            </ul>
          </div>
        </div>
        <div className="taskbar-center">
          <nav id="nav">
            <ul id="nav-list">
              <li>
                <a href="#" id="about-icon" data-title="A propos de moi"
                  ><img src="/icons/about-icon.png" alt="A propos"
                /></a>
              </li>
              <li>
                <a href="#" id="portfolio-icon" data-title="Mon portfolio"
                  ><img src="/icons/projects-icon.png" alt="Projets"
                /></a>
              </li>
              <li>
                <a href="#" id="contact-icon" data-title="Me contacter"
                  ><img src="/icons/contact-icon.png" alt="Contact"
                /></a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="taskbar-right">
          <div id="btc-price">
            <img
              src="/images/Bitcoin.png"
              alt="Bitcoin"
              id="btc-icon"
            />
            <span id="btc-value">Loading...</span>
          </div>
          <div id="volume-control">
            <img
              src="/images/volume.png"
              alt="Volume"
              id="volume-icon"
            />
          </div>
          <div className="time" id="taskbarTime">.. : ..</div>
        </div>
      </section>
    </section>
        
    );
};

export default Home;