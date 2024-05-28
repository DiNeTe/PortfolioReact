const LoginScreen: React.FC  = () => {
  console.log('Rendering LoginScreen');
  return (
    
    <div className="loginScreenPage">
      <img src="./images/loginScreen.webp" className="wallpaper" alt="Wallpaper" />
      <div className="loginScreenInsert"> 
        <img src="./pp/avatar.png" className="pp" alt="Avatar" />
        <span className="fullName">Pierre Weber</span>
        <input className="password" type="password" placeholder="Code confidentiel" />
        <a href="/Home" className="loginLink">
          Se connecter en tant qu'invité
        </a>
      </div>
    </div>
  );
};

export default LoginScreen;
