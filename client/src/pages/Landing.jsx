
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components';
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
          I'm baby readymade skateboard tumeric photo booth, 
          kombucha retro bitters artisan. Chicharrones glossier 
          kombucha cliche vegan you probably haven't heard of them, 
          fingerstache tumblr letterpress blog deep v. 
          Tumblr synth shaman jianbing lumbersexual chillwave. 
          </p>
          <Link to='/register' className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img"/>
      </div>
    </Wrapper>  
  )
}

export default Landing


